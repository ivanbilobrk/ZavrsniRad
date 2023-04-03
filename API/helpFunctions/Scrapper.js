const executablePath = require('puppeteer').executablePath
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
require('dotenv').config({ path: __dirname + '/../../.env'});
const env = process.env;

const home = 'https://incites.clarivate.com/#/landing';
const dashBoard = 'https://incites.clarivate.com/#/report/dashboard';
const emailSelector = "#mat-input-0"
const passwordSelector = "#mat-input-1"
const cookieAcceptSelector = '#onetrust-accept-btn-handler'
const minInputYearSelector = 'div.cl-range-input__field.cl-range-input__field--min input'
const maxInputYearSelector = 'div.cl-range-input__field.cl-range-input__field--max input'
const downloadSelector = '.cl-popover-modal-button.cl-btn.cl-btn--with-icon.cl-btn--text.ic-btn span.cl-icon.cl-icon--download.cl-icon--size-18'
const downloadButtonSelector = '[type="submit"]'

const login = async()=>{
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: executablePath(),
  });
  const page = await browser.newPage()
  await page.setDefaultTimeout(100000);

  await page.goto(home);
  
  await page.waitForSelector(emailSelector)
  await page.waitForTimeout(2000)
  console.log(env.INCITES_PWD)
  await page.type(emailSelector, env.INCITES_USER)

  await page.waitForSelector(passwordSelector)
  await page.waitForTimeout(2000)
  await page.type(passwordSelector, env.INCITES_PWD)
  await page.waitForTimeout(1000);

  await page.click('#signIn-btn');

  await page.waitForTimeout(10000)
  
  await page.waitForSelector(cookieAcceptSelector)
  await page.click(cookieAcceptSelector);



  return page;
}


const scrapeQ1CNCIIC = async (page, yearStart, yearEnd, dataSelector)=>{
  await page.goto(dashBoard);
  await page.waitForTimeout(3000)
  
    await page.waitForTimeout(4000)
    await page.waitForSelector(dataSelector)
    await page.click(dataSelector)
  


    await page.waitForTimeout(10000)
    await page.waitForSelector(minInputYearSelector)

    await page.focus(minInputYearSelector);
    
    let year = ""+yearStart+"";
    await page.$eval(minInputYearSelector, (el) => el.value = "");
    await page.type(minInputYearSelector, year)
    await page.keyboard.press('\n');

    await page.waitForTimeout(7000)

    await page.waitForSelector(maxInputYearSelector);
    await page.focus(maxInputYearSelector);

    year = ""+yearEnd+"";
    await page.$eval(maxInputYearSelector, (el) => el.value = "");
    await page.type(maxInputYearSelector, year)
    await page.keyboard.press('\n');

    await page.waitForTimeout(10000)

    await page.evaluate(() => {
      window.scrollTo(0, 0);
    });

    await page.waitForSelector(downloadSelector)
    await page.click(downloadSelector)

    await page.click(downloadButtonSelector)
    await page.waitForTimeout(5000)
}

module.exports = { login, scrapeQ1CNCIIC }