import puppeteer from "puppeteer";
import { spawn, spawnSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const evidenceDir = path.resolve(__dirname, "../docs/evidence");

if (!fs.existsSync(evidenceDir)) {
  fs.mkdirSync(evidenceDir, { recursive: true });
}

async function run() {
  const apiUrl = process.env.VITE_API_URL || "http://localhost:3000";
  const resetResponse = await fetch(`${apiUrl}/products/reset`, { method: "POST" });
  if (!resetResponse.ok) {
    throw new Error("Express API belum siap. Jalankan backend pada http://localhost:3000.");
  }

  const server = spawn("cmd.exe", ["/c", "npx vite preview --port 4173 --strictPort"], {
    cwd: path.resolve(__dirname, "..")
  });

  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch("http://localhost:4173");
      if (response.ok) break;
    } catch {
      // Preview server masih mulai.
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  const chromePath = fs.existsSync("C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe")
    ? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
    : "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: chromePath,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const BASE_URL = "http://localhost:4173";

  try {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("Buku Tulis Campus B5"));
    await page.screenshot({ path: path.join(evidenceDir, "01-dashboard.png") });

    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("8 dari 8 produk"));
    await page.screenshot({ path: path.join(evidenceDir, "02-products-grid.png") });

    await page.click('button[aria-label="List Mode"]');
    await page.waitForSelector("table");
    await page.screenshot({ path: path.join(evidenceDir, "03-products-list.png") });

    await page.click('button[aria-label="Grid Mode"]');

    await page.type('input[placeholder*="Cari berdasarkan nama"]', "pulpen");
    await page.waitForFunction(() => document.body.innerText.includes("1 dari 8 produk"));
    await page.screenshot({ path: path.join(evidenceDir, "04-search-filter.png") });

    await page.evaluate(() => {
      const resetBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Reset Filter")
      );
      if (resetBtn) resetBtn.click();
    });
    await page.waitForFunction(() => document.body.innerText.includes("8 dari 8 produk"));

    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Tambah Produk")
      );
      if (addBtn) addBtn.click();
    });
    await page.waitForSelector('[role="dialog"]');

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.type === "submit"
      );
      if (submitBtn) submitBtn.click();
    });
    await page.waitForFunction(() => document.body.innerText.includes("Nama produk wajib diisi."));
    await page.screenshot({ path: path.join(evidenceDir, "05-modal-tambah-validasi.png") });

    await page.type("#product-name", "Webcam Full HD 1080p 60FPS");
    await page.type("#product-sku", "EL-WC-009");
    await page.type("#product-price", "285000");
    await page.type("#product-stock", "15");
    await page.type("#product-desc", "Webcam USB plug and play dengan sensor presisi, autofocus cepat, dan mikrofon stereo.");
    await page.select("#product-category", "Elektronik");

    await page.evaluate(() => {
      const submitBtn = Array.from(document.querySelectorAll("button")).find(
        (b) => b.type === "submit"
      );
      if (submitBtn) submitBtn.click();
    });
    await page.waitForFunction(() => document.body.innerText.includes("Webcam Full HD 1080p 60FPS"));
    const productsAfterCreate = await fetch(`${apiUrl}/products`).then((response) => response.json());
    if (!productsAfterCreate.some((product) => product.sku === "EL-WC-009")) {
      throw new Error("Produk hasil POST tidak tersimpan di PostgreSQL.");
    }
    await page.screenshot({ path: path.join(evidenceDir, "06-modal-tambah-success.png") });

    await page.evaluate(() => {
      const editBtn = document.querySelector('button[title="Edit Produk"]');
      if (editBtn) editBtn.click();
    });
    await page.waitForSelector('[role="dialog"]');
    await page.screenshot({ path: path.join(evidenceDir, "07-modal-edit.png") });

    await page.click("#product-name", { clickCount: 3 });
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.up("Control");
    await page.type("#product-name", "Webcam Full HD 1080p 60FPS Pro");
    await page.evaluate(() => {
      const submitBtn = document.querySelector('[role="dialog"] button[type="submit"]');
      if (submitBtn) submitBtn.click();
    });
    await page.waitForSelector('[role="dialog"]', { hidden: true });
    await page.waitForFunction(() =>
      document.body.innerText.includes("Webcam Full HD 1080p 60FPS Pro")
    );
    const productsAfterUpdate = await fetch(`${apiUrl}/products`).then((response) => response.json());
    const updatedWebcam = productsAfterUpdate.find((product) => product.sku === "EL-WC-009");
    if (!updatedWebcam || updatedWebcam.name !== "Webcam Full HD 1080p 60FPS Pro") {
      throw new Error("Perubahan dari UI tidak tersimpan melalui PUT ke PostgreSQL.");
    }

    await page.evaluate(() => {
      const deleteButtons = Array.from(document.querySelectorAll('button[title="Hapus Produk"]'));
      const deleteBtn = deleteButtons[deleteButtons.length - 2];
      if (deleteBtn) deleteBtn.click();
    });
    await page.waitForSelector('[role="dialog"]');
    await page.screenshot({ path: path.join(evidenceDir, "08-modal-hapus-konfirmasi.png") });

    await page.evaluate(() => {
      const confirmBtn = Array.from(
        document.querySelectorAll('[role="dialog"] button')
      ).find((button) => button.textContent.includes("Ya, Hapus Produk"));
      if (confirmBtn) confirmBtn.click();
    });
    await page.waitForSelector('[role="dialog"]', { hidden: true });
    const productsAfterDelete = await fetch(`${apiUrl}/products`).then((response) => response.json());
    if (productsAfterDelete.some((product) => product.id === 2)) {
      throw new Error("Penghapusan dari UI tidak tersimpan melalui DELETE ke PostgreSQL.");
    }

    await page.goto(`${BASE_URL}/products/1`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("Buku Tulis Campus"));
    await page.screenshot({ path: path.join(evidenceDir, "09-product-detail.png") });

    await page.goto(`${BASE_URL}/products/999`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("Produk Tidak Ditemukan"));
    await page.screenshot({ path: path.join(evidenceDir, "10-product-not-found.png") });

    await page.goto(`${BASE_URL}/alamat-salah-tidak-terdaftar`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("404"));
    await page.screenshot({ path: path.join(evidenceDir, "11-fallback-404.png") });

    await page.goto(`${BASE_URL}/settings`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("PostgreSQL"));
    await page.screenshot({ path: path.join(evidenceDir, "12-settings-page.png") });

    await page.setViewport({ width: 375, height: 667, isMobile: true });
    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("Webcam Full HD 1080p 60FPS Pro"));
    await page.screenshot({ path: path.join(evidenceDir, "13-responsive-mobile.png") });

    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(`${BASE_URL}/products`, { waitUntil: "networkidle0" });
    await page.evaluate(() => {
      const addBtn = Array.from(document.querySelectorAll("button")).find((b) =>
        b.textContent.includes("Tambah Produk")
      );
      if (addBtn) addBtn.click();
    });
    await page.waitForSelector('[role="dialog"]');
    await page.keyboard.press("Escape");
    await page.waitForSelector('[role="dialog"]', { hidden: true });
    await page.screenshot({ path: path.join(evidenceDir, "14-keyboard-accessibility.png") });

    await page.reload({ waitUntil: "networkidle0" });
    await page.waitForFunction(() => document.body.innerText.includes("Webcam Full HD 1080p 60FPS Pro"));
    await page.screenshot({ path: path.join(evidenceDir, "15-api-persistence-after-reload.png") });
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    await fetch(`${apiUrl}/products/reset`, { method: "POST" });
    await browser.close();
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
  }
}

run();
