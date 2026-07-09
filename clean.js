const fs = require('fs');
const path = require('path');
const strip = require('strip-comments');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      walk(dirPath, callback);
    } else {
      callback(path.join(dir, f));
    }
  });
}

function processFile(filePath) {
  if (!filePath.match(/\.(ts|tsx|js|jsx|css|sql|prisma)$/)) return;
  let original = fs.readFileSync(filePath, 'utf8');
  let content = original;
  
  const placeholders = [];
  
  const preserveRegex = /\/\/(?:\s*@ts-ignore|\s*@ts-expect-error|\s*eslint-disable[^\n]*).*|\/\*[\s\S]*?(?:eslint-disable|#__PURE__)[\s\S]*?\*\//g;
  
  content = content.replace(preserveRegex, match => {
    const placeholder = `__PRESERVED_COMMENT_${placeholders.length}__`;
    placeholders.push(match);
    return placeholder;
  });

  content = content.replace(/\{\s*\/\*[\s\S]*?\*\/\s*\}/g, '');
  
  content = strip(content);
  
  placeholders.forEach((p, i) => {
    content = content.replace(`__PRESERVED_COMMENT_${i}__`, p);
  });
  
  // Try to remove lines that just became empty (spaces + newline) without ruining general formatting
  content = content.replace(/^[ \t]+$/gm, '');
  content = content.replace(/(\r?\n){3,}/g, '\n\n');

  if (content !== original) {
    console.log("Processed:", filePath);
    fs.writeFileSync(filePath, content, 'utf8');
  }
}

walk('./src', processFile);
if (fs.existsSync('./prisma/schema.prisma')) {
  processFile('./prisma/schema.prisma');
}
