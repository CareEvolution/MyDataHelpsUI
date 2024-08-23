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

const ColorDocs: React.FC = () => {
  return (
    <div>
      {colors.map((hue) => (
        <ColorRow key={hue} hue={hue} />
      ))}
    </div>
  );
};

export default ColorDocs;
