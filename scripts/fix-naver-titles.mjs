#!/usr/bin/env node
/**
 * Naver title length fixer
 * Guide: suffix " | 이사독립 가이드" = 11 chars → max raw = 33
 * Blog:  suffix " | 이사독립"       = 7 chars  → max raw = 37
 */
import { readFileSync, writeFileSync } from 'fs';
import { readdirSync, statSync } from 'fs';
import path from 'path';

const NAVER_LIMIT = 44;
const BLOG_MAX = NAVER_LIMIT - 7;  // 37
const GUIDE_MAX = NAVER_LIMIT - 11; // 33

function isGuideFile(filePath) {
  const p = filePath.replace(/\\/g, '/');
  return p.includes('guide-expansion') || p.includes('guides.ts') ||
         p.includes('guides-scheduled');
}

function cutAtBoundary(text, max) {
  if (text.length <= max) return text;
  const lastSpace = text.substring(0, max).lastIndexOf(' ');
  return lastSpace > max * 0.6 ? text.substring(0, lastSpace) : text.substring(0, max);
}

function shorten(title, max) {
  if (title.length <= max) return null;

  const colonIdx = title.indexOf(': ');
  if (colonIdx > 0) {
    const main = title.substring(0, colonIdx);
    const sub  = title.substring(colonIdx + 2);

    if (main.length <= max) {
      const remaining = max - main.length - 2;
      if (remaining >= 4) {
        return `${main}: ${cutAtBoundary(sub, remaining)}`;
      }
      return main;
    }
    return cutAtBoundary(title, max);
  }

  const midDot = title.indexOf('·');
  if (midDot > 0 && midDot <= max) {
    return title.substring(0, midDot);
  }

  return cutAtBoundary(title, max);
}

function walkTs(dir) {
  const results = [];
  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) results.push(...walkTs(full));
    else if (entry.endsWith('.ts')) results.push(full);
  }
  return results;
}

const dataDir = path.resolve('data');
const files = walkTs(dataDir);

let totalFixes = 0;
const dryRun = process.argv.includes('--dry');

for (const file of files) {
  const max = isGuideFile(file) ? GUIDE_MAX : BLOG_MAX;
  let content = readFileSync(file, 'utf8');
  let modified = false;

  // Match title: "..." or title: '...'
  const re = /title:\s*["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(content)) !== null) {
    const old = m[1];
    if (old.length <= max) continue;
    const fixed = shorten(old, max);
    if (!fixed || fixed === old) continue;

    const rel = path.relative(dataDir, file);
    console.log(`[${rel}] ${old.length}→${fixed.length}  "${old}" → "${fixed}"`);
    if (!dryRun) {
      content = content.replace(`"${old}"`, `"${fixed}"`);
      modified = true;
    }
    totalFixes++;
  }

  if (modified) writeFileSync(file, content, 'utf8');
}

console.log(`\n${dryRun ? '[DRY RUN] ' : ''}Total fixes: ${totalFixes}`);
