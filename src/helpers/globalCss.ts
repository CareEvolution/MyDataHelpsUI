import { css, CSSObject } from '@emotion/react';
import { CSSProperties } from 'react';

export const core = css`
:root {
    --mdhui-color-primary: rgba(0, 127, 249, 1);
    --mdhui-color-success: #00AE42;
    --mdhui-color-warning: rgb(232, 124, 0);
    --mdhui-color-danger: rgb(239, 55, 36);
    --mdhui-fadein-animation: fadein 1s;
    --mdhui-card-border-radius: 12px;
    --mdhui-font-family: ui-rounded, -apple-system, Helvetica, Arial, sans-serif;
    --mdhui-modal-overlay-color: rgba(130, 130, 130, 0.5);
    
    --mdhui-padding-xxs: 4px;
    --mdhui-padding-xs: 8px;
    --mdhui-padding-sm: 12px;
    --mdhui-padding-md: 16px;
    --mdhui-padding-lg: 24px;

    --mdhui-touch: 44px;
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
}
    
:root {
    /* BASE-COLORS */
    --ce-grey-1: rgb(251, 252, 252);
    --ce-grey-2: rgb(247, 248, 249);
    --ce-grey-3: rgb(244, 245, 246);
    --ce-grey-4: rgb(242, 243, 245);
    --ce-grey-5: rgb(237, 238, 240);
    --ce-grey-10: rgb(224, 225, 230);
    --ce-grey-20: rgb(200, 201, 210);
    --ce-grey-30: rgb(172, 173, 186);
    --ce-grey-40: rgb(143, 144, 162);
    --ce-grey-50: rgb(115, 116, 139);
    --ce-grey-55: rgb(107, 107, 129);
    --ce-grey-60: rgb(90, 90, 108);
    --ce-grey-70: rgb(68, 67, 81);
    --ce-grey-80: rgb(46, 45, 53);
    --ce-grey-90: rgb(29, 28, 34);
    --ce-grey-95: rgb(27, 26, 31);
    --ce-grey-96: rgb(25, 25, 29);
    --ce-grey-97: rgb(22, 21, 25);
    --ce-grey-98: rgb(20, 19, 23);
    --ce-grey-99: rgb(17, 16, 19);

    --ce-yellow-1: rgb(255, 252, 230);
    --ce-yellow-2: rgb(255, 249, 207);
    --ce-yellow-3: rgb(255, 247, 195);
    --ce-yellow-4: rgb(255, 245, 183);
    --ce-yellow-5: rgb(255, 240, 148);
    --ce-yellow-10: rgb(255, 224, 43);
    --ce-yellow-20: rgb(246, 196, 0);
    --ce-yellow-30: rgb(211, 168, 0);
    --ce-yellow-40: rgb(177, 141, 0);
    --ce-yellow-50: rgb(144, 114, 0);
    --ce-yellow-55: rgb(134, 105, 0);
    --ce-yellow-60: rgb(112, 89, 0);
    --ce-yellow-70: rgb(85, 67, 0);
    --ce-yellow-80: rgb(57, 44, 0);
    --ce-yellow-90: rgb(37, 28, 0);
    --ce-yellow-95: rgb(34, 26, 0);
    --ce-yellow-96: rgb(31, 24, 0);
    --ce-yellow-97: rgb(28, 21, 0);
    --ce-yellow-98: rgb(25, 20, 0);
    --ce-yellow-99: rgb(21, 17, 0);

    --ce-orange-1: rgb(255, 251, 246);
    --ce-orange-2: rgb(255, 246, 237);
    --ce-orange-3: rgb(255, 244, 232);
    --ce-orange-4: rgb(255, 241, 227);
    --ce-orange-5: rgb(255, 236, 217);
    --ce-orange-10: rgb(255, 219, 184);
    --ce-orange-20: rgb(255, 188, 122);
    --ce-orange-30: rgb(255, 146, 41);
    --ce-orange-40: rgb(236, 108, 5);
    --ce-orange-45: #E35C33;
    --ce-orange-50: rgb(191, 87, 4);
    --ce-orange-55: rgb(177, 81, 3);
    --ce-orange-60: rgb(149, 68, 3);
    --ce-orange-70: rgb(112, 51, 2);
    --ce-orange-80: rgb(76, 34, 1);
    --ce-orange-90: rgb(49, 22, 0);
    --ce-orange-95: rgb(46, 20, 0);
    --ce-orange-96: rgb(42, 19, 0);
    --ce-orange-97: rgb(38, 17, 0);
    --ce-orange-98: rgb(31, 14, 0);
    --ce-orange-99: rgb(29, 13, 0);

    --ce-red-1: rgb(255, 250, 250);
    --ce-red-2: rgb(254, 245, 245);
    --ce-red-3: rgb(253, 243, 244);
    --ce-red-4: rgb(253, 239, 240);
    --ce-red-5: rgb(252, 234, 234);
    --ce-red-10: rgb(249, 217, 218);
    --ce-red-20: rgb(244, 187, 189);
    --ce-red-30: rgb(237, 150, 153);
    --ce-red-40: rgb(230, 107, 111);
    --ce-red-50: rgb(220, 52, 58);
    --ce-red-55: rgb(206, 44, 50);
    --ce-red-60: rgb(174, 37, 42);
    --ce-red-70: rgb(132, 28, 32);
    --ce-red-80: rgb(89, 20, 22);
    --ce-red-90: rgb(58, 13, 14);
    --ce-red-95: rgb(54, 12, 13);
    --ce-red-96: rgb(51, 11, 12);
    --ce-red-97: rgb(45, 10, 11);
    --ce-red-98: rgb(41, 9, 10);
    --ce-red-99: rgb(35, 8, 9);

    --ce-red-vivid-1: rgb(255, 250, 250);
    --ce-red-vivid-2: rgb(255, 246, 247);
    --ce-red-vivid-3: rgb(254, 243, 243);
    --ce-red-vivid-4: rgb(254, 240, 240);
    --ce-red-vivid-5: rgb(254, 233, 233);
    --ce-red-vivid-10: rgb(252, 215, 217);
    --ce-red-vivid-20: rgb(250, 186, 188);
    --ce-red-vivid-30: rgb(247, 145, 148);
    --ce-red-vivid-40: rgb(243, 97, 102);
    --ce-red-vivid-50: rgb(236, 6, 14);
    --ce-red-vivid-55: rgb(220, 0, 7);
    --ce-red-vivid-60: rgb(187, 0, 6);
    --ce-red-vivid-70: rgb(143, 0, 4);
    --ce-red-vivid-80: rgb(100, 0, 3);
    --ce-red-vivid-90: rgb(67, 0, 2);
    --ce-red-vivid-95: rgb(64, 0, 2);
    --ce-red-vivid-96: rgb(60, 0, 2);
    --ce-red-vivid-97: rgb(54, 0, 2);
    --ce-red-vivid-98: rgb(50, 0, 2);
    --ce-red-vivid-99: rgb(45, 0, 1);

    --ce-violet-1: rgb(254, 251, 255);
    --ce-violet-2: rgb(252, 246, 255);
    --ce-violet-3: rgb(252, 243, 255);
    --ce-violet-4: rgb(250, 238, 255);
    --ce-violet-5: rgb(249, 233, 255);
    --ce-violet-10: rgb(244, 214, 255);
    --ce-violet-20: rgb(235, 183, 255);
    --ce-violet-30: rgb(224, 141, 255);
    --ce-violet-40: rgb(207, 94, 255);
    --ce-violet-50: rgb(174, 50, 246);
    --ce-violet-55: rgb(162, 42, 233);
    --ce-violet-60: rgb(137, 35, 197);
    --ce-violet-70: rgb(104, 25, 150);
    --ce-violet-80: rgb(71, 16, 104);
    --ce-violet-90: rgb(47, 9, 69);
    --ce-violet-95: rgb(44, 8, 65);
    --ce-violet-96: rgb(41, 8, 60);
    --ce-violet-97: rgb(36, 7, 54);
    --ce-violet-98: rgb(34, 6, 50);
    --ce-violet-99: rgb(29, 6, 42);

    --ce-blue-1: rgb(250, 252, 253);
    --ce-blue-2: rgb(244, 249, 252);
    --ce-blue-3: rgb(238, 246, 250);
    --ce-blue-4: rgb(235, 244, 249);
    --ce-blue-5: rgb(230, 241, 248);
    --ce-blue-10: rgb(206, 227, 242);
    --ce-blue-20: rgb(170, 206, 232);
    --ce-blue-30: rgb(125, 180, 220);
    --ce-blue-40: rgb(76, 152, 207);
    --ce-blue-50: rgb(24, 122, 193);
    --ce-blue-55: rgb(11, 112, 186);
    --ce-blue-60: rgb(9, 94, 159);
    --ce-blue-70: rgb(5, 70, 122);
    --ce-blue-80: rgb(2, 47, 86);
    --ce-blue-90: rgb(0, 29, 60);
    --ce-blue-95: rgb(0, 27, 56);
    --ce-blue-96: rgb(0, 25, 52);
    --ce-blue-97: rgb(0, 23, 46);
    --ce-blue-98: rgb(0, 20, 42);
    --ce-blue-99: rgb(0, 18, 36);

    --ce-blue-vivid-1: rgb(250, 252, 255);
    --ce-blue-vivid-2: rgb(244, 248, 255);
    --ce-blue-vivid-3: rgb(241, 246, 255);
    --ce-blue-vivid-4: rgb(235, 243, 254);
    --ce-blue-vivid-5: rgb(229, 239, 254);
    --ce-blue-vivid-10: rgb(209, 226, 253);
    --ce-blue-vivid-20: rgb(205, 227, 255);
    --ce-blue-vivid-30: rgb(125, 175, 250);
    --ce-blue-vivid-40: rgb(76, 145, 248);
    --ce-blue-vivid-50: rgb(20, 110, 246);
    --ce-blue-vivid-55: rgb(12, 100, 235);
    --ce-blue-vivid-60: rgb(9, 84, 200);
    --ce-blue-vivid-70: rgb(6, 62, 152);
    --ce-blue-vivid-80: rgb(3, 42, 106);
    --ce-blue-vivid-90: rgb(0, 26, 72);
    --ce-blue-vivid-95: rgb(0, 24, 67);
    --ce-blue-vivid-96: rgb(0, 23, 63);
    --ce-blue-vivid-97: rgb(0, 20, 56);
    --ce-blue-vivid-98: rgb(0, 18, 50);
    --ce-blue-vivid-99: rgb(0, 16, 45);

    --ce-indigo-1: rgb(251, 252, 255);
    --ce-indigo-2: rgb(247, 248, 255);
    --ce-indigo-3: rgb(244, 245, 255);
    --ce-indigo-4: rgb(241, 241, 255);
    --ce-indigo-5: rgb(237, 237, 255);
    --ce-indigo-10: rgb(222, 221, 255);
    --ce-indigo-20: rgb(200, 196, 253);
    --ce-indigo-30: rgb(172, 163, 250);
    --ce-indigo-40: rgb(143, 130, 246);
    --ce-indigo-50: rgb(112, 94, 243);
    --ce-indigo-55: rgb(102, 83, 240);
    --ce-indigo-60: rgb(83, 61, 224);
    --ce-indigo-70: rgb(54, 28, 201);
    --ce-indigo-80: rgb(36, 16, 142);
    --ce-indigo-90: rgb(22, 8, 98);
    --ce-indigo-95: rgb(21, 7, 92);
    --ce-indigo-96: rgb(19, 7, 86);
    --ce-indigo-97: rgb(17, 6, 78);
    --ce-indigo-98: rgb(16, 6, 71);
    --ce-indigo-99: rgb(14, 5, 63);

    --ce-cyan-1: rgb(247, 253, 254);
    --ce-cyan-2: rgb(237, 251, 253);
    --ce-cyan-3: rgb(228, 249, 252);
    --ce-cyan-4: rgb(219, 247, 251);
    --ce-cyan-5: rgb(209, 245, 250);
    --ce-cyan-10: rgb(168, 235, 246);
    --ce-cyan-20: rgb(93, 218, 239);
    --ce-cyan-30: rgb(63, 188, 212);
    --ce-cyan-40: rgb(34, 159, 185);
    --ce-cyan-50: rgb(4, 128, 158);
    --ce-cyan-55: rgb(10, 118, 148);
    --ce-cyan-60: rgb(10, 99, 124);
    --ce-cyan-70: rgb(9, 74, 94);
    --ce-cyan-80: rgb(8, 50, 65);
    --ce-cyan-90: rgb(8, 31, 42);
    --ce-cyan-95: rgb(8, 29, 39);
    --ce-cyan-96: rgb(7, 27, 36);
    --ce-cyan-97: rgb(6, 24, 32);
    --ce-cyan-98: rgb(6, 22, 28);
    --ce-cyan-99: rgb(5, 18, 24);

    --ce-green-1: rgb(248, 253, 251);
    --ce-green-2: rgb(241, 251, 246);
    --ce-green-3: rgb(234, 249, 242);
    --ce-green-4: rgb(230, 247, 240);
    --ce-green-5: rgb(219, 244, 233);
    --ce-green-10: rgb(189, 234, 215);
    --ce-green-20: rgb(138, 217, 184);
    --ce-green-30: rgb(69, 194, 143);
    --ce-green-40: rgb(35, 164, 130);
    --ce-green-50: rgb(1, 132, 116);
    --ce-green-55: rgb(0, 123, 108);
    --ce-green-60: rgb(0, 103, 91);
    --ce-green-70: rgb(0, 78, 69);
    --ce-green-80: rgb(0, 52, 47);
    --ce-green-90: rgb(0, 33, 30);
    --ce-green-95: rgb(0, 31, 29);
    --ce-green-96: rgb(0, 29, 27);
    --ce-green-97: rgb(0, 26, 23);
    --ce-green-98: rgb(0, 23, 21);
    --ce-green-99: rgb(0, 20, 19);


    /* Gradients */
    --ce-gradient-alpine-overlook-dark: linear-gradient(180deg, rgba(12, 100, 235), rgba(76, 152, 207));
    --ce-gradient-alpine-overlook: linear-gradient(180deg, rgba(117, 180, 225), rgba(246, 250, 253));
    --ce-gradient-cold-front-dark: linear-gradient(180deg, rgba(143, 130, 246), rgba(230, 107, 111));
    --ce-gradient-cold-front: linear-gradient(180deg, rgba(244, 215, 255), rgba(252, 217, 218));
    --ce-gradient-early-bird-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(143, 130, 246));
    --ce-gradient-early-bird: linear-gradient(180deg, rgba(199, 196, 255), rgba(255, 245, 156));
    --ce-gradient-evergreen-petrichor-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(0, 123, 108));
    --ce-gradient-evergreen-petrichor: linear-gradient(180deg, rgba(137, 218, 183), rgba(255, 248, 184));
    --ce-gradient-high-noon-dark: linear-gradient(180deg, rgba(236, 108, 5), rgba(206, 44, 50));
    --ce-gradient-high-noon: linear-gradient(180deg, rgba(255, 242, 128), rgba(255, 146, 40));
    --ce-gradient-midnight-moon-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(102, 83, 240));
    --ce-gradient-midnight-moon: linear-gradient(180deg, rgba(169, 163, 254), rgba(222, 221, 255));
    --ce-gradient-open-horizon-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(207, 94, 255));
    --ce-gradient-open-horizon: linear-gradient(180deg, rgba(117, 180, 225), rgba(252, 217, 218));
    --ce-gradient-summer-solstice-dark: linear-gradient(180deg, rgba(255, 146, 41), rgba(143, 130, 246));
    --ce-gradient-summer-solstice: linear-gradient(180deg, rgba(255, 146, 40), rgba(199, 196, 255));
    --ce-gradient-summit-sunset-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(230, 107, 111));
    --ce-gradient-summit-sunset: linear-gradient(180deg, rgba(244, 215, 255), rgba(246, 145, 148));
    --ce-gradient-tropical-mist-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(35, 164, 130));
    --ce-gradient-tropical-mist: linear-gradient(180deg, rgba(117, 180, 225), rgba(137, 218, 183));
}`;

export const lightColorStyle: CSSProperties = {
    '--mdhui-background-color-0': '#fff',
    '--mdhui-background-color-1': '#f5f5f5',
    '--mdhui-background-color-2': '#ddd',
    '--mdhui-background-color-highest-contrast': '#fff',

    '--mdhui-border-color-0': '#eee',
    '--mdhui-border-color-1': '#ddd',
    '--mdhui-border-color-2': '#bbb',

    '--mdhui-text-color-0': '#000',
    '--mdhui-text-color-1': '#333',
    '--mdhui-text-color-2': '#555',
    '--mdhui-text-color-3': '#999',
    '--mdhui-text-color-4': '#bbb',

    '--mdhui-box-shadow-color-0': 'rgba(0, 0, 0, 0.05)',
    '--mdhui-box-shadow-color-1': '#aaa',

    '--mdhui-box-shadow-0': '0px 4px 4px 0px var(--mdhui-box-shadow-color-0)',
    '--mdhui-box-shadow-1': '0px 0px 5px 0px var(--mdhui-box-shadow-color-1)',

    '--mdhui-overlay-gradient': 'linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgba(255, 244, 240, 0.2) 100%)',
    color: '#333',
} as CSSProperties;

export const lightColorScheme = css({
    ':root': lightColorStyle
} as CSSObject);

export const darkColorStyle: CSSProperties = {
    '--mdhui-background-color-0': '#2c2c2d',
    '--mdhui-background-color-1': '#1c1c1d',
    '--mdhui-background-color-2': '#000',
    '--mdhui-background-color-highest-contrast': '#000',

    '--mdhui-border-color-0': '#444446',
    '--mdhui-border-color-1': '#444',
    '--mdhui-border-color-2': '#555',

    '--mdhui-text-color-0': '#FFF',
    '--mdhui-text-color-1': '#FFF',
    '--mdhui-text-color-2': '#9e9ea5',
    '--mdhui-text-color-3': '#59595d',
    '--mdhui-text-color-4': '#59595d',

    '--mdhui-box-shadow-color-0': '#333',
    '--mdhui-box-shadow-color-1': '#666',

    '--mdhui-box-shadow-0': '0px 0px 1px 1px var(--mdhui-border-color-0)',
    '--mdhui-box-shadow-1': '0px 0px 1px 1px var(--mdhui-border-color-0)',

    '--mdhui-overlay-gradient': 'linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 11, 15, 0.2) 100%) !important',
    color: "#FFF"
} as CSSProperties;

export const darkColorScheme = css({
    ':root': darkColorStyle
} as CSSObject);

export const global = css`
a {
    color: var(--mdhui-color-primary);
}

html {
    font-size: 17px;
    height: 100%;
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
    height: 100%;
}`;