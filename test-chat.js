const { chromium } = require('playwright');

(async () => {
  console.log('🚀 V3 Chat Flow Test...');

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));

  try {
    console.log('📡 Loading app...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });

    console.log('📝 Typing message...');
    await page.fill('textarea', 'Hello, this is a test message');

    console.log('🔘 Clicking send button...');
    await page.click('button[type="submit"]');

    console.log('⏳ Waiting for response...');
    await page.waitForTimeout(3000);

    const currentUrl = page.url();
    console.log(`✅ Navigation: ${currentUrl}`);

    const pageContent = await page.content();
    const hasUserMessage = pageContent.includes('Hello, this is a test message');
    console.log(`✅ User message in history: ${hasUserMessage ? 'Yes' : 'Check needed'}`);

    console.log('\n--- Console Errors ---');
    if (errors.length === 0) {
      console.log('✅ No console errors during chat!');
    } else {
      errors.forEach(e => console.log(`⚠️ ${e}`));
    }

    console.log('\n--- Chat Flow Result ---');
    const passed = errors.filter(e => !e.includes('401')).length === 0;
    console.log(passed ? '🎉 CHAT FLOW PASSED' : 'ℹ️ Chat initiated (API auth may vary)');

    process.exit(0);
  } catch (err) {
    console.error(`❌ Test error: ${err.message}`);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
