const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function processSingleQuestion(question) {
  let browser = null;

  try {
    const launchOptions = {
      headless: "new",
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920,1080'
      ]
    };

    if (process.platform === 'darwin' && process.env.NODE_ENV !== 'production') {
      launchOptions.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
    }
    
    if (process.env.NODE_ENV === 'production') {
      launchOptions.args.push('--single-process');
    }

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    await page.goto('https://chat.openai.com', { waitUntil: 'networkidle2', timeout: 30000 });

    await page.waitForTimeout(3000);

    // Try multiple selectors for ChatGPT textarea (they change frequently)
    const textareaSelectors = [
      'textarea[data-id="root"]',
      '#prompt-textarea',
      'textarea[placeholder*="Message"]',
      'textarea[placeholder*="message"]',
      'textarea[id*="prompt"]',
      'textarea[aria-label*="Message"]',
      'textarea'
    ];

    let textareaSelector = null;
    for (const selector of textareaSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 3000 });
        textareaSelector = selector;
        console.log(`Found textarea with selector: ${selector}`);
        break;
      } catch (e) {
        // Try next selector
        continue;
      }
    }

    if (!textareaSelector) {
      throw new Error('Could not find ChatGPT textarea. The page structure may have changed.');
    }
    
    // Clear any existing text and type question
    await page.click(textareaSelector);
    await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (el) el.value = '';
    }, textareaSelector);
    await page.type(textareaSelector, question, { delay: 50 });
    await page.waitForTimeout(500);
    
    // Try multiple ways to submit
    const sendButtonSelectors = [
      'button[data-testid="send-button"]',
      'button[aria-label*="Send"]',
      'button[aria-label*="send"]',
      'button:has-text("Send")',
      'button[type="submit"]'
    ];

    let sent = false;
    for (const btnSelector of sendButtonSelectors) {
      try {
        const sendButton = await page.$(btnSelector);
        if (sendButton) {
          await sendButton.click();
          sent = true;
          break;
        }
      } catch (e) {
        continue;
      }
    }

    if (!sent) {
      // Fallback: press Enter
      await page.keyboard.press('Enter');
    }

    await page.waitForTimeout(3000);

    const responseSelector = '[data-message-author-role="assistant"]';
    await page.waitForSelector(responseSelector, { timeout: 60000 });

    await page.waitForTimeout(2000);

    const responseElements = await page.$$(responseSelector);
    if (responseElements.length === 0) {
      throw new Error('No response found');
    }

    const lastResponse = responseElements[responseElements.length - 1];
    const answer = await lastResponse.evaluate(el => el.textContent || el.innerText);

    await browser.close();
    browser = null;

    return answer.trim();
  } catch (error) {
    if (browser) {
      await browser.close();
    }
    throw error;
  }
}

module.exports = { processSingleQuestion };

