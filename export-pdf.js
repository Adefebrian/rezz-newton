/**
 * Rezz Website — Seamless Full-Page PDF Exporter
 * Usage: node export-pdf.js
 * Make sure dev server is running on localhost:3001 first.
 */

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

function ensurePackage(pkg) {
  try { require.resolve(pkg) } catch {
    console.log(`📦 Installing ${pkg}...`)
    execSync(`npm install ${pkg} --no-save`, { stdio: 'inherit' })
  }
}
ensurePackage('puppeteer')
ensurePackage('pdf-lib')

const puppeteer = require('puppeteer')
const { PDFDocument } = require('pdf-lib')

const BASE_URL = 'http://localhost:3001'
const OUT_FILE = path.join(__dirname, 'rezz-website-documentation.pdf')
const TMP_DIR  = path.join(__dirname, '.pdf-tmp')

// A4 Landscape aspect ratio: 841.89 / 595.28 = 1.4142
// Viewport at exact same ratio: 1122 x 794
const VP_W    = 1122
const VP_H    = 794
const PAGE_W  = 841.89
const PAGE_H  = 595.28

const PAGES = [
  { name: 'Home',            path: '/',          maxShots: 12 },
  { name: 'Book a Table',    path: '/booking',   maxShots: 5  },
  { name: 'Order & Pick Up', path: '/order',     maxShots: 1, guestLogin: true, maxHeight: 1800 },
  { name: 'Functions',       path: '/functions', maxShots: 8  },
  { name: 'Careers',         path: '/careers',   maxShots: 6  },
  { name: 'Contact',         path: '/contact',   maxShots: 6  },
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

;(async () => {
  if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR, { recursive: true })

  const browser = await puppeteer.launch({
    headless: 'new',
    protocolTimeout: 300000,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage'],
  })

  const allShots = []

  for (const { name, path: pagePath, maxShots, guestLogin, maxHeight } of PAGES) {
    console.log(`\n🌐 ${name}`)

    const page = await browser.newPage()

    // Disable animations for clean capture
    await page.addStyleTag({ content: `
      *, *::before, *::after {
        animation-duration: 0.001ms !important;
        transition-duration: 0.001ms !important;
      }
    `})

    await page.setViewport({ width: VP_W, height: VP_H, deviceScaleFactor: 2 })

    await page.goto(`${BASE_URL}${pagePath}`, {
      waitUntil: 'load',
      timeout: 60000,
    })

    // Initial wait
    await sleep(2000)

    // For order page: capture login modal (1 shot), then login as guest, then capture menu
    if (guestLogin) {
      // Step 1: capture the login modal as shot 000
      console.log(`   📸 Capturing login modal...`)
      const modalPath = path.join(TMP_DIR, `Order-Pick-Up-000.png`)
      await page.screenshot({
        path: modalPath,
        clip: { x: 0, y: 0, width: VP_W, height: VP_H },
        type: 'png',
      })
      allShots.push({ imgPath: modalPath, clipH: VP_H })

      // Step 2: fill form and click Continue as Guest
      console.log(`   🔐 Filling guest login form...`)
      try {
        await page.waitForSelector('#g-name', { timeout: 5000 })
        await page.click('#g-name')
        await page.type('#g-name', 'Brian')
        await sleep(200)
        await page.click('#g-email')
        await page.type('#g-email', 'brianeedsleep@gmail.com')
        await sleep(200)
        // Submit the guest form
        await page.click('button[type="submit"]')
        await sleep(2500)
        console.log(`   ✅ Logged in — menu now visible`)
      } catch (e) {
        console.log(`   ⚠️  Login failed: ${e.message}`)
      }
    }

    // Scroll all the way down slowly to trigger ALL lazy-loaded images (incl. gallery)
    const totalHeightInit = await page.evaluate('document.documentElement.scrollHeight')
    const preScrollSteps  = Math.ceil(totalHeightInit / 300)
    for (let s = 0; s < preScrollSteps; s++) {
      await page.evaluate(`window.scrollTo(0, ${s * 300})`)
      await sleep(60)
    }
    // Scroll back to top
    await page.evaluate('window.scrollTo(0, 0)')
    await sleep(2000)

    // Final height after all content loaded
    // For order page: capture full page in one shot (menu is very long)
    if (guestLogin) {
      console.log(`   📸 Capturing full menu page...`)
      const totalH  = await page.evaluate('document.documentElement.scrollHeight')
      const captureH = maxHeight ? Math.min(totalH, maxHeight) : totalH

      // Hide fixed navbar for this capture
      await page.addStyleTag({ content: `
        header, [style*="position: fixed"], [style*="position:fixed"] {
          position: absolute !important; top: auto !important;
        }
      `})
      await sleep(200)

      // Set viewport to capture height
      await page.setViewport({ width: VP_W, height: captureH, deviceScaleFactor: 1 })
      await sleep(300)

      const imgPath = path.join(TMP_DIR, `${name.replace(/\W+/g, '-')}-001.png`)
      await page.screenshot({
        path: imgPath,
        clip: { x: 0, y: 0, width: VP_W, height: captureH },
        type: 'png',
      })
      allShots.push({ imgPath, clipH: captureH })
      console.log(`   ✅ Menu captured (${captureH}px)`)

    } else {

      const totalHeight = await page.evaluate('document.documentElement.scrollHeight')
      const rawShots    = Math.ceil(totalHeight / VP_H)
      const numShots    = Math.min(rawShots, maxShots)

      console.log(`   Height: ${totalHeight}px → ${numShots} shots`)

      for (let i = 0; i < numShots; i++) {
        const scrollY = i * VP_H

        await page.evaluate(`window.scrollTo(0, ${scrollY})`)
        await sleep(800)

        // From shot 2 onwards: unfix navbar so it doesn't repeat
        if (i === 1) {
          await page.addStyleTag({ content: `
            header, nav > div,
            [style*="position: fixed"], [style*="position:fixed"],
            [style*="position:sticky"], [style*="position: sticky"] {
              position: absolute !important;
              top: auto !important;
            }
          `})
          await sleep(200)
        }

        const clipH   = Math.min(VP_H, totalHeight - scrollY)
        const imgPath = path.join(TMP_DIR, `${name.replace(/\W+/g, '-')}-${String(i).padStart(3, '0')}.png`)

        await page.screenshot({
          path: imgPath,
          clip: { x: 0, y: scrollY, width: VP_W, height: clipH },
          type: 'png',
        })

        allShots.push({ imgPath, clipH })
        process.stdout.write(`   Shot ${i + 1}/${numShots} ✓\r`)
      }

    }

    console.log(`   ✅ Done`)
    await page.close()
  }

  await browser.close()

  // ── Build one seamless PDF ──────────────────────────────
  // Strategy: stitch all shots of the same page into ONE tall image,
  // then embed as a single tall PDF page — no visible seams at all.
  console.log('\n📄 Building seamless PDF...')

  // Group shots back by page
  const pageGroups = []
  let shotIdx = 0
  for (const { name, path: pagePath, maxShots } of PAGES) {
    // Count how many shots this page generated
    const prefix    = name.replace(/\W+/g, '-')
    const pageShots = allShots.filter((_, i) => {
      const f = path.basename(allShots[i]?.imgPath || '')
      return f.startsWith(prefix + '-')
    })
    pageGroups.push({ name, shots: pageShots })
  }

  // Rebuild groups properly by order
  let idx = 0
  const groups = PAGES.map(({ name, maxShots }) => {
    const prefix = name.replace(/\W+/g, '-')
    const shots  = []
    while (idx < allShots.length) {
      const fname = path.basename(allShots[idx].imgPath)
      if (fname.startsWith(prefix + '-')) {
        shots.push(allShots[idx])
        idx++
      } else break
    }
    return { name, shots }
  })

  const pdf = await PDFDocument.create()

  for (const { name, shots } of groups) {
    if (!shots.length) continue
    console.log(`   Stitching: ${name} (${shots.length} shots)`)

    // Load all images for this page
    const imgs = []
    let totalH = 0
    for (const { imgPath, clipH } of shots) {
      const bytes = fs.readFileSync(imgPath)
      imgs.push({ bytes, clipH })
      totalH += clipH
    }

    // Calculate PDF page dimensions — width = A4 landscape width, height proportional
    const scale     = PAGE_W / VP_W
    const pdfPageH  = totalH * scale

    const pdfPage = pdf.addPage([PAGE_W, pdfPageH])

    // Draw each shot stacked top-to-bottom (PDF y-axis is bottom-up)
    let yOffset = pdfPageH
    for (const { bytes, clipH } of imgs) {
      const img    = await pdf.embedPng(bytes)
      const drawH  = clipH * scale
      yOffset     -= drawH
      pdfPage.drawImage(img, {
        x: 0,
        y: yOffset,
        width: PAGE_W,
        height: drawH,
      })
    }
  }

  const bytes = await pdf.save()
  fs.writeFileSync(OUT_FILE, bytes)
  fs.rmSync(TMP_DIR, { recursive: true, force: true })

  console.log(`\n🎉 Saved → rezz-website-documentation.pdf`)
  console.log(`   Pages : ${pdf.getPageCount()} (one per website page)`)
  console.log(`   Size  : ${(bytes.length / 1024 / 1024).toFixed(1)} MB`)
})().catch(e => { console.error('\n❌', e.message); process.exit(1) })
