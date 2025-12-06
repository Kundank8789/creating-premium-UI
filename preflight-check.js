const fs = require('fs')
const path = require('path')

function readJSONSafe(file) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')) } catch (e) { return null }
}

const pkg = readJSONSafe(path.join(process.cwd(), 'package.json')) || {}
const usesTS = !!((pkg.devDependencies && pkg.devDependencies.typescript) || (pkg.dependencies && pkg.dependencies.typescript))

const candidates = [
  path.join(process.cwd(), 'src/pages/index.jsx'),
  path.join(process.cwd(), 'pages/index.jsx'),
]

let problems = []

candidates.forEach(c => {
  if (fs.existsSync(c)) {
    problems.push(`Found ${path.relative(process.cwd(), c)} — ensure you intended to use JS/JSX or rename to .tsx`)
  }
})

// scan page files for markdown header line
const pagesDir = path.join(process.cwd(), 'src/pages')
if (fs.existsSync(pagesDir)) {
  const files = fs.readdirSync(pagesDir)
  files.forEach(f => {
    const fp = path.join(pagesDir, f)
    if (fs.statSync(fp).isFile()) {
      const content = fs.readFileSync(fp, 'utf8')
      const lines = content.split('\n')
      if (lines[0] && lines[0].trim().startsWith('#')) {
        problems.push(`File ${path.relative(process.cwd(), fp)} looks like it starts with Markdown (line: ${lines[0].slice(0,80)})`)
      }
    }
  })
}

if (!usesTS && problems.length) {
  console.log('\nPreflight check — problems found:')
  problems.forEach(p => console.log(' -', p))
  console.log('\nFix the problems or run with JavaScript/TypeScript set up correctly. Exiting with code 1 to prevent dev run.')
  process.exit(1)
}

console.log('Preflight check passed — no obvious issues')
