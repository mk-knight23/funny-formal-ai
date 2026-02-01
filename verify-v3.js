const { chromium } = require('playwright');

(async () => {
  console.log('🚀 V3 Full Verification...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    console.log('📡 Loading http://localhost:3000...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

    const title = await page.title();
    console.log(`✅ Title: ${title}`);

    const heading = await page.$eval('h1', el => el.textContent).catch(() => 'Not found');
    console.log(`✅ Heading: ${heading}`);

    const hasForm = await page.$('form');
    console.log(`✅ Form: ${hasForm ? 'Present' : 'Missing'}`);

    const hasTextarea = await page.$('textarea');
    console.log(`✅ Textarea: ${hasTextarea ? 'Present' : 'Missing'}`);

    const hasButton = await page.$('button[type="submit"]');
    console.log(`✅ Submit Button: ${hasButton ? 'Present' : 'Missing'}`);

    const buttonText = hasButton ? await hasButton.textContent() : '';
    console.log(`✅ Button Text: ${buttonText}`);

    console.log('\n--- Console Errors ---');
    if (errors.length === 0) {
      console.log('✅ No console errors!');
    } else {
      errors.forEach(e => console.log(`❌ ${e}`));
    }

    console.log('\n--- Result ---');
    const passed = errors.length === 0 && hasForm && hasTextarea && hasButton;
    console.log(passed ? '🎉 VERIFICATION PASSED' : '🚨 VERIFICATION FAILED');

    process.exit(passed ? 0 : 1);
  } catch (err) {
    console.error(`❌ Test error: ${err.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
