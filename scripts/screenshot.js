#!/usr/bin/env node
/**
 * Take a screenshot of the first fold of a website.
 * Usage: node scripts/screenshot.js <url> [output-name]
 */
import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, '..', 'public', 'screenshots');

const url = process.argv[2];
const name = process.argv[3] || new URL(url.startsWith('http') ? url : `https://${url}`).hostname.replace('www.', '');

async function main() {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  try {
    await page.goto(url.startsWith('http') ? url : `https://${url}`, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait a bit for animations/lazy loads
    await page.waitForTimeout(2000);

    // Screenshot just the viewport (first fold)
    await page.screenshot({
      path: join(SCREENSHOTS_DIR, `${name}.jpg`),
      type: 'jpeg',
      quality: 85,
    });

    console.log(`✓ Screenshot saved: ${name}.jpg`);
  } catch (err) {
    console.error(`✗ Failed: ${err.message}`);
  } finally {
    await browser.close();
  }
}

main();
