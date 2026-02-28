// Simple static audit to flag untyped callback params in map/reduce and Prisma $transaction
// Scans app/api for patterns that commonly cause prod-only implicit any errors
// Usage: node scripts/audit-implicit-any-maps.js
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const TARGET_DIR = path.join(ROOT, "app", "api");
const FILE_EXTS = new Set([".ts", ".tsx"]);

/** Return all files in dir recursively */
function walk(dir) {
  const out = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...walk(full));
    } else if (FILE_EXTS.has(path.extname(e.name))) {
      out.push(full);
    }
  }
  return out;
}

function findIssues(fileContent) {
  const issues = [];
  const src = fileContent;

// Support both: arr.map((x) => ...) and arr.map(x => ...)
const mapParenRegex = /\.map\(\s*\(([\s\S]*?)\)\s*=>/g; // dotAll
const mapBareRegex = /\.map\(\s*([A-Za-z_\$][\w\$]*)\s*=>/g;
// reduce always has parentheses, but allow multiline between parens and arrow
const reduceRegex = /\.reduce\(\s*\(([\s\S]*?)\)\s*=>/g;
// Function form: arr.map(function (x) { ... })
const mapFuncRegex = /\.map\(\s*function\s*\(\s*([^\)]*?)\s*\)/g;
// Prisma transaction: prisma.$transaction(async (tx) => ...) or prisma.$transaction((tx) => ...)
const txAsyncRegex = /\$transaction\(\s*async\s*\(\s*([^\)]*?)\s*\)/g;
const txRegex = /\$transaction\(\s*\(\s*([^\)]*?)\s*\)\s*=>/g;
  // Global explicit any detector (best-effort, may include false positives)
  const explicitAnyRegex = /:\s*any\b/g;

  const pushIssueFromMatch = (regex, message) => {
    let m;
    regex.lastIndex = 0;
    while ((m = regex.exec(src))) {
      const before = src.slice(0, m.index);
      const line = before.split(/\r?\n/).length - 1; // zero-based
      const params = (m[1] || "").trim();
      if (!params) continue;
      const excerpt = src.slice(m.index, m.index + Math.min(160, src.length - m.index)).split(/\r?\n/)[0].trim();
      // If any param explicitly typed as ': any', flag
      if (/:\s*any\b/.test(params)) {
        issues.push({ line: line + 1, message: "Explicit ': any' in callback parameters (avoid explicit any)", excerpt });
        continue;
      }
      // If none of the params have a type annotation ':', flag
      if (!params.includes(":")) {
        issues.push({ line: line + 1, message, excerpt });
      }
    }
  };

  pushIssueFromMatch(mapParenRegex, "Untyped parameter(s) in map(...) callback (add type annotations)");
  pushIssueFromMatch(mapBareRegex, "Untyped parameter in map(...) callback (add a type annotation)");
  pushIssueFromMatch(mapFuncRegex, "Untyped parameter(s) in map(function ...) callback (add type annotations)");
  pushIssueFromMatch(reduceRegex, "Untyped parameter(s) in reduce(...) callback (add type annotations)");
  pushIssueFromMatch(txAsyncRegex, "Untyped parameter in $transaction(async (tx) => ...) callback");
  pushIssueFromMatch(txRegex, "Untyped parameter in $transaction((tx) => ...) callback");

  // Global ': any' scan
  let ma;
  explicitAnyRegex.lastIndex = 0;
  while ((ma = explicitAnyRegex.exec(src))) {
    const before = src.slice(0, ma.index);
    const line = before.split(/\r?\n/).length; // 1-based directly
    const excerpt = src.slice(ma.index - 40, ma.index + 40).replace(/\r?\n/g, " ");
    issues.push({
      line,
      message: "Explicit ': any' detected (consider narrowing the type)",
      excerpt: excerpt.trim(),
    });
  }
  return issues;
}

function main() {
  if (!fs.existsSync(TARGET_DIR)) {
    console.log("No app/api directory found. Nothing to scan.");
    process.exit(0);
  }
  const files = walk(TARGET_DIR);
  const all = [];
  for (const f of files) {
    const content = fs.readFileSync(f, "utf8");
    const issues = findIssues(content);
    if (issues.length) {
      all.push({ file: f, issues });
    }
  }
  if (!all.length) {
    console.log("No untyped callback parameters detected in app/api.");
    process.exit(0);
  }
  console.log("Potential implicit-any callback parameters found:\n");
  for (const { file, issues } of all) {
    console.log(file.replace(ROOT + path.sep, ""));
    for (const it of issues) {
      console.log(`  L${it.line}: ${it.message}`);
      console.log(`    ${it.excerpt}`);
    }
    console.log();
  }
  process.exit(2);
}

main();

