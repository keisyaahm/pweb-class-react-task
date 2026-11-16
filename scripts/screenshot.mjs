import puppeteer from 'puppeteer'
import { mkdirSync } from 'fs'
import { join } from 'path'

const OUT = 'docs/evidence'
mkdirSync(OUT, { recursive: true })

const browser = await puppeteer.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,800'],
  defaultViewport: { width: 1280, height: 800 },
})

const page = await browser.newPage()

const shot = async (name) => {
  await new Promise(r => setTimeout(r, 600))
  await page.screenshot({ path: join(OUT, name), fullPage: false })
  console.log('saved:', name)
}

const clearSearch = async () => {
  await page.evaluate(() => {
    const input = document.querySelector('.search-input')
    const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
    setter.call(input, '')
    input.dispatchEvent(new Event('input', { bubbles: true }))
  })
  await new Promise(r => setTimeout(r, 300))
}

await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' })
await new Promise(r => setTimeout(r, 1500))
await shot('01-halaman-utama.png')

await page.type('.search-input', 'Spidol')
await shot('02-pencarian-produk.png')
await clearSearch()

const addBtn = await page.$('.xp-button.primary')
await addBtn.click()
await shot('03-modal-tambah-produk.png')

const submitBtn = await page.$('.modal-body .xp-button.primary')
await submitBtn.click()
await shot('04-validasi-harga-kosong.png')

const nameInput = await page.$('.modal-body .xp-input[placeholder="Contoh: Pulpen"]')
await nameInput.type('Stabilo')
const priceInput = await page.$('.modal-body input[type="number"]')
await priceInput.type('7500')
await submitBtn.click()
await shot('05-produk-baru-ditambahkan.png')

const editBtns = await page.$$('.xp-button.edit-btn')
await editBtns[0].click()
await shot('06-modal-edit-produk.png')

const editPrice = await page.$('.modal-body input[type="number"]')
await editPrice.click({ clickCount: 3 })
await editPrice.type('6000')
const saveChangeBtn = await page.$('.modal-body .xp-button.primary')
await saveChangeBtn.click()
await shot('07-produk-berhasil-diedit.png')

const dangerBtns = await page.$$('.card-actions .xp-button.danger')
await dangerBtns[0].click()
await shot('08-modal-hapus-produk.png')

const cancelBtn = await page.$('.modal-actions .xp-button:not(.danger):not(.primary)')
await cancelBtn.click()
await shot('09-batal-hapus-produk.png')

const dangerBtns2 = await page.$$('.card-actions .xp-button.danger')
await dangerBtns2[0].click()
await new Promise(r => setTimeout(r, 500))
const confirmBtn = await page.$('.modal-actions .xp-button.danger')
await confirmBtn.click()
await shot('10-produk-berhasil-dihapus.png')

await page.evaluate(() => {
  const input = document.querySelector('.search-input')
  const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
  setter.call(input, 'xyzabcnotfound')
  input.dispatchEvent(new Event('input', { bubbles: true }))
})
await shot('11-pencarian-tidak-ditemukan.png')

await browser.close()
console.log('semua screenshot selesai!')
