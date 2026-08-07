import React, { useRef } from 'react';
import './colorDocs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy as faCopyRegular } from '@fortawesome/free-regular-svg-icons';
import { faCopy as faCopySolid } from '@fortawesome/free-solid-svg-icons';
import { APCAcontrast, sRGBtoY } from 'apca-w3';
import { darkColorStyle, lightColorStyle } from '../../helpers/globalCss';

// A walk around the wheel: each muted family sits beside its vivid parent.
const colors: string[] = [
  'grey',
  'blue-grey',
  'blue-muted',
  'blue',
  'cobalt',
  'indigo',
  'iris',
  'violet',
  'purple',
  'magenta',
  'fuchsia',
  'pink',
  'red-muted',
  'red',
  'red-orange',
  'orange',
  'amber',
  'gold',
  'yellow',
  'chartreuse',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'azure',
];

const grades = [1, 2, 3, 4, 5, 10, 20, 30, 35, 40, 50, 55, 60, 70, 80, 85, 90, 95, 99];

const gradientsNames: string[] = [
  'alpine-overlook',
  'alpine-overlook-dark',
  'tropical-mist',
  'tropical-mist-dark',
  'summit-sunset',
  'summit-sunset-dark',
  'cold-front',
  'cold-front-dark',
  'summer-solstice',
  'summer-solstice-dark',
  'high-noon',
  'high-noon-dark',
  'midnight-moon',
  'midnight-moon-dark',
  'open-horizon',
  'open-horizon-dark',
  'early-bird',
  'early-bird-dark',
  'evergreen-petrichor',
  'evergreen-petrichor-dark',
]

interface ColorCellProps {
  hue: string;
  grade: number;
}



const CopyIcon: React.FC<{ hovered: boolean; variant: 'light' | 'dark' }> = ({ hovered, variant }) => (
  <FontAwesomeIcon
    icon={hovered ? faCopySolid : faCopyRegular}
    className={`colorCell-copyIcon ${variant === 'dark' ? 'colorCell-copyIcon-dark' : 'colorCell-copyIcon-light'}`}
    aria-hidden="true"
  />
);


// Helper: Convert rgb/rgba to hex
function rgbToHex(rgb: string) {
  const result = rgb.match(/\d+/g);
  if (!result) return rgb;
  let [r, g, b] = result;
  return (
    '#' +
    [r, g, b]
      .map(x => {
        const hex = parseInt(x).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      })
      .join('')
  );
}

// Helper: Hex to RGB array
function hexToRgb(hex: string) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
  const num = parseInt(hex, 16);
  return [num >> 16, (num >> 8) & 255, num & 255];
}

// Helper: WCAG 2.x contrast ratio
function luminance([r, g, b]: number[]) {
  const a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}
function wcagContrast(rgb1: number[], rgb2: number[]) {
  const l1 = luminance(rgb1);
  const l2 = luminance(rgb2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
// APCA-4g Lc via the official apca-w3 package 
// The sign encodes polarity: positive = dark text on light bg, negative = light on dark.
function apcaLc(text: number[], background: number[]) {
  return APCAcontrast(sRGBtoY(text), sRGBtoY(background));
}

// Label for a conformance level: WCAG A/AA/AAA, or an APCA text-role band
function ContrastLevelLabel({ level }: { level: string }) {
  const colorByLevel: { [level: string]: string } = {
    'AA large': 'var(--color-highlight-40)',
    'AA': 'var(--color-highlight-50)',
    'AAA': 'var(--color-highlight-70)',
    'muted': 'var(--color-highlight-40)',
    'body': 'var(--color-highlight-50)',
    'primary': 'var(--color-highlight-70)',
    'non-text': 'var(--mdh-grey-50)',
  };
  return (
    <span style={{ color: colorByLevel[level] ?? 'var(--mdh-grey-40)', fontWeight: 600, fontSize: '14px' }}> {level || 'fails'}</span>
  );
}
// Helper: Get WCAG level for a contrast ratio. 3:1 is not Level A — it's the AA floor
// for large text and for non-text elements.
function getWcagLevel(contrast: number) {
  if (contrast >= 7) return 'AAA';
  if (contrast >= 4.5) return 'AA';
  if (contrast >= 3) return 'AA large';
  return '';
}
// APCA has no A/AA/AAA; label with the strongest text role the |Lc| supports. Each floor
// assumes a minimum font size and weight (75 = 18px/400, 60 = 24px/400, 45 = 36px/400),
// so these labels are a best case.
function getApcaRole(lc: number) {
  const abs = Math.abs(lc);
  if (abs >= 75) return 'primary';
  if (abs >= 60) return 'body';
  if (abs >= 45) return 'muted';
  if (abs >= 15) return 'non-text';
  return '';
}

const ColorCell: React.FC<ColorCellProps & {
  hoveredGrade?: number;
  highlight40?: boolean;
  highlight50?: boolean;
  highlight70?: boolean;
  onHover?: (grade: number | null) => void;
}> = ({ hue, grade, hoveredGrade, highlight40, highlight50, highlight70, onHover }) => {
  const color = `var(--mdh-${hue}-${grade})`;
  const colorDivRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [showIcon, setShowIcon] = React.useState(false);

  const handleClick = async () => {
    await navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const isLight = grade < 50;
  let highlightClass = '';
  if (highlight40) highlightClass += ' colorCell-highlight40';
  if (highlight50) highlightClass += ' colorCell-highlight50';
  if (highlight70) highlightClass += ' colorCell-highlight70';

  return (
    <div
      className={`colorCell${highlightClass} ${isLight ? 'grade-light' : 'grade-dark'}`}
      onClick={handleClick}
      title={`Click to copy ${color}`}
      style={{ position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => { setShowIcon(true); onHover && onHover(grade); }}
      onMouseLeave={() => { setShowIcon(false); onHover && onHover(null); }}
    >


      <div className="color" ref={colorDivRef} style={{ backgroundColor: color, position: 'relative' }}>
        <div className={`colorCell-overlay ${isLight ? 'colorCell-overlay-light' : 'colorCell-overlay-dark'}`}>
          <span className="colorCell-gradeLabel">{grade}</span>
        </div>
        {showIcon && (
          <div
            className={`colorCell-tooltip ${isLight ? 'colorCell-tooltip-darkbg' : 'colorCell-tooltip-lightbg'}`}
          >
            <div className="colorCell-tooltipRow">
              <div className="colorCell-tooltipTitle">WCAG 2.x</div>
              <span className="colorCell-detailGroup">
                {(() => {
                  const colorVal = colorDivRef.current ? rgbToHex(window.getComputedStyle(colorDivRef.current).backgroundColor) : '';
                  const rgb = colorVal ? hexToRgb(colorVal) : [0, 0, 0];
                  const wcagWhite = wcagContrast(rgb, [255, 255, 255]);
                  const wcagBlack = wcagContrast(rgb, [0, 0, 0]);
                  return <>
                    <span className="colorCell-detailLabel">
                      <span>#fff: <b>{wcagWhite.toFixed(2)}</b></span>
                      <ContrastLevelLabel level={getWcagLevel(wcagWhite)} />
                    </span>
                    <span className="colorCell-detailLabel">
                      <span>#000: <b>{wcagBlack.toFixed(2)}</b></span>
                      <ContrastLevelLabel level={getWcagLevel(wcagBlack)} />
                    </span>
                  </>;
                })()}
              </span>
            </div>
            <div className="colorCell-tooltipRow">
              <div className="colorCell-tooltipTitle">APCA Lc (as text / as background)</div>
              <span className="colorCell-detailGroup">
                {(() => {
                  const colorVal = colorDivRef.current ? rgbToHex(window.getComputedStyle(colorDivRef.current).backgroundColor) : '';
                  const rgb = colorVal ? hexToRgb(colorVal) : [0, 0, 0];
                  // The label reflects the weaker direction — what the palette guarantees.
                  return ([['#fff', [255, 255, 255]], ['#000', [0, 0, 0]]] as [string, number[]][]).map(([label, other]) => {
                    const asText = apcaLc(rgb, other);
                    const asBackground = apcaLc(other, rgb);
                    const weaker = Math.min(Math.abs(asText), Math.abs(asBackground));
                    return (
                      <span className="colorCell-detailLabel" key={label}>
                        <span>{label}: <b>{Math.round(asText)}</b> / <b>{Math.round(asBackground)}</b></span>
                        <ContrastLevelLabel level={getApcaRole(weaker)} />
                      </span>
                    );
                  });
                })()}
              </span>
            </div>
          </div>
        )}
      </div>
      <CopyIcon hovered={showIcon} variant={isLight ? 'light' : 'dark'} />
      {copied && (
        <div className="colorCell-copiedTooltip">Copied {color}</div>
      )}
    </div>
  );
};

interface ColorRowProps {
  hue: string;
}

const ColorRow: React.FC<ColorRowProps> = ({ hue }) => {
  const [hoveredGrade, setHoveredGrade] = React.useState<number | null>(null);

  // Bands are the magic-number guarantees: 40 -> AA large, 50 -> AA, 70 -> AAA.
  const getHighlightIndexes = (band: number) => {
    if (hoveredGrade == null) return { left: null, right: null };
    let left: number | null = null;
    let right: number | null = null;
    for (let i = 0; i < grades.length; i++) {
      if (grades[i] <= hoveredGrade - band) left = i;
      if (right === null && grades[i] >= hoveredGrade + band) right = i;
    }
    return { left, right };
  };
  const highlight40 = getHighlightIndexes(40);
  const highlight50 = getHighlightIndexes(50);
  const highlight70 = getHighlightIndexes(70);

  return (
    <div className="colorRow">
      <header className="colorHeader">
        <h3>{hue}</h3>
        <p>
          <code>var(--mdh-{hue}-##)</code>
        </p>
      </header>
      <div className="colors">
        {grades.map((grade, idx) => (
          <ColorCell
            key={grade}
            hue={hue}
            grade={grade}
            hoveredGrade={hoveredGrade === null ? undefined : hoveredGrade}
            highlight40={hoveredGrade != null && (idx === highlight40.left || idx === highlight40.right)}
            highlight50={hoveredGrade != null && (idx === highlight50.left || idx === highlight50.right)}
            highlight70={hoveredGrade != null && (idx === highlight70.left || idx === highlight70.right)}
            onHover={setHoveredGrade}
          />
        ))}
      </div>
    </div>
  );
};

const GradientSection: React.FC = () => {
  const lightGradients = gradientsNames.filter(name => !name.endsWith('-dark'));
  const darkGradients = gradientsNames.filter(name => name.endsWith('-dark'));
  return (
    <div className="gradients">
      <header className="colorHeader">
        <h3>Gradients</h3>
        <p>
          Each gradient comes in a regular and a dark version: regular is made for black text on top, dark for white text.
          <code>var(--mdh-gradient-##)</code>
        </p>
      </header>
      <h4 style={{ margin: '8px 0 4px' }}>Light (for dark text)</h4>
      <div className="gradientCells">
        {lightGradients.map((gradient) => (
          <div className="colorCell" key={gradient}>
            <div className="color" style={{ background: `var(--mdh-gradient-${gradient})` }} />
            <div className='grade'>
              {gradient}
            </div>
          </div>
        ))}
      </div>
      <h4 style={{ margin: '16px 0 4px' }}>Dark (for light text)</h4>
      <div className="gradientCells">
        {darkGradients.map((gradient) => (
          <div className="colorCell" key={gradient}>
            <div className="color" style={{ background: `var(--mdh-gradient-${gradient})` }} />
            <div className='grade'>
              {gradient}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Anchors are the References list at the bottom; cvdPalette.tsx has a matching copy.
const Ref: React.FC<{ n: number }> = ({ n }) => (
  <sup style={{ fontSize: '10px' }}><a href={`#ref-${n}`} style={{ textDecoration: 'none' }}>[{n}]</a></sup>
);

// Scoping the real style objects per column means the preview can't drift from the tokens.
// Base token = fills, -text = the signal as foreground; heart-rate and air-quality have
// no -text token and fall back to the mark color. Ink is per value: air quality's light
// grade needs white where every other fill takes near-black.
const DARK_INK = '#12151b';
const LIGHT_INK = '#fff';
type SignalSwatch = { value: string; ink: string };
const SIGNALS: { name: string; fill: string; text: string; light: SignalSwatch; dark: SignalSwatch }[] = [
  { name: 'Sleep', fill: '--mdhui-color-sleep', text: '--mdhui-color-sleep-text', light: { value: '#7b88c6', ink: DARK_INK }, dark: { value: 'indigo-40', ink: DARK_INK } },
  { name: 'Heart rate', fill: '--mdhui-color-heart-rate', text: '--mdhui-color-heart-rate', light: { value: '#e35c33', ink: DARK_INK }, dark: { value: 'red-orange-40', ink: DARK_INK } },
  { name: 'Activity', fill: '--mdhui-color-activity', text: '--mdhui-color-activity-text', light: { value: '#f5b722', ink: DARK_INK }, dark: { value: 'gold-20', ink: DARK_INK } },
  { name: 'Air quality', fill: '--mdhui-color-air-quality', text: '--mdhui-color-air-quality', light: { value: 'teal-55', ink: LIGHT_INK }, dark: { value: 'teal-30', ink: DARK_INK } },
];

// Every sample sits in one column and its token name in the gutter beside it, so the
// card reads as plausible content on the left and a token index on the right.
const Line: React.FC<{ token: string; children: React.ReactNode }> = ({ token, children }) => (
  <div className="tokensCtx-line">
    <div>{children}</div>
    <span className="tokensCtx-ann">{token}</span>
  </div>
);
const Divider: React.FC<{ token: string; color: string }> = ({ token, color }) => (
  <div className="tokensCtx-divider">
    <div style={{ borderTop: `1px solid var(${color})` }} />
    <span className="tokensCtx-ann">{token}</span>
  </div>
);
const Caption: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="tokensCtx-caption">{children}</div>
);

const TokenContextCard: React.FC<{ scheme: 'light' | 'dark' }> = ({ scheme }) => (
  <div className="tokensCtx-surface">
    <div className="tokensCtx-card">
      <Caption>text</Caption>
      <Line token="text-0"><span style={{ color: 'var(--mdhui-text-color-0)', fontWeight: 700, fontSize: '19px' }}>118 mg/dL</span></Line>
      <Line token="text-1"><span style={{ color: 'var(--mdhui-text-color-1)', fontWeight: 700 }}>Blood glucose, last 7 days</span></Line>
      <Line token="text-2"><span style={{ color: 'var(--mdhui-text-color-2)' }}>Your readings stayed in range.</span></Line>
      <Line token="text-3"><span style={{ color: 'var(--mdhui-text-color-3)', fontSize: '13px' }}>Updated 2 hours ago</span></Line>
      <Line token="text-4"><span style={{ color: 'var(--mdhui-text-color-4)' }}>Sync unavailable</span></Line>
      <Divider token="border-1" color="--mdhui-border-color-1" />
      <Caption>accents — as text, then as fill</Caption>
      <Line token="primary-text"><span style={{ color: 'var(--mdhui-color-primary-text)', fontWeight: 700 }}>View details</span></Line>
      <Line token="success-text"><span style={{ color: 'var(--mdhui-color-success-text)', fontWeight: 700 }}>In range</span></Line>
      <Line token="warning-text"><span style={{ color: 'var(--mdhui-color-warning-text)', fontWeight: 700 }}>Running low</span></Line>
      <Line token="danger-text"><span style={{ color: 'var(--mdhui-color-danger-text)', fontWeight: 700 }}>Overdue</span></Line>
      <Line token="primary"><span style={{ background: 'var(--mdhui-color-primary)', color: '#fff', fontWeight: 700, borderRadius: '8px', padding: '6px 16px', display: 'inline-block' }}>Log reading</span></Line>
      <Line token="danger"><span style={{ background: 'var(--mdhui-color-danger)', color: '#fff', fontWeight: 700, borderRadius: '99px', padding: '3px 12px', fontSize: '13px', display: 'inline-block' }}>3 due</span></Line>
      <Line token="bg-2 · primary"><div className="tokensCtx-track"><div className="tokensCtx-fill" /></div></Line>
      <Divider token="border-2" color="--mdhui-border-color-2" />
      <Caption>signals — name in its text color, fill shows its value</Caption>
      {SIGNALS.map(signal => {
        const swatch = scheme === 'light' ? signal.light : signal.dark;
        return (
          <div className="tokensCtx-grid" key={signal.name}>
            <div style={{ color: `var(${signal.text})`, fontWeight: 700 }}>{signal.name}</div>
            <div style={{
              background: `var(${signal.fill})`, borderRadius: '6px', height: '24px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: swatch.ink, font: '700 10.5px ui-monospace, monospace',
            }}>{swatch.value}</div>
          </div>
        );
      })}
    </div>
    <div className="tokensCtx-ann" style={{ marginTop: '8px' }}>surface background-color-1 · card background-color-0 · card edge border-color-0</div>
  </div>
);

const TokensInContext: React.FC = () => (
  <div className="tokensCtx">
    <div className="tokensCtx-col">
      <div className="tokensCtx-colLabel">Light</div>
      <div style={lightColorStyle}><TokenContextCard scheme="light" /></div>
    </div>
    <div className="tokensCtx-col">
      <div className="tokensCtx-colLabel">Dark</div>
      <div style={darkColorStyle}><TokenContextCard scheme="dark" /></div>
    </div>
  </div>
);

const ColorDocs: React.FC = () => {
  return (
    <div>
      <h2>The "magic number" color system</h2>
      <p>The MyDataHelps color system makes accessible color the default, in light mode and dark. It
        takes the U.S. Web Design System's approach<Ref n={1} />, gives it more vibrant hues, and adds
        APCA<Ref n={4} />: a newer way of measuring contrast that dark mode needs, and the one WCAG 3
        is expected to adopt.</p>
      <p>Each color's name carries a number, and that number tells you how light or dark the color is.
        The gap between two of those numbers is the <strong>"magic number"</strong>: the wider the gap,
        the more contrast the pair is guaranteed to have, whichever two hues you picked. Choosing a
        readable pair comes down to subtraction, so nobody has to run colors through a contrast checker
        to know the answer.</p>
      <h3>Usage</h3>
      <p><code>color: var(--mdh-[hue]-[grade])</code> Example: <code>color: var(--mdh-blue-40)</code> </p>
      <p>The palette is <strong>25 hues plus a grey</strong>, each in <strong>19 grades</strong> from 1
        (near white) to 99 (near black), published as <code>--mdh-*</code> CSS custom properties. Ten
        gradients cover decorative surfaces, and the color-blind-safe palettes cover charts.</p>
      <p>In component code, always go through the semantic <code>--mdhui-*</code> tokens rather than the
        raw palette — the raw <code>--mdh-*</code> vars exist to define them, and the semantic layer is
        what keeps light and dark mode both correct.</p>
      <h4>Which magic number to use</h4>
      <p>Find the row for what you're coloring. <strong>WCAG</strong> is the legal floor that Section 508
        requires; <strong>APCA</strong> is the perceptual model drafted for WCAG 3, which asks for a bigger
        gap to reach the same readability. Both apply in either color scheme, so the APCA number is the one
        to reach for when you want a single figure to remember — dark mode is audited against it, and light
        pairs that only meet the WCAG minimum can still land short of it.</p>
      <div className="magicTableWrap">
        <table className="magicTable">
          <thead>
            <tr>
              <th>What you're coloring</th>
              <th>WCAG<Ref n={2} /><span>minimum</span></th>
              <th>APCA<Ref n={4} /><span>recommended, especially in dark mode</span></th>
            </tr>
          </thead>
          <tbody>
            <tr className="magicTable-default">
              <th scope="row">Body text<span>16–18px regular — the default for most content</span></th>
              <td>50+</td><td>80+</td>
            </tr>
            <tr>
              <th scope="row">Bold or emphasized text<span>16px bold — too small to count as large text</span></th>
              <td>50+</td><td>70+</td>
            </tr>
            <tr>
              <th scope="row">Large text<span>24px regular (18pt) — WCAG's large-text tier starts here</span></th>
              <td>40+</td><td>70+</td>
            </tr>
            <tr>
              <th scope="row">Headlines<span>36px regular, or 24px bold</span></th>
              <td>40+</td><td>60+</td>
            </tr>
            <tr>
              <th scope="row">Highest-contrast text<span>WCAG AAA at body size</span></th>
              <td>70+</td><td>80+</td>
            </tr>
            <tr>
              <th scope="row">Functional elements<span>input borders, focus rings, checkbox and toggle boundaries, icons, chart marks<Ref n={3} /></span></th>
              <td>40+</td><td>40+</td>
            </tr>
            <tr>
              <th scope="row">Structural elements<span>card edges, separators, dividers — 10 and 20 in light, 70 and 60 in dark</span></th>
              <td colSpan={2}>no minimum</td>
            </tr>
            <tr>
              <th scope="row">Backgrounds<span>the ends of the ramp — in dark: cards grey-85, app background grey-95, wells grey-99</span></th>
              <td colSpan={2}>1-5 light · 85-99 dark</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>Why dark mode needs the bigger gaps.</strong> The same gap buys less perceptual contrast
        at the dark end of the ramp: a 50-gap measures Lc 67 near the light end but only Lc 42 near the dark
        end, and WCAG rates that dark pair <em>higher</em> (5.5:1 vs 4.6:1) — the discrepancy APCA exists to
        catch. Dark answers don't mirror light ones either: text on tinted backgrounds needs 55 on the light
        end but 40 on the dark end — a band further out than symmetry would suggest — and status accents
        ride the 35 half-step on the grade-85 cards.</p>
      <details>
        <summary>The standards behind the numbers — WCAG and APCA</summary>
        <div className="details-content">
          <p><strong>WCAG levels.</strong> Level A doesn't say anything about contrast; the minimums start at AA:</p>
          <ul>
            <li><strong>AA</strong> (SC 1.4.3<Ref n={2} />): at least <b>4.5:1</b> for normal text and <b>3:1</b> for large text (18pt, or 14pt bold). This is the level to hit for most web content, and it's what Section 508 requires in the US.</li>
            <li><strong>AAA</strong> (SC 1.4.6<Ref n={2} />): at least <b>7:1</b> for normal text and <b>4.5:1</b> for large. Aim here when you want the widest possible audience; it's encouraged rather than required.</li>
            <li><strong>Non-text elements</strong> (SC 1.4.11, Level AA<Ref n={3} />): anything functional — input borders, focus rings, checkbox and toggle boundaries, icons, chart marks — needs at least <b>3:1</b> against what's next to it. Purely structural pieces (card edges, separators, dividers) are exempt.</li>
          </ul>
          <p><strong>APCA.</strong> WCAG 2.x measures contrast as a ratio of relative luminance; APCA
            (Accessible Perceptual Contrast Algorithm), drafted for WCAG 3, models how contrast actually
            looks to people<Ref n={4} />. The difference shows up most in dark mode, where the WCAG 2.x
            math is too optimistic about dark-on-dark pairs. Every pairing here is measured under both,
            taking the weaker of the two text/background directions, and APCA's text tiers need bigger gaps:</p>
          <ul>
            <li><strong>Gap 60+:</strong> muted and large text (APCA floor Lc 45; palette worst case 47).</li>
            <li><strong>Gap 70+:</strong> body text (floor Lc 60; worst case 68).</li>
            <li><strong>Gap 80+:</strong> primary text (floor Lc 75; worst case 81).</li>
          </ul>
          <p>WCAG 3 is still a draft and APCA isn't legally required yet, so the palette conforms to both:
            WCAG 2.x ratios stay the hard floor, the APCA measurements add the perceptual picture on top,
            and the dark-mode semantic tokens are built at the APCA gaps.</p>
        </div>
      </details>
      <h4>Tokens in context</h4>
      <p>The same card under each scheme. Read each row left to right: the sample on the left is drawn with
        the token named on the right. Every color here is a semantic <code>--mdhui-*</code> token, so one set
        of rules produces both cards; in dark mode those tokens map onto the grey ramp and brighter accent
        grades, and <code>npm run audit:colors</code> checks every pairing against the role floors.</p>
      <TokensInContext />
      <p>The signal rows are the data-visualization colors: heart rate on red-orange (glucose shares it),
        activity on gold, sleep on indigo, air quality on teal.</p>
      <h3>The full ramp</h3>
      <p>Every hue, lightest to darkest. <strong>Hover a swatch</strong> and the ramp marks the closest
        grade on either side that's far enough away to clear each band — so you can read a safe pairing
        straight off the row:</p>
      <div className="rampLegend">
        <span className="rampLegend-item"><span className="rampLegend-ring rampLegend-ring40" /> 40+ · AA large text</span>
        <span className="rampLegend-item"><span className="rampLegend-ring rampLegend-ring50" /> 50+ · AA body text</span>
        <span className="rampLegend-item"><span className="rampLegend-ring rampLegend-ring70" /> 70+ · AAA</span>
      </div>
      <p>The same hover shows what that color measures against white and black — the WCAG 2.x ratio and
        the APCA Lc in both directions, each with the strongest role it supports. <strong>Click</strong> a
        swatch to copy its variable.</p>
      <div>
        {colors.map((hue) => (
          <ColorRow key={hue} hue={hue} />
        ))}
      </div>
      <GradientSection />
      <h3>References</h3>
      <ol style={{ fontSize: '13px' }}>
        <li id="ref-1"><a href="https://designsystem.digital.gov/design-tokens/color/overview/" target="_blank" rel="noopener noreferrer">U.S. Web Design System: color tokens</a> — the grade-and-magic-number approach this system follows.</li>
        <li id="ref-2"><a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">W3C: Understanding WCAG 2.1 — Contrast (Minimum)</a> — the AA and AAA text floors.</li>
        <li id="ref-3"><a href="https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html" target="_blank" rel="noopener noreferrer">W3C: Understanding WCAG 2.1 — Non-text Contrast</a> — the 3:1 functional floor and the structural exemption.</li>
        <li id="ref-4"><a href="https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html" target="_blank" rel="noopener noreferrer">APCA in a Nutshell</a> — the perceptual contrast model and its Lc tiers.</li>
      </ol>
    </div>
  );
};

export default ColorDocs;
