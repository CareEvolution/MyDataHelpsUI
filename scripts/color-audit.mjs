#!/usr/bin/env node
// Color audit: WCAG 2.x ratio + APCA Lc (both polarities) for the --mdh-* ramp and the
// --mdhui-* semantic mapping, checked against the dual-conformance role floors
// (TEXT_ROLES below).
//
// Usage:
//   node scripts/color-audit.mjs semantic --scheme dark [--ci]   # audit semantic role pairs
//   node scripts/color-audit.mjs semantic --scheme light [--ci]
//   node scripts/color-audit.mjs ramp [--hue red] [--json]       # per-hue delta -> min Lc/ratio
//   node scripts/color-audit.mjs pair "#fff" "#1d1c22"           # ad-hoc one pair
//
// Exit code: 0 = all required pairs pass, 1 = a required pair fails (CI-friendly), 2 = usage.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { calcAPCA } from 'apca-w3';
import Color from 'colorjs.io';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const GLOBALCSS = join(ROOT, 'src/helpers/globalCss.ts');
const src = readFileSync(GLOBALCSS, 'utf8');

// ---- parse the --mdh-* ramp (literal hexes) ----
const ramp = {};
for (const m of src.matchAll(/(--mdh-[a-z0-9-]+)\s*:\s*(#[0-9A-Fa-f]{3,8})/g)) ramp[m[1]] = m[2];

// ---- resolve a semantic value to a hex (follows var() hops through --mdhui aliases and
//      into the --mdh ramp; raw hex passes through) ----
function resolve(val, toks = {}, depth = 0) {
  val = (val ?? '').trim();
  if (depth > 4) return null; // cycle guard
  const v = val.match(/^var\((--[a-z0-9-]+)\)$/);
  if (v) {
    if (ramp[v[1]]) return ramp[v[1]];
    if (toks[v[1]]) return resolve(toks[v[1]], toks, depth + 1);
    return null;
  }
  if (/^#[0-9A-Fa-f]{3,8}$/.test(val)) return val;
  if (/^rgb/i.test(val)) return val;
  return null; // gradients / nested / unresolvable
}

// ---- parse the :root declarations in `core` ----
// Accents are declared once in core's :root; dark overrides them, light inherits. Without
// core, the light audit would never see an accent. Scan only :root blocks — core also holds
// @keyframes and @media blocks, and a media-conditional value must not beat the :root one.
function coreTokens() {
  const start = src.indexOf('export const core');
  if (start < 0) throw new Error('core not found');
  const next = src.indexOf('export const', start + 'export const core'.length);
  const block = src.slice(start, next < 0 ? src.length : next);
  const toks = {};
  for (const m of block.matchAll(/:root\s*\{/g)) {
    let depth = 1, i = m.index + m[0].length; const from = i;
    for (; i < block.length && depth > 0; i++) { if (block[i] === '{') depth++; else if (block[i] === '}') depth--; }
    for (const d of block.slice(from, i - 1).matchAll(/(--mdhui-[a-z0-9-]+)\s*:\s*([^;]+);/g)) toks[d[1]] = d[2].trim();
  }
  return toks;
}

// ---- parse a semantic style object (lightColorStyle / darkColorStyle), over core ----
function semanticTokens(scheme) {
  const name = scheme === 'dark' ? 'darkColorStyle' : 'lightColorStyle';
  const start = src.indexOf(`export const ${name}`);
  if (start < 0) throw new Error(`${name} not found`);
  const open = src.indexOf('{', start);
  let depth = 0, end = -1;
  for (let i = open; i < src.length; i++) { if (src[i] === '{') depth++; else if (src[i] === '}') { if (--depth === 0) { end = i; break; } } }
  const block = src.slice(open, end);
  const toks = {};
  for (const m of block.matchAll(/'(--mdhui-[a-z0-9-]+)'\s*:\s*'([^']+)'/g)) toks[m[1]] = m[2];
  return { ...coreTokens(), ...toks };
}

// ---- metrics ----
const wcag = (fg, bg) => new Color(fg).contrast(bg, 'WCAG21');
const apca = (fg, bg) => calcAPCA(fg, bg);                 // signed Lc; negative = light-on-dark
const minLc = (a, b) => Math.min(Math.abs(apca(a, b)), Math.abs(apca(b, a))); // weaker polarity

// ---- conformance floors (dark/light polarity as computed) ----
const TEXT_ROLES = [
  { role: 'primary text',   tokens: ['--mdhui-text-color-0', '--mdhui-text-color-1'], wcag: 4.5, apca: 75 },
  { role: 'secondary text', tokens: ['--mdhui-text-color-2'],                          wcag: 4.5, apca: 60 },
  { role: 'muted text',     tokens: ['--mdhui-text-color-3'],                          wcag: 3.0, apca: 45 },
  { role: 'disabled text',  tokens: ['--mdhui-text-color-4'],                          wcag: 0,   apca: 30, exempt: true },
];
const SURFACES = ['--mdhui-background-color-0', '--mdhui-background-color-1', '--mdhui-background-color-2'];
const BORDERS = ['--mdhui-border-color-0', '--mdhui-border-color-1', '--mdhui-border-color-2'];

// Accents and signals split their duties across tokens, checked against different floors:
//   base  — fills (buttons, chips). A filled control with contrasting text on it needs
//           no boundary contrast (WCAG 1.4.11 exemption), so the base token is checked
//           for the white text it carries, not against the surface behind it.
//   -mark — data ink (meter fills, plot pills, chart marks): non-text functional, so it
//           gets the 3:1 floor vs the surface.
//   -text — the same role as foreground (links, status text, icons that must be seen).
const ACCENTS = ['primary', 'success', 'warning', 'danger'];
const SIGNALS = ['glucose', 'heart-rate', 'activity', 'sleep', 'air-quality'];
// Signals whose -mark doubles as their foreground color. Named explicitly (not probed for)
// so a typo'd -text token can't skip its own check; the mark is then audited at the
// foreground floors, keeping "the mark can carry text" honest.
const TEXT_VIA_MARK = new Set(['air-quality']);
const FILL_INK = '#fff';                 // what the accent fills carry
// -text is used at many sizes/weights (links, 15px/600 headings, status text): WCAG normal-text
// floor plus the APCA muted/large tier. Aim higher for small body-size foregrounds.
const FOREGROUND_FLOORS = { wcag: 4.5, apca: 45 };
const MARK_FLOORS = { wcag: 3.0, apca: 15 };

function auditSemantic(scheme, ci) {
  const t = semanticTokens(scheme);
  const hex = k => (k.startsWith('#') ? k : resolve(t[k] ?? '', t));
  const rows = [];
  let fails = 0;
const pushPair = (label, fg, bg, wFloor, aFloor, exempt) => {
    const fH = hex(fg), bH = hex(bg);
    // A token that doesn't resolve FAILS instead of skipping — otherwise a rename would
    // silently drop its checks and the run would still say PASS. Exempt pairs only report,
    // so a renamed border token still slips through (text-color-4 would too, but the
    // distinct34 check below catches it).
    if (!fH || !bH) {
      if (!exempt) fails++;
      rows.push({ label, note: `unresolved (${t[fg]} / ${t[bg]})${exempt ? '' : ' — FAIL'}`, skip: true });
      return;
    }
    const w = wcag(fH, bH), lc = Math.abs(apca(fH, bH));
    const passW = exempt || w >= wFloor, passA = exempt || lc >= aFloor;
    const pass = passW && passA;
    if (!pass && !exempt) fails++;
    rows.push({ label, w, lc, wFloor, aFloor, pass, exempt, aExtra: lc >= aFloor });
  };
  // text on each surface
  for (const rr of TEXT_ROLES) for (const tok of rr.tokens) for (const s of SURFACES)
    pushPair(`${rr.role} (${tok.replace('--mdhui-text-color-', 't')}) on ${s.replace('--mdhui-background-color-', 'bg')}`, tok, s, rr.wcag, rr.apca, rr.exempt);
  // borders on the matching surface (border-N on bg-N) — reported, not gating: all
  // --mdhui-border-* uses are structural, which WCAG 1.4.11 exempts from a floor.
  BORDERS.forEach((b, i) => pushPair(`border ${i} on bg${i}`, b, SURFACES[Math.min(i, SURFACES.length - 1)], 0, 15, true));
  const bgName = s => s.replace('--mdhui-background-color-', 'bg');
  for (const a of ACCENTS) {
    pushPair(`#fff on ${a} fill`, FILL_INK, `--mdhui-color-${a}`, 4.5, 45, false);
    for (const s of SURFACES) {
      // fills are 1.4.11-exempt against the surface (their ink identifies them) — reported only
      pushPair(`${a} fill vs ${bgName(s)}`, `--mdhui-color-${a}`, s, 3.0, 15, true);
      pushPair(`${a}-text on ${bgName(s)}`, `--mdhui-color-${a}-text`, s, FOREGROUND_FLOORS.wcag, FOREGROUND_FLOORS.apca, false);
      pushPair(`${a}-mark on ${bgName(s)}`, `--mdhui-color-${a}-mark`, s, MARK_FLOORS.wcag, MARK_FLOORS.apca, false);
    }
  }
  for (const g of SIGNALS) {
    for (const s of SURFACES) {
      // Every signal is checked for both duties; nothing opts out of the foreground floor.
      pushPair(`${g}-mark on ${bgName(s)}`, `--mdhui-color-${g}-mark`, s, MARK_FLOORS.wcag, MARK_FLOORS.apca, false);
      if (TEXT_VIA_MARK.has(g))
        pushPair(`${g}-mark as text on ${bgName(s)}`, `--mdhui-color-${g}-mark`, s, FOREGROUND_FLOORS.wcag, FOREGROUND_FLOORS.apca, false);
      else
        pushPair(`${g}-text on ${bgName(s)}`, `--mdhui-color-${g}-text`, s, FOREGROUND_FLOORS.wcag, FOREGROUND_FLOORS.apca, false);
    }
  }
  // adjacent elevation surfaces — target Lc 15 (or border-assisted; reported, not gating)
  const surfPairs = [[0, 1], [1, 2]];
  const surfaceNotes = surfPairs.map(([a, b]) => {
    const A = hex(SURFACES[a]), B = hex(SURFACES[b]);
    return { label: `surface bg${a} vs bg${b}`, w: wcag(A, B), lc: minLc(A, B) };
  });
  // text-3 vs text-4 must differ (spec acceptance)
  const t3 = hex('--mdhui-text-color-3'), t4 = hex('--mdhui-text-color-4');
  const distinct34 = t3 && t4 && t3.toLowerCase() !== t4.toLowerCase();

  // ---- report ----
  console.log(`\n=== SEMANTIC AUDIT — ${scheme.toUpperCase()} scheme (role floors) ===\n`);
  console.log('  role pair'.padEnd(40) + 'WCAG'.padStart(8) + 'APCA Lc'.padStart(10) + '  floors      verdict');
  for (const r of rows) {
    if (r.skip) { console.log('  ' + r.label.padEnd(38) + '  ' + r.note); continue; }
    const v = r.exempt ? (r.aExtra ? 'exempt ✓vis' : 'exempt') : (r.pass ? 'PASS' : 'FAIL');
    console.log('  ' + r.label.padEnd(38) + fmt(r.w, 1, ':1').padStart(8) + fmt(r.lc, 1).padStart(10) + `  ${r.wFloor}/${r.aFloor}`.padEnd(12) + '  ' + v);
  }
  console.log('\n  surfaces & separation:');
  for (const s of surfaceNotes) console.log('  ' + s.label.padEnd(38) + fmt(s.w, 2, ':1').padStart(8) + fmt(s.lc, 1).padStart(10) + `  (target Lc 15 or border)`);
  console.log(`  text-3 ≠ text-4: ${distinct34 ? 'yes ✓' : 'NO ✗ (spec requires distinct muted vs disabled)'}`);
  const ok = fails === 0 && distinct34;
  console.log(`\n  ${fails} required-pair failure(s). ${ok ? 'PASS' : 'FAIL'}\n`);
  if (ci) process.exit(ok ? 0 : 1);
  return ok;
}

function auditRamp(hueFilter, json) {
  // per hue: for each grade pair, WCAG + min-Lc; summarize delta -> min guaranteed Lc/ratio
  const hues = {};
  for (const k of Object.keys(ramp)) {
    const m = k.match(/^--mdh-([a-z-]+)-(\d+)$/); if (!m) continue;
    (hues[m[1]] ??= []).push({ g: +m[2], hex: ramp[k] });
  }
  const out = {};
  for (const [hue, grades] of Object.entries(hues)) {
    if (hueFilter && hue !== hueFilter) continue;
    grades.sort((a, b) => a.g - b.g);
    const byDelta = {};
    for (let i = 0; i < grades.length; i++) for (let j = i + 1; j < grades.length; j++) {
      const d = grades[j].g - grades[i].g;
      const lc = minLc(grades[i].hex, grades[j].hex), w = wcag(grades[i].hex, grades[j].hex);
      (byDelta[d] ??= { minLc: Infinity, minW: Infinity }); byDelta[d].minLc = Math.min(byDelta[d].minLc, lc); byDelta[d].minW = Math.min(byDelta[d].minW, w);
    }
    out[hue] = byDelta;
  }
  if (json) { console.log(JSON.stringify(out, null, 2)); return true; }
  for (const [hue, byDelta] of Object.entries(out)) {
    console.log(`\n${hue}:  delta -> min guaranteed (Lc / WCAG) across all pairs at that grade gap`);
    for (const d of Object.keys(byDelta).map(Number).sort((a, b) => a - b))
      console.log(`  Δ${String(d).padStart(3)}   Lc ${fmt(byDelta[d].minLc, 1).padStart(6)}   ${fmt(byDelta[d].minW, 2).padStart(6)}:1`);
  }
  return true;
}

function fmt(n, dp, suf = '') { return (n == null || !isFinite(n)) ? '—' : n.toFixed(dp) + suf; }

// ---- CLI ----
const [, , mode, ...rest] = process.argv;
const flag = n => rest.includes(n);
const opt = n => { const i = rest.indexOf(n); return i >= 0 ? rest[i + 1] : undefined; };
try {
  if (mode === 'semantic') auditSemantic(opt('--scheme') || 'dark', flag('--ci'));
  else if (mode === 'ramp') auditRamp(opt('--hue'), flag('--json'));
  else if (mode === 'pair') { const [fg, bg] = rest; console.log(`WCAG ${fmt(wcag(fg, bg), 2)}:1  |  APCA Lc ${fmt(apca(fg, bg), 1)} (fg-on-bg) / ${fmt(apca(bg, fg), 1)} (bg-on-fg)  |  min |Lc| ${fmt(minLc(fg, bg), 1)}`); }
  else { console.error('usage: color-audit.mjs <semantic|ramp|pair> [...]'); process.exit(2); }
} catch (e) { console.error('error:', e.message); process.exit(2); }
