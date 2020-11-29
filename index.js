const express = require('express')
const puppeteer = require('puppeteer')

const app = express()

app.get('/', (req, res) => {
  console.log('Hello world received a request.')

  const target = process.env.TARGET || 'World'
  res.send(`Hello ${target}!`)
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log('Hello world listening on port', port)
})

const url = 'https://www.amazon.in/s?k=Shirts&ref=nb_sb_noss_2'

async function fetchProductList(url) {
    const browser = await puppeteer.launch({ 
        headless: true, // false: enables one to view the Chrome instance in action
        defaultViewport: null, // (optional) useful only in non-headless mode
    });
    const page = await browser.newPage()
    await page.goto(url, { waitUntil: 'networkidle2' })
    await browser.close()
}

fetchProductList(url)
