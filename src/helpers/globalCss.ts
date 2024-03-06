import { css } from '@emotion/react';

export const core = css`
:root {

    // color palette
    --ce-white: #fdfdfe;
    --ce-grey-1: #FBFCFC;
    --ce-grey-2: #f8f9fb;
    --ce-grey-3: #F4F6F7;
    --ce-grey-4: #F1F2F5;
    --ce-grey-5: #EDEFF2;
    --ce-grey-10: #DFE1E7;
    --ce-grey-20: #C6CAD5;
    --ce-grey-30: #A9ADBF;
	--ce-grey-40: #8E90A6; // 3.13:1 only with white and bold or large text to meet AA 
    --ce-grey-50: #73748B; // 4.57:1 only use with white and normal text to meet AA
    --ce-grey-55: #6B6B81; // 5.19:1 meets AA for normal text, and AAA for large text against --ce-grey-1 through --ce-grey-5
	--ce-grey-60: #595A6B;
	--ce-grey-70: #434351; // 9.72:1 meets AAA for normal text against --ce-grey-1 through --ce-grey-10
    --ce-grey-80: #2E2D35;
    --ce-grey-90: #1D1C21;
    --ce-grey-95: #1B1A1F;

	--ce-blue-vivid-30: #7DAFFA;
    --ce-blue-vivid-55: #0C64EB;
	--ce-blue-vivid-70: #003D9F;

    --ce-green-30: #45C28F;
    --ce-green-50: #00865C;
    --ce-green-55: #007C55;

    --ce-red-30: #ED9699;
	--ce-red-55: #DC0007;
	--ce-red-muted-50: #DC343A; // 4.56 only use with white and normal text to meet AA

    --ce-orange-5: #FFECD9;    
    --ce-orange-30: #FF9229;
    --ce-orange-40: #EC6C05; // 3.12:1 only use for 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger
    --ce-orange-50: #BF5704;
    --ce-orange-55: #B15103;
 
    --ce-violet-5: #F9E9FF;    
    --ce-violet-30: #E08DFF;
    --ce-violet-40: #CF5EFF; // 3.12:1 only use for 14 point (typically 18.66px) and bold or larger, or 18 point (typically 24px) or larger
    --ce-violet-55: #A22AE9;


    --mdhui-fadein-animation: fadein 1s;
    --mdhui-card-border-radius: 12px;
    --mdhui-font-family: ui-rounded, -apple-system, Helvetica, Arial, sans-serif;
    --mdhui-modal-overlay-color: rgba(0, 0, 0, 0.5);
    
    --mdhui-padding-xxs: 4px;
    --mdhui-padding-xs: 8px;
    --mdhui-padding-sm: 12px;
    --mdhui-padding-md: 16px;
    --mdhui-padding-lg: 24px;
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
    --mdhui-background-color-1: var(--ce-grey-5);
    --mdhui-background-color-2: var(--ce-grey-10);

    --mdhui-border-color-0: #eee;
    --mdhui-border-color-1: #ddd;
    --mdhui-border-color-2: #bbb;

    --mdhui-text-color-0: #000;
    --mdhui-text-color-1: #333;
    --mdhui-text-color-2: #555;
    --mdhui-text-color-3: var(--ce-grey-55);
    --mdhui-text-color-4: var(--ce-grey-40);

    // intent-based variables
    --mdhui-color-primary: var(--ce-blue-vivid-55);
    --mdhui-color-secondary: var(--ce-violet-55);
    --mdhui-color-success: var(--ce-green-50);
    --mdhui-color-warning: var(--ce-orange-40);
    --mdhui-color-danger: var(--ce-red-55);

    --mdhui-box-shadow-color-0: rgba(0, 0, 0, 0.05);
    --mdhui-box-shadow-color-1: #aaa;

    --mdhui-box-shadow-0: 0px 4px 4px 0px var(--mdhui-box-shadow-color-0);
    --mdhui-box-shadow-1: 0px 0px 5px 0px var(--mdhui-box-shadow-color-1);

    --mdhui-overlay-gradient:linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 244, 240, 0.2) 100%);
    
}
`

export const darkColorScheme = css`
:root {

    /* everywhere except the darkmode backgrounds, 0 is the highest contrast */

    --mdhui-background-color-0: var(--ce-grey-80);
    --mdhui-background-color-1: var(--ce-grey-95);
    --mdhui-background-color-2: #000;

    --mdhui-border-color-0: #444446;
    --mdhui-border-color-1: #444;
    --mdhui-border-color-2: #555;

    --mdhui-text-color-0: #FFF;
    --mdhui-text-color-1: #FFF;
    --mdhui-text-color-2: var(--ce-grey-20);
    --mdhui-text-color-3: var(--ce-grey-30);
    --mdhui-text-color-4: var(--ce-grey-40);

    // intent-based variables
    --mdhui-color-primary: var(--ce-blue-vivid-30);
    --mdhui-color-secondary: var(--ce-violet-30);
    --mdhui-color-success: var(--ce-green-30);
    --mdhui-color-warning: var(--ce-orange-30);
    --mdhui-color-danger: var(--ce-red-30);

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
    line-height: 1.3;
    font-size: 17px;
}`;