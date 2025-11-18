#!/usr/bin/env node
"use strict"
const fs = require('fs')
const path = require('path')
const { URL } = require('url')

// Node 18+ has global fetch; otherwise require node-fetch
let fetchFn = global.fetch
if (!fetchFn) {
  try {
    fetchFn = require('node-fetch')
  } catch (e) {
    console.error('No fetch available. Please run this with Node 18+ or install node-fetch as a dev dependency.')
    process.exit(1)
  }
}

const projectRoot = path.resolve(__dirname, '..')
const dataPath = path.join(projectRoot, 'data', 'timelinePosts.ts')
const outDir = path.join(projectRoot, 'public', 'images', 'timeline')

if (!fs.existsSync(dataPath)) {
  console.error('Cannot find', dataPath)
  process.exit(1)
}

const text = fs.readFileSync(dataPath, 'utf8')

const re = /id\s*:\s*(\d+)[\s\S]*?images\s*:\s*\[([\s\S]*?)\]/g
let m
const replacements = []
fs.mkdirSync(outDir, { recursive: true })

async function download(url, outPath) {
  try {
    const res = await fetchFn(url, { timeout: 20000 })
    if (!res.ok) {
      console.warn('Failed to fetch', url, res.status)
      return false
    }
    const contentType = res.headers.get ? res.headers.get('content-type') : null
    let ext = 'jpg'
    if (contentType) {
      if (contentType.includes('png')) ext = 'png'
      else if (contentType.includes('webp')) ext = 'webp'
      else if (contentType.includes('jpeg')) ext = 'jpg'
      else if (contentType.includes('svg')) ext = 'svg'
    }
    const buffer = await res.arrayBuffer()
    fs.writeFileSync(outPath, Buffer.from(buffer))
    return ext
  } catch (err) {
    console.warn('Error downloading', url, err.message)
    return false
  }
}

(async () => {
  while ((m = re.exec(text)) !== null) {
    const id = Number(m[1])
    const imagesBlock = m[2]
  const urlRe = /"(https?:\/\/[^"]+)"/g
    let u
    const urls = []
    while ((u = urlRe.exec(imagesBlock)) !== null) {
      urls.push(u[1])
    }

    for (let i = 0; i < urls.length; i++) {
      const url = urls[i]
      // infer ext from pathname
      let ext = 'jpg'
      try {
        const parsed = new URL(url)
        const base = path.basename(parsed.pathname)
        if (base && base.includes('.')) {
          ext = base.split('.').pop().toLowerCase()
          if (ext.includes('?')) ext = ext.split('?')[0]
        }
      } catch (e) {}

      const candidate = path.join(outDir, `${id}-${i}.${ext}`)
      const downloadResult = await download(url, candidate)
      if (!downloadResult) {
        console.warn(`Skipping update for ${url} (download failed)`)
        continue
      }
      // if downloadResult gives a different ext, rename
      if (downloadResult !== ext) {
        const newPath = path.join(outDir, `${id}-${i}.${downloadResult}`)
        fs.renameSync(candidate, newPath)
        ext = downloadResult
      }

      const localPath = `/images/timeline/${id}-${i}.${ext}`
      replacements.push({ url, localPath })
      console.log('Downloaded', url, '->', localPath)
    }
  }

  if (replacements.length === 0) {
    console.log('No images downloaded. Exiting.')
    process.exit(0)
  }

  // backup original file
  const backupPath = dataPath + '.bak.' + Date.now()
  fs.copyFileSync(dataPath, backupPath)
  console.log('Backed up original data file to', backupPath)

  // apply replacements to text: replace exact quoted URLs with local paths
  let newText = text
  for (const r of replacements) {
    // replace all occurrences
    const escaped = r.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`\"${escaped}\"`, 'g')
    newText = newText.replace(pattern, `"${r.localPath}"`)
  }

  fs.writeFileSync(dataPath, newText, 'utf8')
  console.log('Updated', dataPath, 'with local image paths.')

  // git add/commit/push
  const { execSync } = require('child_process')
  try {
    execSync('git add data/timelinePosts.ts public/images/timeline', { stdio: 'inherit' })
    execSync('git commit -m "Add timeline images and update data to use local image paths"', { stdio: 'inherit' })
    execSync('git push origin main', { stdio: 'inherit' })
    console.log('Committed and pushed changes.')
  } catch (err) {
    console.warn('Git commit/push failed:', err.message)
    console.log('You can commit manually: git add data/timelinePosts.ts public/images/timeline && git commit -m "..." && git push')
  }
})()
