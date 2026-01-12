import fs from 'node:fs/promises'
import path from 'node:path'

/**
 * Generate a static manifest for ads images inside /public/ads.
 * Output: /public/ads/manifest.json
 *
 * Why:
 * - MikroTik hotspot pages are static.
 * - Browsers cannot "list files" inside a folder.
 * - So we generate a JSON list at build/dev time.
 */

const ROOT = process.cwd()
const ADS_DIR = path.join(ROOT, 'public', 'ads')
const OUT_FILE = path.join(ADS_DIR, 'manifest.json')

const IMG_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif'])

async function main() {
  await fs.mkdir(ADS_DIR, { recursive: true })

  let files = []
  try {
    files = await fs.readdir(ADS_DIR)
  } catch {
    files = []
  }

  const images = files
    .filter((f) => {
      const ext = path.extname(f).toLowerCase()
      return IMG_EXT.has(ext)
    })
    .sort((a, b) => a.localeCompare(b, 'en'))

  // Write JSON array of filenames
  const json = JSON.stringify(images, null, 2)
  await fs.writeFile(OUT_FILE, json, 'utf8')

  // Helpful console output
  // eslint-disable-next-line no-console
  console.log(`[gen:ads] ${images.length} file(s) -> public/ads/manifest.json`)
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[gen:ads] Failed:', err)
  process.exit(1)
})
