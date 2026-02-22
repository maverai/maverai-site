/**
 * Builds assets/docs/resume.pdf from assets/docs/resume.tex using pdflatex.
 * Requires: pdflatex on PATH (e.g. TeX Live, MiKTeX, or TinyTeX).
 * Run: npm run build-resume
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const docsDir = path.join(__dirname, '..', 'assets', 'docs');
const texPath = path.join(docsDir, 'resume.tex');
const pdfPath = path.join(docsDir, 'resume.pdf');

if (!fs.existsSync(texPath)) {
  console.error('Not found:', texPath);
  process.exit(1);
}

function runPdfLatex() {
  return new Promise((resolve, reject) => {
    const proc = spawn(
      'pdflatex',
      ['-interaction=nonstopmode', '-halt-on-error', 'resume.tex'],
      { cwd: docsDir, stdio: 'inherit' }
    );
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`pdflatex exited ${code}`))));
  });
}

(async () => {
  try {
    await runPdfLatex();
    await runPdfLatex(); // second run for references/ToC
    if (fs.existsSync(pdfPath)) {
      console.log('Written:', pdfPath);
    } else {
      console.error('PDF was not produced.');
      process.exit(1);
    }
  } catch (e) {
    console.error(e.message || e);
    console.error('Ensure pdflatex is installed (e.g. TeX Live, MiKTeX, or run the GitHub Action to build the PDF).');
    process.exit(1);
  }
})();
