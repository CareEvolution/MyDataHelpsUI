import React, { useEffect, useState } from 'react'
import { Layout } from '../../presentational';
import './StepLayout.css'

export interface StepLayoutProps {
  children?: React.ReactNode;
  className?: string;
}

// Steps load in their own iframe, so the survey's scheme arrives as ?colorScheme= on the
// frame URL. No param means the host said nothing at load time — stay light, exactly as
// today, rather than following the device into a scheme the surrounding survey isn't in.
function resolveStepColorScheme(): "light" | "dark" {
  const colorScheme = new URLSearchParams(window.location.search).get("colorScheme");
  return colorScheme === "dark" ? "dark" : "light";
}

export default function (props: StepLayoutProps) {
  const [colorScheme, setColorScheme] = useState(resolveStepColorScheme);

  // A LightAndDark survey can change scheme while a step is open; the host pushes the new
  // scheme into the frame as an RKStudioColorScheme message rather than reloading it.
  // Sender check is by identity, not origin: the legitimate senders are the embedding
  // page (source === window.parent) and a native host injecting from inside the page
  // itself (source === window). An origin allowlist would bake host topology into a
  // library that cannot know its deployments, silently breaking new hosts to guard a
  // two-value cosmetic toggle.
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.source !== window.parent && event.source !== window) return;
      const scheme = event.data?.name === "RKStudioColorScheme" ? event.data.colorScheme : undefined;
      if (scheme === "dark" || scheme === "light") setColorScheme(scheme);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <Layout colorScheme={colorScheme} className={'mdhui-step-container' + (props.className ? ` ${props.className}` : "")} bodyBackgroundColor="var(--mdhui-background-color-0)">
      {props.children}
    </Layout>
  );
}