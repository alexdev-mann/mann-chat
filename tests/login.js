const puppeteer = require('puppeteer')
const config = require('./config')
const fs = require('fs')
const credentials = {
    username: 'Alex',
}
const url = 'http://localhost:3000/';

(async () => {
    fs.writeFileSync('./results/login.json', '{"success": false}')
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({ width: config.viewport_width, height: config.viewport_height })
    await page.goto(url)

    // dom element selectors
    const USERNAME_SELECTOR = '#username-input-text'

    // Clear input
    await page.$eval(USERNAME_SELECTOR, input => input.value = '')
    // Set username
    await page.click(USERNAME_SELECTOR)
    await page.keyboard.type(credentials.username)

    await page.screenshot({ path: './screenshots/login.png' })

    fs.writeFileSync('./results/login.json', '{"success": true}')

    await browser.close()
})()
