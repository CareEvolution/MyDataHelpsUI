import React from 'react';
import styles from './colorDocs.module.css';
import CopyToClipboard from './CopyToClipboard';
import { Layout } from '../components/presentational';

const colors: string[] = [
  'grey',
  'blue-vivid',
  'green',
  'red',
  'orange',
  'violet',
  'yellow',
];

const shades = [1, 2, 3, 4, 5, 10, 20, 30, 40, 50, 55, 60, 70, 80, 90, 95];

interface ColorCellProps {
  hue: string;
  shade: number;
}
const ColorCell: React.FC<ColorCellProps> = ({ hue, shade }) => {
  const color = `var(--ce-${hue}-${shade})`;
  return (
    <div className={styles.colorCell}>
      <div className={styles.color} style={{ backgroundColor: color }} />
      <CopyToClipboard value={color}>
        {shade}
      </CopyToClipboard>
    </div>
  );
};

interface ColorRowProps {
  hue: string;
}

const ColorRow: React.FC<ColorRowProps> = ({ hue }) => {
  return (
    <div className={styles.colorRow}>
      <header className={styles.colorHeader}>
        <h3>{hue}</h3>
        <p>
          <code>--ce-{hue}-##</code>
        </p>
      </header>
      <div className={styles.colors}>
        {shades.map((shade) => (
          <ColorCell key={shade} hue={hue} shade={shade} />
        ))}
      </div>
    </div>
  );
};

const ColorDocs: React.FC = () => {
  return (
    <Layout>
      {colors.map((hue) => (
        <ColorRow key={hue} hue={hue} />
      ))}
    </Layout>
  );
};

export default ColorDocs;
