/**
 * Capture portfolio screenshots from https://filoapp.ogeid.xyz
 *
 * Flow (public, no secrets): landing → marketing scroll → restaurant list (/restaurants) → Carta tab on a sample menu URL.
 *
 * Optional: override demo menu slug (must be a reachable public menu route):
 *   FILO_CAPTURE_MENU_PATH=/restaurante/tu-slug npm run capture:filo
 *
 * Prerequisites: npm install && npx playwright install chromium
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'static/images/filo');
const LIVE_URL = 'https://filoapp.ogeid.xyz';
const DEFAULT_MENU_PATH = '/restaurante/test-restaurant-filo-0a4kch';

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
	console.warn(' wrote', path.relative(root, path.join('static/images/filo', filename)));
}

async function preferSpanish(page) {
	await page.keyboard.press('Escape').catch(() => {});
	await page.waitForTimeout(300);
	const englishToggle = page.getByRole('button', { name: /^English$/i }).first();
	if ((await englishToggle.count()) > 0) {
		await englishToggle.click({ timeout: 5000 }).catch(() => {});
		await page.waitForTimeout(800);
	}
	await page.keyboard.press('Escape').catch(() => {});
	await page.waitForTimeout(200);
}

function resolveMenuPath() {
	const raw = process.env.FILO_CAPTURE_MENU_PATH?.trim();
	if (!raw) return DEFAULT_MENU_PATH;
	return raw.startsWith('/') ? raw : `/${raw}`;
}

async function capturePublicFlow(page) {
	const menuPath = resolveMenuPath();

	await page.goto(LIVE_URL, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2200);
	await preferSpanish(page);
	await page.waitForTimeout(600);

	await screenshot(page, 'filo-1.png');

	await page.evaluate(() => window.scrollBy(0, 480));
	await page.waitForTimeout(600);
	await screenshot(page, 'filo-2.png');

	await page.goto(`${LIVE_URL}/restaurants`, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(3500);
	await preferSpanish(page);
	await page.waitForTimeout(500);

	const listHeading = page.getByRole('heading', { name: /Restaurants en Filo/i }).first();
	if ((await listHeading.count()) > 0) {
		await listHeading.scrollIntoViewIfNeeded().catch(() => {});
		await page.waitForTimeout(400);
	}
	await screenshot(page, 'filo-3.png');

	await page.goto(`${LIVE_URL}${menuPath}`, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(3500);
	await preferSpanish(page);

	const carta = page.getByRole('button', { name: /^Carta$/ });
	await carta.click({ timeout: 15_000 });
	await page.waitForTimeout(1500);
	await screenshot(page, 'filo-4.png');
}

const browser = await chromium.launch({ headless: true });

try {
	const ctx = await browser.newContext({
		viewport,
		deviceScaleFactor,
		hasTouch: true,
		locale: 'es-PE',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1'
	});

	const page = await ctx.newPage();
	const override = process.env.FILO_CAPTURE_MENU_PATH?.trim();
	console.warn(
		override
			? `[capture-filo] Public flow + FILO_CAPTURE_MENU_PATH=${override}`
			: '[capture-filo] Public flow: landing, list (/restaurants), Carta'
	);
	await capturePublicFlow(page);
} finally {
	await browser.close();
}
