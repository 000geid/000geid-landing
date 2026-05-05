/**
 * Capture portfolio screenshots from https://openfeed.ogeid.xyz
 *
 * Public flow: landing + feed scroll; optional first article/detail if a content link is visible.
 *
 * Optional base URL:
 *   OPENFEED_CAPTURE_BASE_URL=https://staging.example npm run capture:openfeed
 *
 * Prerequisites: npm install && npx playwright install chromium
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'static/images/openfeed');
const LIVE_URL = (process.env.OPENFEED_CAPTURE_BASE_URL ?? 'https://openfeed.ogeid.xyz').replace(/\/$/, '');

const viewport = { width: 390, height: 844 };
const deviceScaleFactor = 2;

fs.mkdirSync(outDir, { recursive: true });

async function screenshot(page, filename) {
	await page.screenshot({
		path: path.join(outDir, filename),
		fullPage: false,
		animations: 'disabled',
		type: 'png'
	});
	console.warn(' wrote', path.relative(root, path.join('static/images/openfeed', filename)));
}

/**
 * Prefer the first in-content link that looks like an article (same host, path depth).
 */
async function openFirstFeedArticle(page) {
	const origin = new URL(LIVE_URL).origin;
	const anchors = page.locator(
		`main a[href^="/"], main a[href^="${origin}"], article a[href^="/"], article a[href^="${origin}"]`
	);
	const n = await anchors.count();
	for (let i = 0; i < Math.min(n, 12); i++) {
		const a = anchors.nth(i);
		const href = await a.getAttribute('href');
		if (!href || href === '/' || href.startsWith('/#')) continue;
		await a.click({ timeout: 8000 }).catch(() => null);
		await page.waitForTimeout(2600);
		return true;
	}
	return false;
}

async function capturePublicFlow(page) {
	await page.goto(LIVE_URL, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2600);
	await screenshot(page, 'openfeed-1.png');

	await page.evaluate(() => window.scrollBy(0, 520));
	await page.waitForTimeout(700);
	await screenshot(page, 'openfeed-2.png');

	const opened = await openFirstFeedArticle(page);
	if (opened) {
		await screenshot(page, 'openfeed-3.png');
		await page.evaluate(() => window.scrollBy(0, 420));
		await page.waitForTimeout(600);
		await screenshot(page, 'openfeed-4.png');
		return;
	}

	await page.evaluate(() => window.scrollBy(0, 640));
	await page.waitForTimeout(700);
	await screenshot(page, 'openfeed-3.png');

	await page.evaluate(() => window.scrollTo(0, 0));
	await page.waitForTimeout(500);
	await screenshot(page, 'openfeed-4.png');
}

const browser = await chromium.launch({ headless: true });

try {
	const ctx = await browser.newContext({
		viewport,
		deviceScaleFactor,
		hasTouch: true,
		locale: 'es-ES',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
	});

	const page = await ctx.newPage();
	console.warn(`[capture-openfeed] ${LIVE_URL} (mobile viewport ${viewport.width}x${viewport.height})`);
	await capturePublicFlow(page);
} finally {
	await browser.close();
}
