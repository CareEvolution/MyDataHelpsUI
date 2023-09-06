import { css } from '@emotion/react';

export const core = css`
:root {
    --mdhui-color-primary: #5381c3;
    --mdhui-color-success: #00AE42;
    --mdhui-color-warning: #FF671D;
    --mdhui-color-danger: #eb5546;
    --mdhui-fadein-animation: fadein 1s;

    --mdhui-card-border-radius: 12px;
    --mdhui-font-family: ui-rounded, -apple-system, Helvetica, Arial, sans-serif;
    --mdhui-modal-overlay-color: rgba(0, 0, 0, 0.5);
}

@media (prefers-reduced-motion) {
    --mdhui-fadein-animation: none;
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

export const lightColorScheme = css`
:root {
    --mdhui-background-color-0: #fff;
    --mdhui-background-color-1: #f5f5f5;
    --mdhui-background-color-2: #ddd;

    --mdhui-border-color-0: #eee;
    --mdhui-border-color-1: #ddd;
    --mdhui-border-color-2: #bbb;

    --mdhui-text-color-0: #000;
    --mdhui-text-color-1: #333;
    --mdhui-text-color-2: #555;
    --mdhui-text-color-3: #999;
    --mdhui-text-color-4: #bbb;

    --mdhui-box-shadow-color-0: rgba(0, 0, 0, 0.05);
    --mdhui-box-shadow-color-1: #aaa;

    --mdhui-box-shadow-0: 0px 4px 4px 0px var(--mdhui-box-shadow-color-0);
    --mdhui-box-shadow-1: 0px 0px 5px 0px var(--mdhui-box-shadow-color-1);

    --mdhui-overlay-gradient:linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 244, 240, 0.2) 100%);
}
`

export const darkColorScheme = css`
:root {
    --mdhui-background-color-0: #2c2c2d;
    --mdhui-background-color-1: #1c1c1d;
    --mdhui-background-color-2: #000;

    --mdhui-border-color-0: #444446;
    --mdhui-border-color-1: #444;
    --mdhui-border-color-2: #555;

    --mdhui-text-color-0: #FFF;
    --mdhui-text-color-1: #FFF;
    --mdhui-text-color-2: #9e9ea5;
    --mdhui-text-color-3: #59595d;
    --mdhui-text-color-4: #59595d;

    --mdhui-box-shadow-color-0: #333;
    --mdhui-box-shadow-color-1: #666;
    
    --mdhui-box-shadow-0: 0px 0px 1px 1px var(--mdhui-border-color-0);
    --mdhui-box-shadow-1: 0px 0px 1px 1px var(--mdhui-border-color-0);

    --mdhui-overlay-gradient:linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 11, 15, 0.2) 100%) !important;
}`;


export const global = css`
a {
    color: var(--mdhui-color-primary);
}

html {
    font-size: 17px;
}

@supports (font: -apple-system-body) {
    html {
        font: -apple-system-body !important;
    }
}

body {
    padding: 0;
    margin: 0;
    font-family: var(--mdhui-font-family);
    background: var(--mdhui-background-color-1);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.2em;
}`;