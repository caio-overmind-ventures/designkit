const { chromium } = require('playwright');
const { join } = require('path');
const { mkdirSync } = require('fs');

const SCREENSHOTS_DIR = join(__dirname, '..', 'public', 'screenshots');
mkdirSync(SCREENSHOTS_DIR, { recursive: true });

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.log('Usage: node scripts/screenshot.cjs url1 url2 ...');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({ args: ['--no-sandbox'] });

  for (const raw of urls) {
    const url = raw.startsWith('http') ? raw : `https://${raw}`;
    const name = new URL(url).hostname.replace('www.', '');

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(2000);
      // Viewport-only screenshot (first fold)
      await page.screenshot({
        path: join(SCREENSHOTS_DIR, `${name}.jpg`),
        type: 'jpeg',
        quality: 85,
        clip: { x: 0, y: 0, width: 1440, height: 900 },
      });
      console.log(`✓ ${name}.jpg`);
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
})();
