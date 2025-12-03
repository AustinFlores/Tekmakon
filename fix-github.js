const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

// 1. Create .nojekyll to disable Jekyll (fixes 404s on _next folder)
const noJekyllPath = path.join(outDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');
console.log('✅ Created .nojekyll file');

// 2. Create CNAME for your custom domain
const cnamePath = path.join(outDir, 'CNAME');
fs.writeFileSync(cnamePath, '4wardph.com');
console.log('✅ Created CNAME file');