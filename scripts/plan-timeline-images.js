#!/usr/bin/env node
"use strict"
const fs = require('fs')
const path = require('path')

const dataFile = path.join(__dirname, '..', 'data', 'timelinePosts.ts')
const outManifest = path.join(__dirname, 'timeline-image-manifest.json')

if (!fs.existsSync(dataFile)) {
  console.error('Cannot find data file:', dataFile)
  process.exit(1)
}

const text = fs.readFileSync(dataFile, 'utf8')

// Regex to capture sections like: id: 1 ... images: [ ... ]
const re = /id\s*:\s*(\d+)[\s\S]*?images\s*:\s*\[([\s\S]*?)\]/g
let m
const manifest = []

while ((m = re.exec(text)) !== null) {
  const id = Number(m[1])
  const imagesBlock = m[2]
  // find all URLs inside quotes within the images block
  const urlRe = /\"(https?:\/\/[^\"]+)\"/g
  let u
  const urls = []
  while ((u = urlRe.exec(imagesBlock)) !== null) {
    urls.push(u[1])
  }

  const mapped = urls.map((url, idx) => {
    let ext = 'jpg'
    try {
      const parsed = new URL(url)
      const base = path.basename(parsed.pathname)
      if (base && base.includes('.')) {
        ext = base.split('.').pop().toLowerCase()
        // strip query-like suffixes e.g. .jpg?v=...
        if (ext.includes('?')) ext = ext.split('?')[0]
      }
    } catch (e) {
      // fallback to jpg
    }
    const filename = `${id}-${idx}.${ext}`
    return { url, filename }
  })

  manifest.push({ id, images: mapped })
}

if (manifest.length === 0) {
  console.error('No timeline posts with images were found in', dataFile)
  process.exitCode = 2
} else {
  // Recommend folder
  const folder = '/public/images/timeline/'
  console.log('\nPlace your images in the folder (relative to project root):')
  console.log(folder)
  console.log('\nRequired filenames (suggested)')
  manifest.forEach((p) => {
    console.log(`\nPost id: ${p.id}`)
    p.images.forEach((img) => {
      console.log(`  ${img.filename}    (from: ${img.url})`)
    })
  })

  // write manifest file to scripts/ for convenience
  try {
    fs.writeFileSync(outManifest, JSON.stringify({ folder: folder.replace(/^\//, ''), posts: manifest }, null, 2), 'utf8')
    console.log('\nA manifest was also written to:', outManifest)
    console.log('You can use this manifest to rename files or to run a script that copies them into place.')
  } catch (e) {
    console.warn('Failed to write manifest file:', e.message)
  }
}

// Exit cleanly
process.exit(0)
