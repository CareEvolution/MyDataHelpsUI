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
  --mdhui-grey-1-base: rgb(251, 252, 252);
  --mdhui-grey-2-base: rgb(247, 248, 249);
  --mdhui-grey-3-base: rgb(244, 245, 246);
  --mdhui-grey-4-base: rgb(242, 243, 245);
  --mdhui-grey-5-base: rgb(237, 238, 240);
  --mdhui-grey-10-base: rgb(224, 225, 230);
  --mdhui-grey-20-base: rgb(200, 201, 210);
  --mdhui-grey-30-base: rgb(172, 173, 186);
  --mdhui-grey-40-base: rgb(143, 144, 162);
  --mdhui-grey-50-base: rgb(115, 116, 139);
  --mdhui-grey-55-base: rgb(107, 107, 129);
  --mdhui-grey-60-base: rgb(90, 90, 108);
  --mdhui-grey-70-base: rgb(68, 67, 81);
  --mdhui-grey-80-base: rgb(46, 45, 53);
  --mdhui-grey-90-base: rgb(29, 28, 34);
  --mdhui-grey-95-base: rgb(27, 26, 31);
  --mdhui-grey-96-base: rgb(25, 25, 29);
  --mdhui-grey-97-base: rgb(22, 21, 25);
  --mdhui-grey-98-base: rgb(20, 19, 23);
  --mdhui-grey-99-base: rgb(17, 16, 19);

  --mdhui-white: var(--mdhui-grey-1-base);
  --mdhui-black: var(--mdhui-grey-99-base);

  --mdhui-yellow-1-base: rgb(255, 252, 230);
  --mdhui-yellow-2-base: rgb(255, 249, 207);
  --mdhui-yellow-3-base: rgb(255, 247, 195);
  --mdhui-yellow-4-base: rgb(255, 245, 183);
  --mdhui-yellow-5-base: rgb(255, 240, 148);
  --mdhui-yellow-10-base: rgb(255, 224, 43);
  --mdhui-yellow-20-base: rgb(246, 196, 0);
  --mdhui-yellow-30-base: rgb(211, 168, 0);
  --mdhui-yellow-40-base: rgb(177, 141, 0);
  --mdhui-yellow-50-base: rgb(144, 114, 0);
  --mdhui-yellow-55-base: rgb(134, 105, 0);
  --mdhui-yellow-60-base: rgb(112, 89, 0);
  --mdhui-yellow-70-base: rgb(85, 67, 0);
  --mdhui-yellow-80-base: rgb(57, 44, 0);
  --mdhui-yellow-90-base: rgb(37, 28, 0);
  --mdhui-yellow-95-base: rgb(34, 26, 0);
  --mdhui-yellow-96-base: rgb(31, 24, 0);
  --mdhui-yellow-97-base: rgb(28, 21, 0);
  --mdhui-yellow-98-base: rgb(25, 20, 0);
  --mdhui-yellow-99-base: rgb(21, 17, 0);

  --mdhui-orange-1-base: rgb(255, 251, 246);
  --mdhui-orange-2-base: rgb(255, 246, 237);
  --mdhui-orange-3-base: rgb(255, 244, 232);
  --mdhui-orange-4-base: rgb(255, 241, 227);
  --mdhui-orange-5-base: rgb(255, 236, 217);
  --mdhui-orange-10-base: rgb(255, 219, 184);
  --mdhui-orange-20-base: rgb(255, 188, 122);
  --mdhui-orange-30-base: rgb(255, 146, 41);
  --mdhui-orange-40-base: rgb(236, 108, 5);
  --mdhui-orange-50-base: rgb(191, 87, 4);
  --mdhui-orange-55-base: rgb(177, 81, 3);
  --mdhui-orange-60-base: rgb(149, 68, 3);
  --mdhui-orange-70-base: rgb(112, 51, 2);
  --mdhui-orange-80-base: rgb(76, 34, 1);
  --mdhui-orange-90-base: rgb(49, 22, 0);
  --mdhui-orange-95-base: rgb(46, 20, 0);
  --mdhui-orange-96-base: rgb(42, 19, 0);
  --mdhui-orange-97-base: rgb(38, 17, 0);
  --mdhui-orange-98-base: rgb(31, 14, 0);
  --mdhui-orange-99-base: rgb(29, 13, 0);

  --mdhui-red-1-base: rgb(255, 250, 250);
  --mdhui-red-2-base: rgb(254, 245, 245);
  --mdhui-red-3-base: rgb(253, 243, 244);
  --mdhui-red-4-base: rgb(253, 239, 240);
  --mdhui-red-5-base: rgb(252, 234, 234);
  --mdhui-red-10-base: rgb(249, 217, 218);
  --mdhui-red-20-base: rgb(244, 187, 189);
  --mdhui-red-30-base: rgb(237, 150, 153);
  --mdhui-red-40-base: rgb(230, 107, 111);
  --mdhui-red-50-base: rgb(220, 52, 58);
  --mdhui-red-55-base: rgb(206, 44, 50);
  --mdhui-red-60-base: rgb(174, 37, 42);
  --mdhui-red-70-base: rgb(132, 28, 32);
  --mdhui-red-80-base: rgb(89, 20, 22);
  --mdhui-red-90-base: rgb(58, 13, 14);
  --mdhui-red-95-base: rgb(54, 12, 13);
  --mdhui-red-96-base: rgb(51, 11, 12);
  --mdhui-red-97-base: rgb(45, 10, 11);
  --mdhui-red-98-base: rgb(41, 9, 10);
  --mdhui-red-99-base: rgb(35, 8, 9);

  --mdhui-red-vivid-1-base: rgb(255, 250, 250);
  --mdhui-red-vivid-2-base: rgb(255, 246, 247);
  --mdhui-red-vivid-3-base: rgb(254, 243, 243);
  --mdhui-red-vivid-4-base: rgb(254, 240, 240);
  --mdhui-red-vivid-5-base: rgb(254, 233, 233);
  --mdhui-red-vivid-10-base: rgb(252, 215, 217);
  --mdhui-red-vivid-20-base: rgb(250, 186, 188);
  --mdhui-red-vivid-30-base: rgb(247, 145, 148);
  --mdhui-red-vivid-40-base: rgb(243, 97, 102);
  --mdhui-red-vivid-50-base: rgb(236, 6, 14);
  --mdhui-red-vivid-55-base: rgb(220, 0, 7);
  --mdhui-red-vivid-60-base: rgb(187, 0, 6);
  --mdhui-red-vivid-70-base: rgb(143, 0, 4);
  --mdhui-red-vivid-80-base: rgb(100, 0, 3);
  --mdhui-red-vivid-90-base: rgb(67, 0, 2);
  --mdhui-red-vivid-95-base: rgb(64, 0, 2);
  --mdhui-red-vivid-96-base: rgb(60, 0, 2);
  --mdhui-red-vivid-97-base: rgb(54, 0, 2);
  --mdhui-red-vivid-98-base: rgb(50, 0, 2);
  --mdhui-red-vivid-99-base: rgb(45, 0, 1);

  --mdhui-violet-1-base: rgb(254, 251, 255);
  --mdhui-violet-2-base: rgb(252, 246, 255);
  --mdhui-violet-3-base: rgb(252, 243, 255);
  --mdhui-violet-4-base: rgb(250, 238, 255);
  --mdhui-violet-5-base: rgb(249, 233, 255);
  --mdhui-violet-10-base: rgb(244, 214, 255);
  --mdhui-violet-20-base: rgb(235, 183, 255);
  --mdhui-violet-30-base: rgb(224, 141, 255);
  --mdhui-violet-40-base: rgb(207, 94, 255);
  --mdhui-violet-50-base: rgb(174, 50, 246);
  --mdhui-violet-55-base: rgb(162, 42, 233);
  --mdhui-violet-60-base: rgb(137, 35, 197);
  --mdhui-violet-70-base: rgb(104, 25, 150);
  --mdhui-violet-80-base: rgb(71, 16, 104);
  --mdhui-violet-90-base: rgb(47, 9, 69);
  --mdhui-violet-95-base: rgb(44, 8, 65);
  --mdhui-violet-96-base: rgb(41, 8, 60);
  --mdhui-violet-97-base: rgb(36, 7, 54);
  --mdhui-violet-98-base: rgb(34, 6, 50);
  --mdhui-violet-99-base: rgb(29, 6, 42);

  --mdhui-blue-1-base: rgb(250, 252, 253);
  --mdhui-blue-2-base: rgb(244, 249, 252);
  --mdhui-blue-3-base: rgb(238, 246, 250);
  --mdhui-blue-4-base: rgb(235, 244, 249);
  --mdhui-blue-5-base: rgb(230, 241, 248);
  --mdhui-blue-10-base: rgb(206, 227, 242);
  --mdhui-blue-20-base: rgb(170, 206, 232);
  --mdhui-blue-30-base: rgb(125, 180, 220);
  --mdhui-blue-40-base: rgb(76, 152, 207);
  --mdhui-blue-50-base: rgb(24, 122, 193);
  --mdhui-blue-55-base: rgb(11, 112, 186);
  --mdhui-blue-60-base: rgb(9, 94, 159);
  --mdhui-blue-70-base: rgb(5, 70, 122);
  --mdhui-blue-80-base: rgb(2, 47, 86);
  --mdhui-blue-90-base: rgb(0, 29, 60);
  --mdhui-blue-95-base: rgb(0, 27, 56);
  --mdhui-blue-96-base: rgb(0, 25, 52);
  --mdhui-blue-97-base: rgb(0, 23, 46);
  --mdhui-blue-98-base: rgb(0, 20, 42);
  --mdhui-blue-99-base: rgb(0, 18, 36);

  --mdhui-blue-vivid-1-base: rgb(250, 252, 255);
  --mdhui-blue-vivid-2-base: rgb(244, 248, 255);
  --mdhui-blue-vivid-3-base: rgb(241, 246, 255);
  --mdhui-blue-vivid-4-base: rgb(235, 243, 254);
  --mdhui-blue-vivid-5-base: rgb(229, 239, 254);
  --mdhui-blue-vivid-10-base: rgb(209, 226, 253);
  --mdhui-blue-vivid-20-base: rgb(205, 227, 255);
  --mdhui-blue-vivid-30-base: rgb(125, 175, 250);
  --mdhui-blue-vivid-40-base: rgb(76, 145, 248);
  --mdhui-blue-vivid-50-base: rgb(20, 110, 246);
  --mdhui-blue-vivid-55-base: rgb(12, 100, 235);
  --mdhui-blue-vivid-60-base: rgb(9, 84, 200);
  --mdhui-blue-vivid-70-base: rgb(6, 62, 152);
  --mdhui-blue-vivid-80-base: rgb(3, 42, 106);
  --mdhui-blue-vivid-90-base: rgb(0, 26, 72);
  --mdhui-blue-vivid-95-base: rgb(0, 24, 67);
  --mdhui-blue-vivid-96-base: rgb(0, 23, 63);
  --mdhui-blue-vivid-97-base: rgb(0, 20, 56);
  --mdhui-blue-vivid-98-base: rgb(0, 18, 50);
  --mdhui-blue-vivid-99-base: rgb(0, 16, 45);

  --mdhui-indigo-1-base: rgb(251, 252, 255);
  --mdhui-indigo-2-base: rgb(247, 248, 255);
  --mdhui-indigo-3-base: rgb(244, 245, 255);
  --mdhui-indigo-4-base: rgb(241, 241, 255);
  --mdhui-indigo-5-base: rgb(237, 237, 255);
  --mdhui-indigo-10-base: rgb(222, 221, 255);
  --mdhui-indigo-20-base: rgb(200, 196, 253);
  --mdhui-indigo-30-base: rgb(172, 163, 250);
  --mdhui-indigo-40-base: rgb(143, 130, 246);
  --mdhui-indigo-50-base: rgb(112, 94, 243);
  --mdhui-indigo-55-base: rgb(102, 83, 240);
  --mdhui-indigo-60-base: rgb(83, 61, 224);
  --mdhui-indigo-70-base: rgb(54, 28, 201);
  --mdhui-indigo-80-base: rgb(36, 16, 142);
  --mdhui-indigo-90-base: rgb(22, 8, 98);
  --mdhui-indigo-95-base: rgb(21, 7, 92);
  --mdhui-indigo-96-base: rgb(19, 7, 86);
  --mdhui-indigo-97-base: rgb(17, 6, 78);
  --mdhui-indigo-98-base: rgb(16, 6, 71);
  --mdhui-indigo-99-base: rgb(14, 5, 63);

  --mdhui-cyan-1-base: rgb(247, 253, 254);
  --mdhui-cyan-2-base: rgb(237, 251, 253);
  --mdhui-cyan-3-base: rgb(228, 249, 252);
  --mdhui-cyan-4-base: rgb(219, 247, 251);
  --mdhui-cyan-5-base: rgb(209, 245, 250);
  --mdhui-cyan-10-base: rgb(168, 235, 246);
  --mdhui-cyan-20-base: rgb(93, 218, 239);
  --mdhui-cyan-30-base: rgb(63, 188, 212);
  --mdhui-cyan-40-base: rgb(34, 159, 185);
  --mdhui-cyan-50-base: rgb(4, 128, 158);
  --mdhui-cyan-55-base: rgb(10, 118, 148);
  --mdhui-cyan-60-base: rgb(10, 99, 124);
  --mdhui-cyan-70-base: rgb(9, 74, 94);
  --mdhui-cyan-80-base: rgb(8, 50, 65);
  --mdhui-cyan-90-base: rgb(8, 31, 42);
  --mdhui-cyan-95-base: rgb(8, 29, 39);
  --mdhui-cyan-96-base: rgb(7, 27, 36);
  --mdhui-cyan-97-base: rgb(6, 24, 32);
  --mdhui-cyan-98-base: rgb(6, 22, 28);
  --mdhui-cyan-99-base: rgb(5, 18, 24);

  --mdhui-green-1-base: rgb(248, 253, 251);
  --mdhui-green-2-base: rgb(241, 251, 246);
  --mdhui-green-3-base: rgb(234, 249, 242);
  --mdhui-green-4-base: rgb(230, 247, 240);
  --mdhui-green-5-base: rgb(219, 244, 233);
  --mdhui-green-10-base: rgb(189, 234, 215);
  --mdhui-green-20-base: rgb(138, 217, 184);
  --mdhui-green-30-base: rgb(69, 194, 143);
  --mdhui-green-40-base: rgb(35, 164, 130);
  --mdhui-green-50-base: rgb(1, 132, 116);
  --mdhui-green-55-base: rgb(0, 123, 108);
  --mdhui-green-60-base: rgb(0, 103, 91);
  --mdhui-green-70-base: rgb(0, 78, 69);
  --mdhui-green-80-base: rgb(0, 52, 47);
  --mdhui-green-90-base: rgb(0, 33, 30);
  --mdhui-green-95-base: rgb(0, 31, 29);
  --mdhui-green-96-base: rgb(0, 29, 27);
  --mdhui-green-97-base: rgb(0, 26, 23);
  --mdhui-green-98-base: rgb(0, 23, 21);
  --mdhui-green-99-base: rgb(0, 20, 19);
}

:root {
  /* Light mode questions */
  --mdhui-grey-1: var(--mdhui-grey-1-base);
  --mdhui-grey-2: var(--mdhui-grey-2-base);
  --mdhui-grey-3: var(--mdhui-grey-3-base);
  --mdhui-grey-4: var(--mdhui-grey-4-base);
  --mdhui-grey-5: var(--mdhui-grey-5-base);
  --mdhui-grey-10: var(--mdhui-grey-10-base);
  --mdhui-grey-20: var(--mdhui-grey-20-base);
  --mdhui-grey-30: var(--mdhui-grey-30-base);
  --mdhui-grey-40: var(--mdhui-grey-40-base);
  --mdhui-grey-50: var(--mdhui-grey-50-base);
  --mdhui-grey-55: var(--mdhui-grey-55-base);
  --mdhui-grey-60: var(--mdhui-grey-60-base);
  --mdhui-grey-70: var(--mdhui-grey-70-base);
  --mdhui-grey-80: var(--mdhui-grey-80-base);
  --mdhui-grey-90: var(--mdhui-grey-90-base);
  --mdhui-grey-95: var(--mdhui-grey-95-base);
  --mdhui-grey-96: var(--mdhui-grey-96-base);
  --mdhui-grey-97: var(--mdhui-grey-97-base);
  --mdhui-grey-98: var(--mdhui-grey-98-base);
  --mdhui-grey-99: var(--mdhui-grey-99-base);

  --mdhui-blue-1: var(--mdhui-blue-1-base);
  --mdhui-blue-2: var(--mdhui-blue-2-base);
  --mdhui-blue-3: var(--mdhui-blue-3-base);
  --mdhui-blue-4: var(--mdhui-blue-4-base);
  --mdhui-blue-5: var(--mdhui-blue-5-base);
  --mdhui-blue-10: var(--mdhui-blue-10-base);
  --mdhui-blue-20: var(--mdhui-blue-20-base);
  --mdhui-blue-30: var(--mdhui-blue-30-base);
  --mdhui-blue-40: var(--mdhui-blue-40-base);
  --mdhui-blue-50: var(--mdhui-blue-50-base);
  --mdhui-blue-55: var(--mdhui-blue-55-base);
  --mdhui-blue-60: var(--mdhui-blue-60-base);
  --mdhui-blue-70: var(--mdhui-blue-70-base);
  --mdhui-blue-80: var(--mdhui-blue-80-base);
  --mdhui-blue-90: var(--mdhui-blue-90-base);
  --mdhui-blue-95: var(--mdhui-blue-95-base);
  --mdhui-blue-96: var(--mdhui-blue-96-base);
  --mdhui-blue-97: var(--mdhui-blue-97-base);
  --mdhui-blue-98: var(--mdhui-blue-98-base);
  --mdhui-blue-99: var(--mdhui-blue-99-base);

  --mdhui-blue-vivid-1: var(--mdhui-blue-vivid-1-base);
  --mdhui-blue-vivid-2: var(--mdhui-blue-vivid-2-base);
  --mdhui-blue-vivid-3: var(--mdhui-blue-vivid-3-base);
  --mdhui-blue-vivid-4: var(--mdhui-blue-vivid-4-base);
  --mdhui-blue-vivid-5: var(--mdhui-blue-vivid-5-base);
  --mdhui-blue-vivid-10: var(--mdhui-blue-vivid-10-base);
  --mdhui-blue-vivid-20: var(--mdhui-blue-vivid-20-base);
  --mdhui-blue-vivid-30: var(--mdhui-blue-vivid-30-base);
  --mdhui-blue-vivid-40: var(--mdhui-blue-vivid-40-base);
  --mdhui-blue-vivid-50: var(--mdhui-blue-vivid-50-base);
  --mdhui-blue-vivid-55: var(--mdhui-blue-vivid-55-base);
  --mdhui-blue-vivid-60: var(--mdhui-blue-vivid-60-base);
  --mdhui-blue-vivid-70: var(--mdhui-blue-vivid-70-base);
  --mdhui-blue-vivid-80: var(--mdhui-blue-vivid-80-base);
  --mdhui-blue-vivid-90: var(--mdhui-blue-vivid-90-base);
  --mdhui-blue-vivid-95: var(--mdhui-blue-vivid-95-base);
  --mdhui-blue-vivid-96: var(--mdhui-blue-vivid-96-base);
  --mdhui-blue-vivid-97: var(--mdhui-blue-vivid-97-base);
  --mdhui-blue-vivid-98: var(--mdhui-blue-vivid-98-base);
  --mdhui-blue-vivid-99: var(--mdhui-blue-vivid-99-base);

  --mdhui-green-1: var(--mdhui-green-1-base);
  --mdhui-green-2: var(--mdhui-green-2-base);
  --mdhui-green-3: var(--mdhui-green-3-base);
  --mdhui-green-4: var(--mdhui-green-4-base);
  --mdhui-green-5: var(--mdhui-green-5-base);
  --mdhui-green-10: var(--mdhui-green-10-base);
  --mdhui-green-20: var(--mdhui-green-20-base);
  --mdhui-green-30: var(--mdhui-green-30-base);
  --mdhui-green-40: var(--mdhui-green-40-base);
  --mdhui-green-50: var(--mdhui-green-50-base);
  --mdhui-green-55: var(--mdhui-green-55-base);
  --mdhui-green-60: var(--mdhui-green-60-base);
  --mdhui-green-70: var(--mdhui-green-70-base);
  --mdhui-green-80: var(--mdhui-green-80-base);
  --mdhui-green-90: var(--mdhui-green-90-base);
  --mdhui-green-95: var(--mdhui-green-95-base);
  --mdhui-green-96: var(--mdhui-green-96-base);
  --mdhui-green-97: var(--mdhui-green-97-base);
  --mdhui-green-98: var(--mdhui-green-98-base);
  --mdhui-green-99: var(--mdhui-green-99-base);

  --mdhui-yellow-1: var(--mdhui-yellow-1-base);
  --mdhui-yellow-2: var(--mdhui-yellow-2-base);
  --mdhui-yellow-3: var(--mdhui-yellow-3-base);
  --mdhui-yellow-4: var(--mdhui-yellow-4-base);
  --mdhui-yellow-5: var(--mdhui-yellow-5-base);
  --mdhui-yellow-10: var(--mdhui-yellow-10-base);
  --mdhui-yellow-20: var(--mdhui-yellow-20-base);
  --mdhui-yellow-30: var(--mdhui-yellow-30-base);
  --mdhui-yellow-40: var(--mdhui-yellow-40-base);
  --mdhui-yellow-50: var(--mdhui-yellow-50-base);
  --mdhui-yellow-55: var(--mdhui-yellow-55-base);
  --mdhui-yellow-60: var(--mdhui-yellow-60-base);
  --mdhui-yellow-70: var(--mdhui-yellow-70-base);
  --mdhui-yellow-80: var(--mdhui-yellow-80-base);
  --mdhui-yellow-90: var(--mdhui-yellow-90-base);
  --mdhui-yellow-95: var(--mdhui-yellow-95-base);
  --mdhui-yellow-96: var(--mdhui-yellow-96-base);
  --mdhui-yellow-97: var(--mdhui-yellow-97-base);
  --mdhui-yellow-98: var(--mdhui-yellow-98-base);
  --mdhui-yellow-99: var(--mdhui-yellow-99-base);

  --mdhui-orange-1: var(--mdhui-orange-1-base);
  --mdhui-orange-2: var(--mdhui-orange-2-base);
  --mdhui-orange-3: var(--mdhui-orange-3-base);
  --mdhui-orange-4: var(--mdhui-orange-4-base);
  --mdhui-orange-5: var(--mdhui-orange-5-base);
  --mdhui-orange-10: var(--mdhui-orange-10-base);
  --mdhui-orange-20: var(--mdhui-orange-20-base);
  --mdhui-orange-30: var(--mdhui-orange-30-base);
  --mdhui-orange-40: var(--mdhui-orange-40-base);
  --mdhui-orange-50: var(--mdhui-orange-50-base);
  --mdhui-orange-55: var(--mdhui-orange-55-base);
  --mdhui-orange-60: var(--mdhui-orange-60-base);
  --mdhui-orange-70: var(--mdhui-orange-70-base);
  --mdhui-orange-80: var(--mdhui-orange-80-base);
  --mdhui-orange-90: var(--mdhui-orange-90-base);
  --mdhui-orange-95: var(--mdhui-orange-95-base);
  --mdhui-orange-96: var(--mdhui-orange-96-base);
  --mdhui-orange-97: var(--mdhui-orange-97-base);
  --mdhui-orange-98: var(--mdhui-orange-98-base);
  --mdhui-orange-99: var(--mdhui-orange-99-base);

  --mdhui-red-1: var(--mdhui-red-1-base);
  --mdhui-red-2: var(--mdhui-red-2-base);
  --mdhui-red-3: var(--mdhui-red-3-base);
  --mdhui-red-4: var(--mdhui-red-4-base);
  --mdhui-red-5: var(--mdhui-red-5-base);
  --mdhui-red-10: var(--mdhui-red-10-base);
  --mdhui-red-20: var(--mdhui-red-20-base);
  --mdhui-red-30: var(--mdhui-red-30-base);
  --mdhui-red-40: var(--mdhui-red-40-base);
  --mdhui-red-50: var(--mdhui-red-50-base);
  --mdhui-red-55: var(--mdhui-red-55-base);
  --mdhui-red-60: var(--mdhui-red-60-base);
  --mdhui-red-70: var(--mdhui-red-70-base);
  --mdhui-red-80: var(--mdhui-red-80-base);
  --mdhui-red-90: var(--mdhui-red-90-base);
  --mdhui-red-95: var(--mdhui-red-95-base);
  --mdhui-red-96: var(--mdhui-red-96-base);
  --mdhui-red-97: var(--mdhui-red-97-base);
  --mdhui-red-98: var(--mdhui-red-98-base);
  --mdhui-red-99: var(--mdhui-red-99-base);

  --mdhui-red-vivid-1: var(--mdhui-red-vivid-1-base);
  --mdhui-red-vivid-2: var(--mdhui-red-vivid-2-base);
  --mdhui-red-vivid-3: var(--mdhui-red-vivid-3-base);
  --mdhui-red-vivid-4: var(--mdhui-red-vivid-4-base);
  --mdhui-red-vivid-5: var(--mdhui-red-vivid-5-base);
  --mdhui-red-vivid-10: var(--mdhui-red-vivid-10-base);
  --mdhui-red-vivid-20: var(--mdhui-red-vivid-20-base);
  --mdhui-red-vivid-30: var(--mdhui-red-vivid-30-base);
  --mdhui-red-vivid-40: var(--mdhui-red-vivid-40-base);
  --mdhui-red-vivid-50: var(--mdhui-red-vivid-50-base);
  --mdhui-red-vivid-55: var(--mdhui-red-vivid-55-base);
  --mdhui-red-vivid-60: var(--mdhui-red-vivid-60-base);
  --mdhui-red-vivid-70: var(--mdhui-red-vivid-70-base);
  --mdhui-red-vivid-80: var(--mdhui-red-vivid-80-base);
  --mdhui-red-vivid-90: var(--mdhui-red-vivid-90-base);
  --mdhui-red-vivid-95: var(--mdhui-red-vivid-95-base);
  --mdhui-red-vivid-96: var(--mdhui-red-vivid-96-base);
  --mdhui-red-vivid-97: var(--mdhui-red-vivid-97-base);
  --mdhui-red-vivid-98: var(--mdhui-red-vivid-98-base);
  --mdhui-red-vivid-99: var(--mdhui-red-vivid-99-base);

  --mdhui-violet-1: var(--mdhui-violet-1-base);
  --mdhui-violet-2: var(--mdhui-violet-2-base);
  --mdhui-violet-3: var(--mdhui-violet-3-base);
  --mdhui-violet-4: var(--mdhui-violet-4-base);
  --mdhui-violet-5: var(--mdhui-violet-5-base);
  --mdhui-violet-10: var(--mdhui-violet-10-base);
  --mdhui-violet-20: var(--mdhui-violet-20-base);
  --mdhui-violet-30: var(--mdhui-violet-30-base);
  --mdhui-violet-40: var(--mdhui-violet-40-base);
  --mdhui-violet-50: var(--mdhui-violet-50-base);
  --mdhui-violet-55: var(--mdhui-violet-55-base);
  --mdhui-violet-60: var(--mdhui-violet-60-base);
  --mdhui-violet-70: var(--mdhui-violet-70-base);
  --mdhui-violet-80: var(--mdhui-violet-80-base);
  --mdhui-violet-90: var(--mdhui-violet-90-base);
  --mdhui-violet-95: var(--mdhui-violet-95-base);
  --mdhui-violet-96: var(--mdhui-violet-96-base);
  --mdhui-violet-97: var(--mdhui-violet-97-base);
  --mdhui-violet-98: var(--mdhui-violet-98-base);
  --mdhui-violet-99: var(--mdhui-violet-99-base);

  --mdhui-indigo-1: var(--mdhui-indigo-1-base);
  --mdhui-indigo-2: var(--mdhui-indigo-2-base);
  --mdhui-indigo-3: var(--mdhui-indigo-3-base);
  --mdhui-indigo-4: var(--mdhui-indigo-4-base);
  --mdhui-indigo-5: var(--mdhui-indigo-5-base);
  --mdhui-indigo-10: var(--mdhui-indigo-10-base);
  --mdhui-indigo-20: var(--mdhui-indigo-20-base);
  --mdhui-indigo-30: var(--mdhui-indigo-30-base);
  --mdhui-indigo-40: var(--mdhui-indigo-40-base);
  --mdhui-indigo-50: var(--mdhui-indigo-50-base);
  --mdhui-indigo-55: var(--mdhui-indigo-55-base);
  --mdhui-indigo-60: var(--mdhui-indigo-60-base);
  --mdhui-indigo-70: var(--mdhui-indigo-70-base);
  --mdhui-indigo-80: var(--mdhui-indigo-80-base);
  --mdhui-indigo-90: var(--mdhui-indigo-90-base);
  --mdhui-indigo-95: var(--mdhui-indigo-95-base);
  --mdhui-indigo-96: var(--mdhui-indigo-96-base);
  --mdhui-indigo-97: var(--mdhui-indigo-97-base);
  --mdhui-indigo-98: var(--mdhui-indigo-98-base);
  --mdhui-indigo-99: var(--mdhui-indigo-99-base);

  --mdhui-cyan-1: var(--mdhui-cyan-1-base);
  --mdhui-cyan-2: var(--mdhui-cyan-2-base);
  --mdhui-cyan-3: var(--mdhui-cyan-3-base);
  --mdhui-cyan-4: var(--mdhui-cyan-4-base);
  --mdhui-cyan-5: var(--mdhui-cyan-5-base);
  --mdhui-cyan-10: var(--mdhui-cyan-10-base);
  --mdhui-cyan-20: var(--mdhui-cyan-20-base);
  --mdhui-cyan-30: var(--mdhui-cyan-30-base);
  --mdhui-cyan-40: var(--mdhui-cyan-40-base);
  --mdhui-cyan-50: var(--mdhui-cyan-50-base);
  --mdhui-cyan-55: var(--mdhui-cyan-55-base);
  --mdhui-cyan-60: var(--mdhui-cyan-60-base);
  --mdhui-cyan-70: var(--mdhui-cyan-70-base);
  --mdhui-cyan-80: var(--mdhui-cyan-80-base);
  --mdhui-cyan-90: var(--mdhui-cyan-90-base);
  --mdhui-cyan-95: var(--mdhui-cyan-95-base);
  --mdhui-cyan-96: var(--mdhui-cyan-96-base);
  --mdhui-cyan-97: var(--mdhui-cyan-97-base);
  --mdhui-cyan-98: var(--mdhui-cyan-98-base);
  --mdhui-cyan-99: var(--mdhui-cyan-99-base);

  /* Gradients */
  --mdhui-gradient-alpine-overlook: linear-gradient(180deg, rgba(12, 100, 235), rgba(76, 152, 207));
  --mdhui-gradient-tropical-mist: linear-gradient(180deg, rgba(76, 145, 248), rgba(35, 164, 130));
  --mdhui-gradient-summit-sunset: linear-gradient(180deg, rgba(207, 94, 255), rgba(230, 107, 111));
  --mdhui-gradient-cold-front: linear-gradient(180deg, rgba(143, 130, 246), rgba(230, 107, 111));
  --mdhui-gradient-summer-solstice: linear-gradient(180deg, rgba(255, 146, 41), rgba(143, 130, 246));
  --mdhui-gradient-high-noon: linear-gradient(180deg, rgba(236, 108, 5), rgba(206, 44, 50));
  --mdhui-gradient-midnight-moon: linear-gradient(180deg, rgba(207, 94, 255), rgba(102, 83, 240));
  --mdhui-gradient-open-horizon: linear-gradient(180deg, rgba(76, 145, 248), rgba(207, 94, 255));
  --mdhui-gradient-early-bird: linear-gradient(180deg, rgba(34, 159, 185), rgba(143, 130, 246));
  --mdhui-gradient-evergreen-petrichor: linear-gradient(180deg, rgba(34, 159, 185), rgba(0, 123, 108));
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