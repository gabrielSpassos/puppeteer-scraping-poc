const puppeteer = require('puppeteer');
const creds = require('./creds');

async function run() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://github.com');
    await page.screenshot({path: './screenshots/github.png'});

    browser.close();
}

const USERNAME_SELECTOR = '#login_field';
const PASSWORD_SELECTOR = '#password';
const LOGIN_SELECTOR = '#login > form > div.auth-form-body.mt-3 > input.btn.btn-primary.btn-block';

async function login(){
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    // access github login page
    await page.goto('https://github.com/login');

    //click username field
    await page.click(USERNAME_SELECTOR);
    //complete username field
    await page.keyboard.type(creds.USERNAME);

    await page.click(PASSWORD_SELECTOR);
    await page.keyboard.type(creds.PASSWORD);

    await page.click(LOGIN_SELECTOR);

    await page.waitForNavigation();
}

run();
login();
