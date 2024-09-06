import React from 'react';
import './colorDocs.css';

const colors: string[] = [
  'grey',
  'blue',
  'blue-vivid',
  'cyan',
  'green',
  'indigo',
  'orange',
  'red',
  'red-vivid',
  'violet',
  'yellow',
];

const shades = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 55, 60, 70, 80, 90, 95, 96, 97, 98, 99];

const gradientsNames: string[] = [
  'alpine-overlook',
  'tropical-mist',
  'summit-sunset',
  'cold-front',
  'summer-solstice',
  'high-noon',
  'midnight-moon',
  'open-horizon',
  'early-bird',
  'evergreen-petrichor ',
]

interface ColorCellProps {
  hue: string;
  shade: number;
}
const ColorCell: React.FC<ColorCellProps> = ({ hue, shade }) => {
  const color = `var(--mdhui-${hue}-${shade})`;
  return (
    <div className="colorCell">
      <div className="color" style={{ backgroundColor: color }} />
      <div className='shade'>
        {shade}
      </div>
    </div>
  );
};

interface ColorRowProps {
  hue: string;
}

const ColorRow: React.FC<ColorRowProps> = ({ hue }) => {
  return (
    <div className="colorRow">
      <header className="colorHeader">
        <h3>{hue}</h3>
        <p>
          <code>var(--mdhui-{hue}-##)</code>
        </p>
      </header>
      <div className="colors">
        {shades.map((shade) => (
          <ColorCell key={shade} hue={hue} shade={shade} />
        ))}
      </div>
    </div>
  );
};

const GradientSection: React.FC = () => {
  return (
    <div className="gradients">
        <div className="colorRow">
          <header className="colorHeader">
            <h3>Gradients</h3>
            <p>
              <code>var(--mdhui-gradient-##)</code>
            </p>
          </header>
          <div className="gradientCells">
            {
              gradientsNames.map((gradient) => (
                <div className="colorCell" key={gradient}>
                  <div className="color" style={{ background: `var(--mdhui-gradient-${gradient})` }} />
                  <div className='shade'>
                    {gradient}
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
  )
}

const ColorDocs: React.FC = () => {
  return (
    <>
      <h2>Colors</h2>
      <p>Each hue has 20 shades, denoted by numbers from 1 (lightest) - 99 (darkest). The middle shade (55) is compliant for accessibile text and can be used with either black or white on foregrounds or backgrounds.
        <br /><br />Usage: <code>color: var(--mdhui-[hue]-[shade])</code> Example: <code>color: var(--mdhui-blue-40)</code> 
      </p>
      <div>
        {colors.map((hue) => (
          <ColorRow key={hue} hue={hue} />
        ))}
      </div>
      <GradientSection />
    </>
  );
};

export default ColorDocs;
