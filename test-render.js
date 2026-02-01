const { chromium } = require('playwright');

(async () => {
  console.log('🚀 Starting browser verification...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  const consoleErrors = [];
  const consoleWarnings = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    } else if (msg.type() === 'warning') {
      consoleWarnings.push(msg.text());
    }
  });

  page.on('pageerror', error => {
    consoleErrors.push(`Page Error: ${error.message}`);
  });

  try {
    console.log('📡 Navigating to http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('⏳ Waiting for page content...');
    await page.waitForTimeout(2000);

    // Check for key elements
    const title = await page.title();
    console.log(`📄 Page title: ${title}`);

    // Check if main content loaded
    const mainContent = await page.$('main');
    console.log(`✅ Main content present: ${!!mainContent}`);

    // Check for heading
    const heading = await page.$('h1');
    const headingText = heading ? await heading.textContent() : 'Not found';
    console.log(`📝 Heading: ${headingText}`);

    // Check for chat form
    const chatForm = await page.$('form');
    console.log(`💬 Chat form present: ${!!chatForm}`);

    // Check for input
    const input = await page.$('textarea');
    console.log(`⌨️ Input textarea present: ${!!input}`);

    console.log('\n--- Console Errors ---');
    if (consoleErrors.length === 0) {
      console.log('✅ No console errors!');
    } else {
      consoleErrors.forEach(err => console.log(`❌ ${err}`));
    }

    console.log('\n--- Console Warnings ---');
    if (consoleWarnings.length === 0) {
      console.log('✅ No console warnings!');
    } else {
      consoleWarnings.forEach(warn => console.log(`⚠️ ${warn}`));
    }

    console.log('\n--- Summary ---');
    console.log(`Total Errors: ${consoleErrors.length}`);
    console.log(`Total Warnings: ${consoleWarnings.length}`);

    if (consoleErrors.length === 0) {
      console.log('\n🎉 RENDER VERIFICATION: PASSED');
    } else {
      console.log('\n🚨 RENDER VERIFICATION: FAILED - Errors found');
      process.exitCode = 1;
    }

  } catch (error) {
    console.error(`❌ Navigation error: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
