import React, { useEffect } from 'react'
import { Layout } from '../../presentational';
import './StepLayout.css'

export interface StepLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

export default function (props: StepLayoutProps) {
  return (
    <Layout colorScheme='light' className={'mdhui-step-container' + (props.className ? ` ${props.className}` : "")} bodyBackgroundColor="#FFFFFF">
      {props.children}
    </Layout>
  );
}