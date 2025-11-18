#!/usr/bin/env node
"use strict"
const fs = require('fs')
const path = require('path')

const projectRoot = path.resolve(__dirname, '..')
const dataPath = path.join(projectRoot, 'data', 'timelinePosts.ts')
const imagesDir = path.join(projectRoot, 'public', 'images', 'timeline')

if (!fs.existsSync(dataPath)) {
  console.error('Cannot find', dataPath)
  process.exit(1)
}

const text = fs.readFileSync(dataPath, 'utf8')
const re = /id\s*:\s*(\d+)[\s\S]*?images\s*:\s*\[([\s\S]*?)\]/g
let m
let changed = false
let newText = text

while ((m = re.exec(text)) !== null) {
  const id = Number(m[1])
  const imagesBlock = m[2]
  const urlRe = /"(https?:\/\/[^\"]+)"/g
  let u
  const urls = []
  while ((u = urlRe.exec(imagesBlock)) !== null) {
    urls.push(u[1])
  }

  for (let i = 0; i < urls.length; i++) {
    const url = urls[i]
    // check for existing local files with common extensions
    const exts = ['jpg', 'jpeg', 'png', 'webp', 'svg']
    let found = null
    for (const ext of exts) {
      const candidate = path.join(imagesDir, `${id}-${i}.${ext}`)
      if (fs.existsSync(candidate)) {
        found = `/images/timeline/${id}-${i}.${ext}`
        break
      }
    }
    if (found) {
      const escaped = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const pattern = new RegExp(`\"${escaped}\"`, 'g')
      newText = newText.replace(pattern, `"${found}"`)
      console.log(`Replaced ${url} -> ${found}`)
      changed = true
    }
  }
}

if (!changed) {
  console.log('No local images found to apply. Place files into public/images/timeline/ and rerun.')
  process.exit(0)
}

// backup and write
const backup = dataPath + '.bak.' + Date.now()
fs.copyFileSync(dataPath, backup)
fs.writeFileSync(dataPath, newText, 'utf8')
console.log('Updated', dataPath, ' (backup at', backup + ')')

// Optionally commit
try {
  const { execSync } = require('child_process')
  execSync('git add data/timelinePosts.ts', { stdio: 'inherit' })
  execSync('git commit -m "Use local timeline images where available"', { stdio: 'inherit' })
  execSync('git push origin main', { stdio: 'inherit' })
  console.log('Committed and pushed changes.')
} catch (err) {
  console.warn('Git commit/push failed or not available:', err.message)
  console.log('You can commit manually.')
}
