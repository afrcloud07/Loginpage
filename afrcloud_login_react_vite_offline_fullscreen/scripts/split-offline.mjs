import fs from 'node:fs/promises'
import path from 'node:path'

const onlineOutDir = process.argv[2] || path.resolve('dist/online')
const srcDir = path.resolve(onlineOutDir, 'offline')
const dstDir = path.resolve('dist/offline')

async function exists(p) {
  try { await fs.access(p); return true } catch { return false }
}

async function copyDir(from, to) {
  await fs.mkdir(to, { recursive: true })
  const entries = await fs.readdir(from, { withFileTypes: true })
  for (const e of entries) {
    const fp = path.join(from, e.name)
    const tp = path.join(to, e.name)
    if (e.isDirectory()) {
      await copyDir(fp, tp)
    } else {
      await fs.copyFile(fp, tp)
    }
  }
}

async function rmDir(p) {
  await fs.rm(p, { recursive: true, force: true })
}

(async () => {
  const hasSrc = await exists(srcDir)
  if (!hasSrc) {
    console.log('[split-offline] No offline folder found at:', srcDir)
    console.log('[split-offline] Tip: build with public/offline present, or pass correct outDir.')
    process.exit(0)
  }

  await copyDir(srcDir, dstDir)
  await rmDir(srcDir)
  console.log('[split-offline] OK →', dstDir)
})().catch((err) => {
  console.error('[split-offline] ERROR', err)
  process.exit(1)
})
