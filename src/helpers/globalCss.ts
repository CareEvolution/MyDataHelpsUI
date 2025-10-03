import { css } from '@emotion/react';

export const core = css`
:root {
    --mdhui-color-primary: rgba(0, 127, 249, 1);
    --mdhui-color-success: #00AE42;
    --mdhui-color-warning: rgb(232, 124, 0);
    --mdhui-color-danger: rgb(239, 55, 36);
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
}
    
:root {
    /* BASE-COLORS */
    --wcag2-grey-1: rgb(251, 252, 252);
    --wcag2-grey-2: rgb(247, 248, 249);
    --wcag2-grey-3: rgb(244, 245, 246);
    --wcag2-grey-4: rgb(242, 243, 245);
    --wcag2-grey-5: rgb(237, 238, 240);
    --wcag2-grey-10: rgb(224, 225, 230);
    --wcag2-grey-20: rgb(200, 201, 210);
    --wcag2-grey-30: rgb(172, 173, 186);
    --wcag2-grey-40: rgb(143, 144, 162);
    --wcag2-grey-50: rgb(115, 116, 139);
    --wcag2-grey-55: rgb(107, 107, 129);
    --wcag2-grey-60: rgb(90, 90, 108);
    --wcag2-grey-70: rgb(68, 67, 81);
    --wcag2-grey-80: rgb(46, 45, 53);
    --wcag2-grey-90: rgb(29, 28, 34);
    --wcag2-grey-95: rgb(27, 26, 31);
    --wcag2-grey-96: rgb(25, 25, 29);
    --wcag2-grey-97: rgb(22, 21, 25);
    --wcag2-grey-98: rgb(20, 19, 23);
    --wcag2-grey-99: rgb(17, 16, 19);

    --wcag2-yellow-1: rgb(255, 252, 230);
    --wcag2-yellow-2: rgb(255, 249, 207);
    --wcag2-yellow-3: rgb(255, 247, 195);
    --wcag2-yellow-4: rgb(255, 245, 183);
    --wcag2-yellow-5: rgb(255, 240, 148);
    --wcag2-yellow-10: rgb(255, 224, 43);
    --wcag2-yellow-20: rgb(246, 196, 0);
    --wcag2-yellow-30: rgb(211, 168, 0);
    --wcag2-yellow-40: rgb(177, 141, 0);
    --wcag2-yellow-50: rgb(144, 114, 0);
    --wcag2-yellow-55: rgb(134, 105, 0);
    --wcag2-yellow-60: rgb(112, 89, 0);
    --wcag2-yellow-70: rgb(85, 67, 0);
    --wcag2-yellow-80: rgb(57, 44, 0);
    --wcag2-yellow-90: rgb(37, 28, 0);
    --wcag2-yellow-95: rgb(34, 26, 0);
    --wcag2-yellow-96: rgb(31, 24, 0);
    --wcag2-yellow-97: rgb(28, 21, 0);
    --wcag2-yellow-98: rgb(25, 20, 0);
    --wcag2-yellow-99: rgb(21, 17, 0);

    --wcag2-orange-1: rgb(255, 251, 246);
    --wcag2-orange-2: rgb(255, 246, 237);
    --wcag2-orange-3: rgb(255, 244, 232);
    --wcag2-orange-4: rgb(255, 241, 227);
    --wcag2-orange-5: rgb(255, 236, 217);
    --wcag2-orange-10: rgb(255, 219, 184);
    --wcag2-orange-20: rgb(255, 188, 122);
    --wcag2-orange-30: rgb(255, 146, 41);
    --wcag2-orange-40: rgb(236, 108, 5);
    --wcag2-orange-45: #E35C33;
    --wcag2-orange-50: rgb(191, 87, 4);
    --wcag2-orange-55: rgb(177, 81, 3);
    --wcag2-orange-60: rgb(149, 68, 3);
    --wcag2-orange-70: rgb(112, 51, 2);
    --wcag2-orange-80: rgb(76, 34, 1);
    --wcag2-orange-90: rgb(49, 22, 0);
    --wcag2-orange-95: rgb(46, 20, 0);
    --wcag2-orange-96: rgb(42, 19, 0);
    --wcag2-orange-97: rgb(38, 17, 0);
    --wcag2-orange-98: rgb(31, 14, 0);
    --wcag2-orange-99: rgb(29, 13, 0);

    --wcag2-red-1: rgb(255, 250, 250);
    --wcag2-red-2: rgb(254, 245, 245);
    --wcag2-red-3: rgb(253, 243, 244);
    --wcag2-red-4: rgb(253, 239, 240);
    --wcag2-red-5: rgb(252, 234, 234);
    --wcag2-red-10: rgb(249, 217, 218);
    --wcag2-red-20: rgb(244, 187, 189);
    --wcag2-red-30: rgb(237, 150, 153);
    --wcag2-red-40: rgb(230, 107, 111);
    --wcag2-red-50: rgb(220, 52, 58);
    --wcag2-red-55: rgb(206, 44, 50);
    --wcag2-red-60: rgb(174, 37, 42);
    --wcag2-red-70: rgb(132, 28, 32);
    --wcag2-red-80: rgb(89, 20, 22);
    --wcag2-red-90: rgb(58, 13, 14);
    --wcag2-red-95: rgb(54, 12, 13);
    --wcag2-red-96: rgb(51, 11, 12);
    --wcag2-red-97: rgb(45, 10, 11);
    --wcag2-red-98: rgb(41, 9, 10);
    --wcag2-red-99: rgb(35, 8, 9);

    --wcag2-red-vivid-1: rgb(255, 250, 250);
    --wcag2-red-vivid-2: rgb(255, 246, 247);
    --wcag2-red-vivid-3: rgb(254, 243, 243);
    --wcag2-red-vivid-4: rgb(254, 240, 240);
    --wcag2-red-vivid-5: rgb(254, 233, 233);
    --wcag2-red-vivid-10: rgb(252, 215, 217);
    --wcag2-red-vivid-20: rgb(250, 186, 188);
    --wcag2-red-vivid-30: rgb(247, 145, 148);
    --wcag2-red-vivid-40: rgb(243, 97, 102);
    --wcag2-red-vivid-50: rgb(236, 6, 14);
    --wcag2-red-vivid-55: rgb(220, 0, 7);
    --wcag2-red-vivid-60: rgb(187, 0, 6);
    --wcag2-red-vivid-70: rgb(143, 0, 4);
    --wcag2-red-vivid-80: rgb(100, 0, 3);
    --wcag2-red-vivid-90: rgb(67, 0, 2);
    --wcag2-red-vivid-95: rgb(64, 0, 2);
    --wcag2-red-vivid-96: rgb(60, 0, 2);
    --wcag2-red-vivid-97: rgb(54, 0, 2);
    --wcag2-red-vivid-98: rgb(50, 0, 2);
    --wcag2-red-vivid-99: rgb(45, 0, 1);

    --wcag2-violet-1: rgb(254, 251, 255);
    --wcag2-violet-2: rgb(252, 246, 255);
    --wcag2-violet-3: rgb(252, 243, 255);
    --wcag2-violet-4: rgb(250, 238, 255);
    --wcag2-violet-5: rgb(249, 233, 255);
    --wcag2-violet-10: rgb(244, 214, 255);
    --wcag2-violet-20: rgb(235, 183, 255);
    --wcag2-violet-30: rgb(224, 141, 255);
    --wcag2-violet-40: rgb(207, 94, 255);
    --wcag2-violet-50: rgb(174, 50, 246);
    --wcag2-violet-55: rgb(162, 42, 233);
    --wcag2-violet-60: rgb(137, 35, 197);
    --wcag2-violet-70: rgb(104, 25, 150);
    --wcag2-violet-80: rgb(71, 16, 104);
    --wcag2-violet-90: rgb(47, 9, 69);
    --wcag2-violet-95: rgb(44, 8, 65);
    --wcag2-violet-96: rgb(41, 8, 60);
    --wcag2-violet-97: rgb(36, 7, 54);
    --wcag2-violet-98: rgb(34, 6, 50);
    --wcag2-violet-99: rgb(29, 6, 42);

    --wcag2-blue-1: rgb(250, 252, 253);
    --wcag2-blue-2: rgb(244, 249, 252);
    --wcag2-blue-3: rgb(238, 246, 250);
    --wcag2-blue-4: rgb(235, 244, 249);
    --wcag2-blue-5: rgb(230, 241, 248);
    --wcag2-blue-10: rgb(206, 227, 242);
    --wcag2-blue-20: rgb(170, 206, 232);
    --wcag2-blue-30: rgb(125, 180, 220);
    --wcag2-blue-40: rgb(76, 152, 207);
    --wcag2-blue-50: rgb(24, 122, 193);
    --wcag2-blue-55: rgb(11, 112, 186);
    --wcag2-blue-60: rgb(9, 94, 159);
    --wcag2-blue-70: rgb(5, 70, 122);
    --wcag2-blue-80: rgb(2, 47, 86);
    --wcag2-blue-90: rgb(0, 29, 60);
    --wcag2-blue-95: rgb(0, 27, 56);
    --wcag2-blue-96: rgb(0, 25, 52);
    --wcag2-blue-97: rgb(0, 23, 46);
    --wcag2-blue-98: rgb(0, 20, 42);
    --wcag2-blue-99: rgb(0, 18, 36);

    --wcag2-blue-vivid-1: rgb(250, 252, 255);
    --wcag2-blue-vivid-2: rgb(244, 248, 255);
    --wcag2-blue-vivid-3: rgb(241, 246, 255);
    --wcag2-blue-vivid-4: rgb(235, 243, 254);
    --wcag2-blue-vivid-5: rgb(229, 239, 254);
    --wcag2-blue-vivid-10: rgb(209, 226, 253);
    --wcag2-blue-vivid-20: rgb(205, 227, 255);
    --wcag2-blue-vivid-30: rgb(125, 175, 250);
    --wcag2-blue-vivid-40: rgb(76, 145, 248);
    --wcag2-blue-vivid-50: rgb(20, 110, 246);
    --wcag2-blue-vivid-55: rgb(12, 100, 235);
    --wcag2-blue-vivid-60: rgb(9, 84, 200);
    --wcag2-blue-vivid-70: rgb(6, 62, 152);
    --wcag2-blue-vivid-80: rgb(3, 42, 106);
    --wcag2-blue-vivid-90: rgb(0, 26, 72);
    --wcag2-blue-vivid-95: rgb(0, 24, 67);
    --wcag2-blue-vivid-96: rgb(0, 23, 63);
    --wcag2-blue-vivid-97: rgb(0, 20, 56);
    --wcag2-blue-vivid-98: rgb(0, 18, 50);
    --wcag2-blue-vivid-99: rgb(0, 16, 45);

    --wcag2-indigo-1: rgb(251, 252, 255);
    --wcag2-indigo-2: rgb(247, 248, 255);
    --wcag2-indigo-3: rgb(244, 245, 255);
    --wcag2-indigo-4: rgb(241, 241, 255);
    --wcag2-indigo-5: rgb(237, 237, 255);
    --wcag2-indigo-10: rgb(222, 221, 255);
    --wcag2-indigo-20: rgb(200, 196, 253);
    --wcag2-indigo-30: rgb(172, 163, 250);
    --wcag2-indigo-40: rgb(143, 130, 246);
    --wcag2-indigo-50: rgb(112, 94, 243);
    --wcag2-indigo-55: rgb(102, 83, 240);
    --wcag2-indigo-60: rgb(83, 61, 224);
    --wcag2-indigo-70: rgb(54, 28, 201);
    --wcag2-indigo-80: rgb(36, 16, 142);
    --wcag2-indigo-90: rgb(22, 8, 98);
    --wcag2-indigo-95: rgb(21, 7, 92);
    --wcag2-indigo-96: rgb(19, 7, 86);
    --wcag2-indigo-97: rgb(17, 6, 78);
    --wcag2-indigo-98: rgb(16, 6, 71);
    --wcag2-indigo-99: rgb(14, 5, 63);

    --wcag2-cyan-1: rgb(247, 253, 254);
    --wcag2-cyan-2: rgb(237, 251, 253);
    --wcag2-cyan-3: rgb(228, 249, 252);
    --wcag2-cyan-4: rgb(219, 247, 251);
    --wcag2-cyan-5: rgb(209, 245, 250);
    --wcag2-cyan-10: rgb(168, 235, 246);
    --wcag2-cyan-20: rgb(93, 218, 239);
    --wcag2-cyan-30: rgb(63, 188, 212);
    --wcag2-cyan-40: rgb(34, 159, 185);
    --wcag2-cyan-50: rgb(4, 128, 158);
    --wcag2-cyan-55: rgb(10, 118, 148);
    --wcag2-cyan-60: rgb(10, 99, 124);
    --wcag2-cyan-70: rgb(9, 74, 94);
    --wcag2-cyan-80: rgb(8, 50, 65);
    --wcag2-cyan-90: rgb(8, 31, 42);
    --wcag2-cyan-95: rgb(8, 29, 39);
    --wcag2-cyan-96: rgb(7, 27, 36);
    --wcag2-cyan-97: rgb(6, 24, 32);
    --wcag2-cyan-98: rgb(6, 22, 28);
    --wcag2-cyan-99: rgb(5, 18, 24);

    --wcag2-green-1: rgb(248, 253, 251);
    --wcag2-green-2: rgb(241, 251, 246);
    --wcag2-green-3: rgb(234, 249, 242);
    --wcag2-green-4: rgb(230, 247, 240);
    --wcag2-green-5: rgb(219, 244, 233);
    --wcag2-green-10: rgb(189, 234, 215);
    --wcag2-green-20: rgb(138, 217, 184);
    --wcag2-green-30: rgb(69, 194, 143);
    --wcag2-green-40: rgb(35, 164, 130);
    --wcag2-green-50: rgb(1, 132, 116);
    --wcag2-green-55: rgb(0, 123, 108);
    --wcag2-green-60: rgb(0, 103, 91);
    --wcag2-green-70: rgb(0, 78, 69);
    --wcag2-green-80: rgb(0, 52, 47);
    --wcag2-green-90: rgb(0, 33, 30);
    --wcag2-green-95: rgb(0, 31, 29);
    --wcag2-green-96: rgb(0, 29, 27);
    --wcag2-green-97: rgb(0, 26, 23);
    --wcag2-green-98: rgb(0, 23, 21);
    --wcag2-green-99: rgb(0, 20, 19);


    /* Gradients */
    --wcag2-gradient-alpine-overlook-dark: linear-gradient(180deg, rgba(12, 100, 235), rgba(76, 152, 207));
    --wcag2-gradient-alpine-overlook: linear-gradient(180deg, rgba(117, 180, 225), rgba(246, 250, 253));
    --wcag2-gradient-cold-front-dark: linear-gradient(180deg, rgba(143, 130, 246), rgba(230, 107, 111));
    --wcag2-gradient-cold-front: linear-gradient(180deg, rgba(244, 215, 255), rgba(252, 217, 218));
    --wcag2-gradient-early-bird-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(143, 130, 246));
    --wcag2-gradient-early-bird: linear-gradient(180deg, rgba(199, 196, 255), rgba(255, 245, 156));
    --wcag2-gradient-evergreen-petrichor-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(0, 123, 108));
    --wcag2-gradient-evergreen-petrichor: linear-gradient(180deg, rgba(137, 218, 183), rgba(255, 248, 184));
    --wcag2-gradient-high-noon-dark: linear-gradient(180deg, rgba(236, 108, 5), rgba(206, 44, 50));
    --wcag2-gradient-high-noon: linear-gradient(180deg, rgba(255, 242, 128), rgba(255, 146, 40));
    --wcag2-gradient-midnight-moon-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(102, 83, 240));
    --wcag2-gradient-midnight-moon: linear-gradient(180deg, rgba(169, 163, 254), rgba(222, 221, 255));
    --wcag2-gradient-open-horizon-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(207, 94, 255));
    --wcag2-gradient-open-horizon: linear-gradient(180deg, rgba(117, 180, 225), rgba(252, 217, 218));
    --wcag2-gradient-summer-solstice-dark: linear-gradient(180deg, rgba(255, 146, 41), rgba(143, 130, 246));
    --wcag2-gradient-summer-solstice: linear-gradient(180deg, rgba(255, 146, 40), rgba(199, 196, 255));
    --wcag2-gradient-summit-sunset-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(230, 107, 111));
    --wcag2-gradient-summit-sunset: linear-gradient(180deg, rgba(244, 215, 255), rgba(246, 145, 148));
    --wcag2-gradient-tropical-mist-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(35, 164, 130));
    --wcag2-gradient-tropical-mist: linear-gradient(180deg, rgba(117, 180, 225), rgba(137, 218, 183));
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
}`;

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
    line-height: 1.3;
    font-size: 17px;
}`;