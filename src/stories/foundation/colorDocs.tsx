import React, { useRef } from 'react';
import './colorDocs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy as faCopyRegular } from '@fortawesome/free-regular-svg-icons';
import { faCopy as faCopySolid } from '@fortawesome/free-solid-svg-icons';

const colors: string[] = [
  'grey',
  'blue',
  'blue-vivid',
  'indigo',
  'violet',
  'cyan',
  'green',
  'red',
  'red-vivid',
  'orange',
  'yellow',
];

const grades = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 55, 60, 70, 80, 90, 99];

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

// TODO: THESE HELPERS MIGHT NOT BE ACCURATE
// Helper: WCAG 2.0 contrast ratio
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
// Helper: APCA contrast (simplified, not 100% spec, but close for demo)
function apcaContrast(txt: number[], bg: number[]) {
  // https://github.com/Myndex/SAPC-APCA/blob/master/documentation/APCA_calculation_steps.md
  // This is a simplified version for demo purposes
  const Ybg = luminance(bg);
  const Ytxt = luminance(txt);
  let contrast = 0;
  if (Ybg > Ytxt) {
    contrast = (Ybg - Ytxt) * 1.14 * 100;
  } else {
    contrast = (Ytxt - Ybg) * 1.14 * 100 * -1;
  }
  return Math.round(contrast);
}

// Label for contrast level (A, AA, AAA) with color
function ContrastLevelLabel({ level }: { level: string }) {
  let colorVar = '';
  let label = '';
  if (!level) {
    colorVar = 'var(--ce-grey-40)';
    label = 'N/A';
  } else {
    label = level;
    if (level === 'A') colorVar = 'var(--color-highlight-40)';
    else if (level === 'AA') colorVar = 'var(--color-highlight-50)';
    else if (level === 'AAA') colorVar = 'var(--color-highlight-70)';
  }
  return <span style={{ color: colorVar, fontWeight: 600, fontSize: '14px' }}> {label}</span>;
}
// Helper: Get WCAG level for a contrast ratio
function getWcagLevel(contrast: number) {
  if (contrast >= 7) return 'AAA';
  if (contrast >= 4.5) return 'AA';
  if (contrast >= 3) return 'A';
  return '';
}
// Helper: Get APCA level for a contrast value (absolute)
function getApcaLevel(contrast: number) {
  const abs = Math.abs(contrast);
  if (abs >= 75) return 'AAA';
  if (abs >= 60) return 'AA';
  if (abs >= 40) return 'A';
  return '';
}

const ColorCell: React.FC<ColorCellProps & {
  hoveredGrade?: number;
  highlight40?: boolean;
  highlight50?: boolean;
  highlight70?: boolean;
  onHover?: (grade: number | null) => void;
}> = ({ hue, grade, hoveredGrade, highlight40, highlight50, highlight70, onHover }) => {
  const color = `var(--ce-${hue}-${grade})`;
  const colorDivRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [showIcon, setShowIcon] = React.useState(false);
  const [hex, setHex] = React.useState<string>('');
  const [wcag, setWcag] = React.useState<string>('');
  const [apca, setApca] = React.useState<string>('');

  React.useEffect(() => {
    if (colorDivRef.current) {
      const computed = window.getComputedStyle(colorDivRef.current);
      const bgColor = computed.backgroundColor;
      const hexVal = rgbToHex(bgColor);
      setHex(hexVal);
      // Contrast against white and black, show the higher
      const rgb = hexToRgb(hexVal);
      const wcagWhite = wcagContrast(rgb, [255, 255, 255]);
      const wcagBlack = wcagContrast(rgb, [0, 0, 0]);
      setWcag(wcagWhite > wcagBlack ? wcagWhite.toFixed(2) + ' (white)' : wcagBlack.toFixed(2) + ' (black)');
      const apcaWhite = apcaContrast(rgb, [255, 255, 255]);
      const apcaBlack = apcaContrast(rgb, [0, 0, 0]);
      setApca(Math.abs(apcaWhite) > Math.abs(apcaBlack) ? apcaWhite + ' (white)' : apcaBlack + ' (black)');
    }
  }, [colorDivRef, color]);

  const handleClick = async () => {
    if (colorDivRef.current) {
      const computed = window.getComputedStyle(colorDivRef.current);
      const bgColor = computed.backgroundColor;
      const hex = rgbToHex(bgColor);
      await navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }
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
      title="Click to copy hex color"
      style={{ position: 'relative', cursor: 'pointer' }}
      onMouseEnter={() => { setShowIcon(true); onHover && onHover(grade); }}
      onMouseLeave={() => { setShowIcon(false); onHover && onHover(null); }}
    >


      <div className="color" ref={colorDivRef} style={{ backgroundColor: color, position: 'relative' }}>
        <div className={`colorCell-overlay ${isLight ? 'colorCell-overlay-light' : 'colorCell-overlay-dark'}`}>
          <div className="colorCell-detailText">
            {/* <span className="colorCell-detailNumber">{apca.replace(/\s*\(.*\)/, '')}</span> */}
          </div>
          <div className="colorCell-detailText">
            <span className="colorCell-detailNumber">{wcag.replace(/\s*\(.*\)/, '')}</span>
          </div>
        </div>
        {showIcon && (
          <div
            className={`colorCell-tooltip ${isLight ? 'colorCell-tooltip-darkbg' : 'colorCell-tooltip-lightbg'}`}
          >
            <div className="colorCell-tooltipRow">
              <div className="colorCell-tooltipTitle">WCAG 2.0</div>
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
              <div className="colorCell-tooltipTitle">APCA (WCAG 3.0)</div>
              <span className="colorCell-detailGroup">
                {(() => {
                  const colorVal = colorDivRef.current ? rgbToHex(window.getComputedStyle(colorDivRef.current).backgroundColor) : '';
                  const rgb = colorVal ? hexToRgb(colorVal) : [0, 0, 0];
                  const apcaWhite = apcaContrast(rgb, [255, 255, 255]);
                  const apcaBlack = apcaContrast(rgb, [0, 0, 0]);
                  return <>
                    <span className="colorCell-detailLabel">
                      <span>#fff: <b>{apcaWhite}</b></span>
                      <ContrastLevelLabel level={getApcaLevel(apcaWhite)} />
                    </span>
                    <span className="colorCell-detailLabel">
                      <span>#000: <b>{apcaBlack}</b></span>
                      <ContrastLevelLabel level={getApcaLevel(apcaBlack)} />

                    </span>
                  </>;
                })()}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className='grade'>
        {grade}
      </div>
      <CopyIcon hovered={showIcon} variant={isLight ? 'light' : 'dark'} />
      {copied && (
        <div className="colorCell-copiedTooltip">Copied hex to clipboard</div>
      )}
    </div>
  );
};

interface ColorRowProps {
  hue: string;
}

const ColorRow: React.FC<ColorRowProps> = ({ hue }) => {
  const [hoveredGrade, setHoveredGrade] = React.useState<number | null>(null);

  // Find the first color on each side that is at least X away from hoveredGrade
  const getHighlightIndexes = (distance: number) => {
    if (hoveredGrade == null) return { left: null, right: null };
    let left: number | null = null;
    let right: number | null = null;
    for (let i = grades.length - 1; i >= 0; i--) {
      if (grades[i] < hoveredGrade - distance) {
        left = i + 1 < grades.length ? i + 1 : null;
        break;
      }
    }
    for (let i = 0; i < grades.length; i++) {
      if (grades[i] > hoveredGrade + distance) {
        right = i - 1 >= 0 ? i - 1 : null;
        break;
      }
    }
    // If no such grade, pick the edge
    if (left === null && hoveredGrade - distance >= grades[0]) left = 0;
    if (right === null && hoveredGrade + distance <= grades[grades.length - 1]) right = grades.length - 1;
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
          <code>var(--ce-{hue}-##)</code>
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
          There are both regular and dark version of the gradients. The regular version is designed for black text on top, while the dark version is designed for white text on top.
          <code>var(--ce-gradient-##)</code>
        </p>
      </header>
      <h4 style={{ margin: '8px 0 4px' }}>Light (for dark text)</h4>
      <div className="gradientCells">
        {lightGradients.map((gradient) => (
          <div className="colorCell" key={gradient}>
            <div className="color" style={{ background: `var(--ce-gradient-${gradient})` }} />
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
            <div className="color" style={{ background: `var(--ce-gradient-${gradient})` }} />
            <div className='grade'>
              {gradient}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const ColorDocs: React.FC = () => {
  return (
    <div>
      <h2>The "Magic Number" Color System</h2>
      <p>In design systems compliant with WCAG 2.0 (and Section 508), the term <strong>"magic number"</strong> refers to the specific <strong>luminance difference</strong> required
        between two colors to ensure they meet minimum contrast standards for accessibility.
        The higher the magic number, the greater the contrast and accessibility.
      </p>
      <ul>
        <li><strong>Magic number of 40+:</strong> Meets WCAG 2.0 AA Large Text (18pt/14pt bold or larger) contrast. For example, grey-90 and indigo-50.</li>
        <li><strong>Magic number of 50+:</strong> Meets WCAG 2.0 AA contrast or AAA Large Text contrast. For example, grey-90 and red-40. <strong className="emphasis-text">We recommend this level of contrast for most web content.</strong></li>
        <li><strong>Magic number of 70+:</strong> Meets WCAG 2.0 AAA contrast. For example, grey-10 and red-80.</li>
      </ul>
      <p>Additionally, a grade of 50 will meet the Section 508 AA contrast requirement against both pure white (#000) and pure black (#fff).</p>
      <details>
        <summary>More about A, AA, and AAA</summary>
        <div className="details-content">
          <p><strong>Always aim for AA.</strong> In some cases, A may be acceptable:</p>
          <ul>
            <li><strong>A:</strong> <em>Minimum</em> level. Text must have a contrast ratio of at least <b>3:1</b> for large text (18pt/14pt bold or larger) and <b>4.5:1</b> for normal text against its background. This level is the basic requirement for accessibility, ensuring that text is readable for most users with mild visual impairments.</li>
            <li><strong>AA:</strong> <em>Mid-range</em> level. Text must have a contrast ratio of at least <b>4.5:1</b> for normal text and <b>3:1</b> for large text. This is the recommended level for most web content and is required for legal compliance in many regions (such as Section 508 in the US).</li>
            <li><strong>AAA:</strong> <em>Highest</em> level. Text must have a contrast ratio of at least <b>7:1</b> for normal text and <b>4.5:1</b> for large text. This level is intended for content that needs to be accessible to the widest possible audience, including users with significant visual impairments. AAA is not required for most content, but is encouraged where possible.</li>
          </ul>
          <p style={{ fontSize: '13px', color: '#666', marginTop: '0.5em' }}>
            <b>Source:</b> <a href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html" target="_blank" rel="noopener noreferrer">W3C: Understanding WCAG 2.1 Contrast (Minimum)</a>
          </p>
        </div>
      </details>
      <details>
        <summary>Will this change with WCAG 3.0?</summary>
        <div className="details-content">
          <p>While WCAG 2.0 uses relative luminance to determine color contrast, WCAG 3.0 (potentially Dec 2025) is expected to use APCA (Accessible Perceptual Contrast Algorithm).
            APCA is a new method for evaluating color contrast that takes into account human perception more effectively than previous methods.</p>
          <p>The MyDataHelps color palette will be updated as necessary to comply with WCAG 3.0.</p>
        </div>
      </details>
      <h3>Usage</h3>
      <p><code>color: var(--ce-[hue]-[grade])</code> Example: <code>color: var(--ce-blue-40)</code> </p>
      <h4>UI Use Cases</h4>
      <ul>
        <li>The 5 lightest (1-5) and darkest (95-99) grades are typically used as background colors.</li>
        <li>The 55 grade is the lightest legible grade against backgrounds 1-5.</li>
        <li>The 10 and 20 are typically used for border colors.</li>
      </ul>
      <h4>Data Visualization Use Cases</h4>
      <ul className="data-viz-use-cases">
        <li className="data-viz-air">Air Quality: Cyan</li>
        <li className="data-viz-sleep">Sleep: Indigo</li>
        <li className="data-viz-heart">Heart rate: Red-Orange</li>
        <li className="data-viz-activity">Activity: Yellow</li>
      </ul>
      <div>
        {colors.map((hue) => (
          <ColorRow key={hue} hue={hue} />
        ))}
      </div>
      <GradientSection />
    </div>
  );
};

export default ColorDocs;
