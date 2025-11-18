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
let newText = text
let changed = false

// regex to find local image paths inside the images arrays ("/images/timeline/3-0.jpg")
const localImgRe = /"(\/images\/timeline\/(\d+)-(\d+)\.([a-zA-Z0-9]+))"/g

const exts = ['jpg', 'jpeg', 'png', 'webp', 'svg']

let m
while ((m = localImgRe.exec(text)) !== null) {
  const fullMatch = m[1] // like /images/timeline/1-0.jpg
  const id = m[2]
  const idx = m[3]
  const ext = m[4]

  const candidatePath = path.join(imagesDir, `${id}-${idx}.${ext}`)
  if (fs.existsSync(candidatePath)) {
    // exists as declared; nothing to do
    continue
  }

  // try other extensions
  let found = null
  for (const e of exts) {
    const p = path.join(imagesDir, `${id}-${idx}.${e}`)
    if (fs.existsSync(p)) {
      found = `/images/timeline/${id}-${idx}.${e}`
      break
    }
  }

  if (found) {
    // replace all exact matches of the original string
    const escaped = fullMatch.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const pattern = new RegExp(`"${escaped}"`, 'g')
    newText = newText.replace(pattern, `"${found}"`)
    console.log(`Fixed ${fullMatch} -> ${found}`)
    changed = true
  } else {
    console.log(`No local file found for ${fullMatch}; skipped.`)
  }
}

if (!changed) {
  console.log('No changes necessary. All local timeline image paths match existing files (or none were present).')
  process.exit(0)
}

// backup and write
const backup = dataPath + '.bak.' + Date.now()
fs.copyFileSync(dataPath, backup)
fs.writeFileSync(dataPath, newText, 'utf8')
console.log('Updated', dataPath, ' (backup at', backup + ')')

// Commit changes if git available
try {
  const { execSync } = require('child_process')
  execSync('git add data/timelinePosts.ts', { stdio: 'inherit' })
  execSync('git commit -m "Normalize local timeline image extensions"', { stdio: 'inherit' })
  console.log('Committed changes (not pushed).')
} catch (err) {
  console.warn('Git commit failed or unavailable:', err.message)
  console.log('You can commit manually.')
}

process.exit(0)
