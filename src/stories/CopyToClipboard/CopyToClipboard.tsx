import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faCheck, faClose, faCopy } from '@fortawesome/free-solid-svg-icons';
import styles from './CopyToClipboard.module.css';

export interface CopyToClipboardProps {
  value: string;
  successIndicatorDurationMs?: number;
  children?: React.ReactNode;
}

const defaultProps = {
  successIndicatorDurationMs: 3000,
};

const CopyToClipboard = (props : CopyToClipboardProps & typeof defaultProps) => {
  const { successIndicatorDurationMs, value } = props;
  const [showSuccessIndicator, setShowSuccessIndicator] = useState(false);
  const [showFailureIndicator, setShowFailureIndicator] = useState(false);

  useEffect((): (() => void) => {
    let canceled = false;
    if (showSuccessIndicator) {
      setTimeout((): void => {
        if (canceled) return;
        setShowSuccessIndicator(false);
      }, successIndicatorDurationMs);
    }
    return () => {
      canceled = true;
    };
  }, [showSuccessIndicator, successIndicatorDurationMs]);

  useEffect((): (() => void) => {
    let canceled = false;
    if (showFailureIndicator) {
      setTimeout((): void => {
        if (canceled) return;
        setShowFailureIndicator(false);
      }, successIndicatorDurationMs);
    }
    return () => {
      canceled = true;
    };
  }, [showFailureIndicator, successIndicatorDurationMs]);

  async function copyValueToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      setShowSuccessIndicator(true);
    } catch (error) {
      console.error('Failed to copy value to clipboard', error);
      setShowFailureIndicator(true);
    }
  }

  const handleOnClick = (): void => {
    void copyValueToClipboard();
  };

  let icon: IconDefinition = faCopy;
  if (showSuccessIndicator) icon = faCheck;
  else if (showFailureIndicator) icon = faClose;

  /*
  let intent: Intent = Intent.none;
  if (showSuccessIndicator) intent = Intent.success;
  else if (showFailureIndicator) intent = Intent.danger;
  */

  let title = 'Copy to clipboard';
  if (showSuccessIndicator) title = 'Copied';
  else if (showFailureIndicator) title = 'Failed to copy';

  return (
    <button
      className={`${styles.container}`}
      title={title}
      onClick={handleOnClick}
    >
      <FontAwesomeIcon icon={icon}/>
      {props.children}
      </button>
  );
};

CopyToClipboard.defaultProps = defaultProps;

export default CopyToClipboard;
