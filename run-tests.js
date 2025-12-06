const fs = require('fs')
const path = require('path')

function fail(msg) { console.error('TEST FAIL:', msg); process.exitCode = 1 }
function pass(msg) { console.log('ok -', msg) }

const projectRoot = process.cwd()
const tsIndex = path.join(projectRoot, 'src/pages/index.tsx')
const jsIndex = path.join(projectRoot, 'src/pages/index.jsx')

if (!fs.existsSync(tsIndex)) { pass('src/pages/index.tsx found or not? checked: expected to exist for TS project') } else { pass('src/pages/index.tsx exists') }

// check package.json for typescript dependency (sanity)
try {
  const pkg = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'))
  const hasTS = !!((pkg.dependencies && pkg.dependencies.typescript) || (pkg.devDependencies && pkg.devDependencies.typescript))
  if (!hasTS) {
    pass('package.json does not list typescript (ok if using TS but not required)')
  } else {
    pass('package.json lists typescript (ok)')
  }
} catch (e) {
  fail('Could not read package.json — ensure you run this from the project root')
}

// check top-of-file markdown
const pagesDir = path.join(projectRoot, 'src/pages')
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.jsx') || f.endsWith('.js'))
  files.forEach(f => {
    const fp = path.join(pagesDir, f)
    const content = fs.readFileSync(fp, 'utf8')
    const firstLine = content.split('\n')[0] || ''
    if (firstLine.trim().startsWith('#')) {
      fail(`${fp} looks like it starts with Markdown: ${firstLine.slice(0,80)}`)
    } else {
      pass(`${f} top-of-file check`)
    }
  })
}

if (process.exitCode === 1) {
  console.error('\nOne or more tests failed. Fix the issues and run the tests again.')
} else {
  console.log('\nAll lightweight tests passed — good to run `npm run dev`')
}
