import { css } from '@emotion/react';

export const defaultVariables = css`
:root {
    --main-bg-color: #f5f5f5;

    --mdhui-background-color-0: #fff;
    --mdhui-background-color-1: #f5f5f5;
    --mdhui-background-color-2: #ddd;
    --mdhui-background-color-3: #eee;

    --mdhui-border-color-0: #eee;
    --mdhui-border-color-1: #ddd;
    --mdhui-border-color-2: #bbb;
    --mdhui-border-color-3: #000;

    --mdhui-text-color-0: #000;
    --mdhui-text-color-1: #333;
    --mdhui-text-color-2: #555;
    --mdhui-text-color-3: #999;
    --mdhui-text-color-4: #bbb;

    --mdhui-color-theme: #5381c3;
    --mdhui-color-primary: #5381c3;
    --mdhui-color-success: #00AE42;
    --mdhui-color-warning: #FF671D;
    --mdhui-color-danger: #C40D3C;

    --mdhui-box-shadow-color-0: #ddd;
    --mdhui-box-shadow-color-1: #aaa;

    --mdhui-box-shadow-0: 0px 9px 9px 0px var(--mdhui-box-shadow-color-0);
    --mdhui-box-shadow-1: 0px 0px 5px 0px var(--mdhui-box-shadow-color-1);

    --mdhui-overlay-gradient:linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 244, 240, 0.2) 100%);

    --mdhui-fadein-animation: fadein 1s;
}

@keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-webkit-keyframes fadein {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}`;

export const darkMode = css`
@media (prefers-color-scheme: dark) {
    :root {
        --mdhui-background-color-0: #1a1b1e;
        --mdhui-background-color-1: #141517;
        --mdhui-background-color-2: #000;

        --mdhui-border-color-0: #333;
        --mdhui-border-color-1: #444;
        --mdhui-border-color-2: #555;
        --mdhui-border-color-3: #FFF;

        --mdhui-text-color-0: #FFF;
        --mdhui-text-color-1: #a6a7ab;
        --mdhui-text-color-2: #aaa;
        --mdhui-text-color-3: #777;
        --mdhui-text-color-4: #444;

        --mdhui-box-shadow-color-0: #333;
        --mdhui-box-shadow-color-1: #666;
        
        --mdhui-box-shadow-0: none;
        --mdhui-box-shadow-1: none;
        --mdhui-overlay-gradient:linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 11, 15, 0.2) 100%) !important;
    }
}`;


export const global = css`
a {
    color: var(--mdhui-color-theme);
}

html {
    font-size: 17px;
    line-height: 1.3em;
}

/* this needs to be moved to a component called unstyledButton */
button {
    color: inherit;
    font: inherit;
    text-align: inherit;
    line-height: inherit;
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;
    -webkit-appearance: none;
    background: none;
    border: none;
    display: block;
    box-sizing: border-box;
    padding: 0;
    cursor: pointer;
    margin: 0;
}

@@supports (font: -apple-system-body) {
    html {
        font: -apple-system-body;
    }
}

body {
    padding: 0;
    margin: 0;
    font-family: ui-rounded, -apple-system, Helvetica, Arial, sans-serif;
    background: var(--mdhui-background-color-1);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}`;