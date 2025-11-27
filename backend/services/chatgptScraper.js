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

    await page.waitForTimeout(2000);

    const textareaSelector = 'textarea[data-id="root"]';
    await page.waitForSelector(textareaSelector, { timeout: 10000 });
    
    await page.type(textareaSelector, question, { delay: 50 });
    await page.waitForTimeout(500);
    
    const sendButton = await page.$('button[data-testid="send-button"]');
    if (sendButton) {
      await sendButton.click();
    } else {
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

