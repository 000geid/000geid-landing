/**
 * Capture portfolio screenshots from https://plandeck.ogeid.xyz
 *
 * Default: landing (ES) + feature section, sign-up, and login screens (no account required).
 *
 * For **kanban/board** shots, set env and re-run:
 *   PLAN_DECK_CAPTURE_EMAIL=... PLAN_DECK_CAPTURE_PASSWORD=... npm run capture:plandeck
 *
 * Prerequisites: npm install && npx playwright install chromium
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outDir = path.join(root, 'static/images/plandeck');
const LIVE_URL = 'https://plandeck.ogeid.xyz';

const viewport = { width: 390, height: 844 };
const deviceScaleFactor = 2;

async function screenshot(page, filename) {
	await page.screenshot({
		path: path.join(outDir, filename),
		fullPage: false,
		animations: 'disabled',
		type: 'png'
	});
	console.warn(' wrote', path.relative(root, path.join('static/images/plandeck', filename)));
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

async function captureBoardAfterLogin(page, email, password) {
	await page.goto(`${LIVE_URL}/login`, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2000);
	await preferSpanish(page);

	const emailInput = page.locator('input[type="email"], input[name="email"], input[autocomplete="email"]').first();
	const passInput = page.locator('input[type="password"]').first();
	await emailInput.fill(email, { timeout: 10_000 });
	await passInput.fill(password, { timeout: 10_000 });

	const signIn = page.getByRole('button', { name: /sign in|iniciar sesión/i });
	await signIn.click({ timeout: 10_000 }).catch(async () => {
		await page.locator('button[type="submit"]').first().click({ timeout: 10_000 });
	});

	await page.waitForTimeout(5000);

	await screenshot(page, 'plandeck-1.png');
	await page.evaluate(() => window.scrollBy(0, 260));
	await page.waitForTimeout(500);
	await screenshot(page, 'plandeck-2.png');
	await page.evaluate(() => window.scrollTo(0, 0));
	await page.waitForTimeout(400);

	const tabs = await page.getByRole('tab').all();
	if (tabs.length >= 2) {
		await tabs[1].click({ timeout: 5000 }).catch(() => {});
		await page.waitForTimeout(900);
	}
	await screenshot(page, 'plandeck-3.png');
	if (tabs.length >= 3) {
		await tabs[2].click({ timeout: 5000 }).catch(() => {});
		await page.waitForTimeout(900);
	}
	await screenshot(page, 'plandeck-4.png');
}

async function captureMarketingFlow(page) {
	await page.goto(LIVE_URL, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2200);
	await preferSpanish(page);
	await page.waitForTimeout(600);

	await screenshot(page, 'plandeck-1.png');

	await page.evaluate(() => window.scrollBy(0, 420));
	await page.waitForTimeout(600);
	await screenshot(page, 'plandeck-2.png');

	const cta = page
		.getByText(/^Comenzar$/i)
		.or(page.getByText(/^Get Started$/i))
		.first();
	await cta.click({ timeout: 10_000 }).catch(() => {});
	await page.waitForTimeout(2800);
	await screenshot(page, 'plandeck-3.png');

	await page.goto(`${LIVE_URL}/login`, { timeout: 90_000, waitUntil: 'domcontentloaded' });
	await page.waitForTimeout(2200);
	await preferSpanish(page);
	await page.waitForTimeout(500);
	await screenshot(page, 'plandeck-4.png');
}

const email = process.env.PLAN_DECK_CAPTURE_EMAIL?.trim();
const password = process.env.PLAN_DECK_CAPTURE_PASSWORD?.trim();

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

	if (email && password) {
		console.warn('[capture-plandeck] Using PLAN_DECK_CAPTURE_* for authenticated board shots.');
		await captureBoardAfterLogin(page, email, password);
	} else {
		console.warn('[capture-plandeck] No credentials: marketing + auth screens; set PLAN_DECK_CAPTURE_EMAIL/PASSWORD for board shots.');
		await captureMarketingFlow(page);
	}
} finally {
	await browser.close();
}
