import { css, CSSObject } from '@emotion/react';
import { CSSProperties } from 'react';
import { legacyCeColors } from './legacyCeColors';

export const core = css`
:root {
    --mdhui-color-primary: rgba(0, 127, 249, 1);
    --mdhui-color-success: #00AE42;
    --mdhui-color-warning: rgb(232, 124, 0);
    --mdhui-color-danger: rgb(239, 55, 36);
    /* Text tokens (mapping table): the accents as FOREGROUND (links, icons, headings,
       status text). Default to the base accents, so light mode is unchanged; dark
       overrides them to the grade-40 ladder. Base tokens keep the FILL duty (buttons,
       pills, chips) — white-text elements keep the light-mode value in dark. */
    --mdhui-color-primary-text: var(--mdhui-color-primary);
    --mdhui-color-success-text: var(--mdhui-color-success);
    --mdhui-color-warning-text: var(--mdhui-color-warning);
    --mdhui-color-danger-text: var(--mdhui-color-danger);
    /* Mark tokens: the accents as data ink (meter fills, plot pills). Same values as
       -text today; the separate name lets marks be tuned apart from text without a
       rename. */
    --mdhui-color-primary-mark: var(--mdhui-color-primary-text);
    --mdhui-color-success-mark: var(--mdhui-color-success-text);
    --mdhui-color-warning-mark: var(--mdhui-color-warning-text);
    --mdhui-color-danger-mark: var(--mdhui-color-danger-text);
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
    --mdh-grey-0: #FFFFFF;
    --mdh-grey-1: #FCFCFC;
    --mdh-grey-2: #F8F8F8;
    --mdh-grey-3: #F4F5F6;
    --mdh-grey-4: #F2F3F4;
    --mdh-grey-5: #EEEFF1;
    --mdh-grey-10: #E0E2E5;
    --mdh-grey-20: #C7CBD1;
    --mdh-grey-30: #A9AFB7;
    --mdh-grey-35: #9AA1AA;
    --mdh-grey-40: #8B939D;
    --mdh-grey-50: #6E7683;
    --mdh-grey-55: #636C78;
    --mdh-grey-60: #545C69;
    --mdh-grey-70: #3D4551;
    --mdh-grey-80: #262E3A;
    --mdh-grey-85: #1D2530;
    --mdh-grey-90: #151D28;
    --mdh-grey-95: #0B131D;
    --mdh-grey-99: #050A14;
    --mdh-blue-grey-1: #FBFCFD;
    --mdh-blue-grey-2: #F6F8FB;
    --mdh-blue-grey-3: #F2F5FA;
    --mdh-blue-grey-4: #EFF4F9;
    --mdh-blue-grey-5: #E8EFF7;
    --mdh-blue-grey-10: #D4E3F2;
    --mdh-blue-grey-20: #BAD2EB;
    --mdh-blue-grey-30: #96BBE1;
    --mdh-blue-grey-35: #7BA9D8;
    --mdh-blue-grey-40: #6098D2;
    --mdh-blue-grey-50: #4A79AA;
    --mdh-blue-grey-55: #436F9B;
    --mdh-blue-grey-60: #3D6690;
    --mdh-blue-grey-70: #35577B;
    --mdh-blue-grey-80: #2A435E;
    --mdh-blue-grey-85: #1E3751;
    --mdh-blue-grey-90: #1B2C3E;
    --mdh-blue-grey-95: #142230;
    --mdh-blue-grey-99: #16222F;
    --mdh-blue-1: #FAFCFF;
    --mdh-blue-2: #F5F9FE;
    --mdh-blue-3: #F0F6FF;
    --mdh-blue-4: #EBF3FF;
    --mdh-blue-5: #E4EFFF;
    --mdh-blue-10: #CFE3FF;
    --mdh-blue-20: #B1D1FF;
    --mdh-blue-30: #88B9FE;
    --mdh-blue-35: #69A7FE;
    --mdh-blue-40: #4795FE;
    --mdh-blue-50: #0271E8;
    --mdh-blue-55: #0268D6;
    --mdh-blue-60: #0260C7;
    --mdh-blue-70: #0352AB;
    --mdh-blue-80: #033F85;
    --mdh-blue-85: #04336C;
    --mdh-blue-90: #022859;
    --mdh-blue-95: #021F48;
    --mdh-blue-99: #021F46;
    --mdh-cobalt-1: #FBFCFF;
    --mdh-cobalt-2: #F7F9FE;
    --mdh-cobalt-3: #F1F5FF;
    --mdh-cobalt-4: #EEF3FF;
    --mdh-cobalt-5: #E8EEFF;
    --mdh-cobalt-10: #D6E1FF;
    --mdh-cobalt-20: #BCCEFF;
    --mdh-cobalt-30: #9BB5FE;
    --mdh-cobalt-35: #82A1FE;
    --mdh-cobalt-40: #6C8FFE;
    --mdh-cobalt-50: #4667FE;
    --mdh-cobalt-55: #3A57FC;
    --mdh-cobalt-60: #334AFE;
    --mdh-cobalt-70: #2A29FC;
    --mdh-cobalt-80: #200ED4;
    --mdh-cobalt-85: #181AA4;
    --mdh-cobalt-90: #130992;
    --mdh-cobalt-95: #0D0676;
    --mdh-cobalt-99: #0D0974;
    --mdh-indigo-1: #FBFCFF;
    --mdh-indigo-2: #F8F9FE;
    --mdh-indigo-3: #F3F5FF;
    --mdh-indigo-4: #F0F2FF;
    --mdh-indigo-5: #EBEEFF;
    --mdh-indigo-10: #DBE0FF;
    --mdh-indigo-20: #C4CCFF;
    --mdh-indigo-30: #A8B2FE;
    --mdh-indigo-35: #949DFF;
    --mdh-indigo-40: #8289FE;
    --mdh-indigo-50: #6560FE;
    --mdh-indigo-55: #5C4EFC;
    --mdh-indigo-60: #573FFE;
    --mdh-indigo-70: #4F11FC;
    --mdh-indigo-80: #3C0CC7;
    --mdh-indigo-85: #2F189A;
    --mdh-indigo-90: #270889;
    --mdh-indigo-95: #1D056F;
    --mdh-indigo-99: #1D086D;
    --mdh-iris-1: #FBFBFF;
    --mdh-iris-2: #F8F8FE;
    --mdh-iris-3: #F4F4FF;
    --mdh-iris-4: #F3F2FF;
    --mdh-iris-5: #EDEDFF;
    --mdh-iris-10: #E0DEFF;
    --mdh-iris-20: #CEC9FF;
    --mdh-iris-30: #B6AEFE;
    --mdh-iris-35: #A497FE;
    --mdh-iris-40: #9783FE;
    --mdh-iris-50: #7F56FE;
    --mdh-iris-55: #7741FC;
    --mdh-iris-60: #732DFE;
    --mdh-iris-70: #670AEC;
    --mdh-iris-80: #4F0BB9;
    --mdh-iris-85: #3E1690;
    --mdh-iris-90: #34077E;
    --mdh-iris-95: #280566;
    --mdh-iris-99: #280765;
    --mdh-violet-1: #FCFBFF;
    --mdh-violet-2: #FAF8FE;
    --mdh-violet-3: #F6F3FF;
    --mdh-violet-4: #F5F1FF;
    --mdh-violet-5: #F1ECFF;
    --mdh-violet-10: #E6DCFF;
    --mdh-violet-20: #D7C6FF;
    --mdh-violet-30: #C4A9FE;
    --mdh-violet-35: #B692FC;
    --mdh-violet-40: #AB7BFE;
    --mdh-violet-50: #9747FE;
    --mdh-violet-55: #902CFC;
    --mdh-violet-60: #8C08FC;
    --mdh-violet-70: #7809D8;
    --mdh-violet-80: #5D0AA9;
    --mdh-violet-85: #491484;
    --mdh-violet-90: #3E0674;
    --mdh-violet-95: #31045D;
    --mdh-violet-99: #31065C;
    --mdh-purple-1: #FDFBFF;
    --mdh-purple-2: #FCF8FE;
    --mdh-purple-3: #F9F2FF;
    --mdh-purple-4: #F8F0FF;
    --mdh-purple-5: #F6EAFF;
    --mdh-purple-10: #EFD9FF;
    --mdh-purple-20: #E6C1FF;
    --mdh-purple-30: #D9A0FE;
    --mdh-purple-35: #D085FE;
    --mdh-purple-40: #C86BFE;
    --mdh-purple-50: #B918FE;
    --mdh-purple-55: #AB07EB;
    --mdh-purple-60: #9F06DC;
    --mdh-purple-70: #8907BD;
    --mdh-purple-80: #6A0894;
    --mdh-purple-85: #531373;
    --mdh-purple-90: #470564;
    --mdh-purple-95: #390351;
    --mdh-purple-99: #390550;
    --mdh-magenta-1: #FDFBFF;
    --mdh-magenta-2: #FBF8FF;
    --mdh-magenta-3: #F9F3FF;
    --mdh-magenta-4: #F7F0FF;
    --mdh-magenta-5: #F5EAFF;
    --mdh-magenta-10: #EFD9FF;
    --mdh-magenta-20: #EABFFF;
    --mdh-magenta-30: #E999FF;
    --mdh-magenta-35: #E677FE;
    --mdh-magenta-40: #E84DFF;
    --mdh-magenta-50: #CF00D7;
    --mdh-magenta-55: #BD00C5;
    --mdh-magenta-60: #B000B7;
    --mdh-magenta-70: #98009E;
    --mdh-magenta-80: #77007C;
    --mdh-magenta-85: #5D1161;
    --mdh-magenta-90: #510055;
    --mdh-magenta-95: #410044;
    --mdh-magenta-99: #410144;
    --mdh-fuchsia-1: #FEFBFF;
    --mdh-fuchsia-2: #FEF7FE;
    --mdh-fuchsia-3: #FEF1FF;
    --mdh-fuchsia-4: #FEEEFF;
    --mdh-fuchsia-5: #FEE7FF;
    --mdh-fuchsia-10: #FFD4FD;
    --mdh-fuchsia-20: #FFB8F7;
    --mdh-fuchsia-30: #FE90EC;
    --mdh-fuchsia-35: #FE6DE5;
    --mdh-fuchsia-40: #FE3FDE;
    --mdh-fuchsia-50: #DA08B2;
    --mdh-fuchsia-55: #C705A2;
    --mdh-fuchsia-60: #B90597;
    --mdh-fuchsia-70: #9F0682;
    --mdh-fuchsia-80: #7C0765;
    --mdh-fuchsia-85: #621150;
    --mdh-fuchsia-90: #540444;
    --mdh-fuchsia-95: #440336;
    --mdh-fuchsia-99: #420435;
    --mdh-pink-1: #FFFBFD;
    --mdh-pink-2: #FFF7FB;
    --mdh-pink-3: #FFF1F9;
    --mdh-pink-4: #FFEEF8;
    --mdh-pink-5: #FFE8F5;
    --mdh-pink-10: #FFD6EC;
    --mdh-pink-20: #FFBBDD;
    --mdh-pink-30: #FF96C8;
    --mdh-pink-35: #FE76B8;
    --mdh-pink-40: #FF50A9;
    --mdh-pink-50: #E50084;
    --mdh-pink-55: #D00078;
    --mdh-pink-60: #C30070;
    --mdh-pink-70: #A8005F;
    --mdh-pink-80: #84004A;
    --mdh-pink-85: #680F3C;
    --mdh-pink-90: #5A0031;
    --mdh-pink-95: #490026;
    --mdh-pink-99: #490026;
    --mdh-red-1: #FFFBFC;
    --mdh-red-2: #FFF7F9;
    --mdh-red-3: #FFF2F6;
    --mdh-red-4: #FFEFF3;
    --mdh-red-5: #FFE9EE;
    --mdh-red-10: #FFD7E1;
    --mdh-red-20: #FFBECA;
    --mdh-red-30: #FF9AAA;
    --mdh-red-35: #FD7C90;
    --mdh-red-40: #FF5A76;
    --mdh-red-50: #EC0046;
    --mdh-red-55: #D8003F;
    --mdh-red-60: #C9003A;
    --mdh-red-70: #AD0030;
    --mdh-red-80: #880024;
    --mdh-red-85: #6B1020;
    --mdh-red-90: #5D0016;
    --mdh-red-95: #4B000F;
    --mdh-red-99: #4B0010;
    --mdh-red-muted-1: #FEFBFB;
    --mdh-red-muted-2: #FEF8F8;
    --mdh-red-muted-3: #FDF3F3;
    --mdh-red-muted-4: #FDF0F0;
    --mdh-red-muted-5: #FCEAEA;
    --mdh-red-muted-10: #FBDAD9;
    --mdh-red-muted-20: #F8C1C2;
    --mdh-red-muted-30: #F5A0A2;
    --mdh-red-muted-35: #F18589;
    --mdh-red-muted-40: #F16772;
    --mdh-red-muted-50: #DB364F;
    --mdh-red-muted-55: #C73046;
    --mdh-red-muted-60: #BA2C41;
    --mdh-red-muted-70: #A02638;
    --mdh-red-muted-80: #7D1D2A;
    --mdh-red-muted-85: #6B1120;
    --mdh-red-muted-90: #55111A;
    --mdh-red-muted-95: #440C13;
    --mdh-red-muted-99: #430C13;
    --mdh-blue-muted-1: #F9FCFD;
    --mdh-blue-muted-2: #F6FAFD;
    --mdh-blue-muted-3: #F0F7FB;
    --mdh-blue-muted-4: #EAF3FA;
    --mdh-blue-muted-5: #E4F0F8;
    --mdh-blue-muted-10: #CEE4F4;
    --mdh-blue-muted-20: #A8CFEC;
    --mdh-blue-muted-30: #75B4E1;
    --mdh-blue-muted-35: #58A7DF;
    --mdh-blue-muted-40: #4698D3;
    --mdh-blue-muted-50: #187AC1;
    --mdh-blue-muted-55: #0A6FB9;
    --mdh-blue-muted-60: #005DA6;
    --mdh-blue-muted-70: #004483;
    --mdh-blue-muted-80: #002E5B;
    --mdh-blue-muted-85: #042547;
    --mdh-blue-muted-90: #001D3B;
    --mdh-blue-muted-95: #001B38;
    --mdh-blue-muted-99: #001224;
    --mdh-red-orange-1: #FFFBFA;
    --mdh-red-orange-2: #FFF8F6;
    --mdh-red-orange-3: #FFF2EE;
    --mdh-red-orange-4: #FFEFEB;
    --mdh-red-orange-5: #FFEAE3;
    --mdh-red-orange-10: #FFD9CE;
    --mdh-red-orange-20: #FFC0AE;
    --mdh-red-orange-30: #FF9E82;
    --mdh-red-orange-35: #FE7F5B;
    --mdh-red-orange-40: #FF6030;
    --mdh-red-orange-50: #DC3800;
    --mdh-red-orange-55: #C63800;
    --mdh-red-orange-60: #B93400;
    --mdh-red-orange-70: #9E2B00;
    --mdh-red-orange-80: #7D2000;
    --mdh-red-orange-85: #631E08;
    --mdh-red-orange-90: #551300;
    --mdh-red-orange-95: #430D00;
    --mdh-red-orange-99: #420D00;
    --mdh-orange-1: #FFFBF8;
    --mdh-orange-2: #FFF8F2;
    --mdh-orange-3: #FFF3E8;
    --mdh-orange-4: #FFF0E2;
    --mdh-orange-5: #FFEBD8;
    --mdh-orange-10: #FFDBBC;
    --mdh-orange-20: #FFC294;
    --mdh-orange-30: #FFA05D;
    --mdh-orange-35: #FE831A;
    --mdh-orange-40: #EC7200;
    --mdh-orange-50: #C45500;
    --mdh-orange-55: #B44D00;
    --mdh-orange-60: #A74700;
    --mdh-orange-70: #8F3C00;
    --mdh-orange-80: #6F2D00;
    --mdh-orange-85: #592607;
    --mdh-orange-90: #4C1C00;
    --mdh-orange-95: #3D1500;
    --mdh-orange-99: #3D1600;
    --mdh-amber-1: #FFFCF7;
    --mdh-amber-2: #FEF9ED;
    --mdh-amber-3: #FFF4DE;
    --mdh-amber-4: #FFF2D9;
    --mdh-amber-5: #FFECC9;
    --mdh-amber-10: #FFDDA1;
    --mdh-amber-20: #FFC568;
    --mdh-amber-30: #F8A60B;
    --mdh-amber-35: #E39404;
    --mdh-amber-40: #CF8407;
    --mdh-amber-50: #AA6704;
    --mdh-amber-55: #9B5D02;
    --mdh-amber-60: #905603;
    --mdh-amber-70: #7B4903;
    --mdh-amber-80: #5F3803;
    --mdh-amber-85: #4C2E09;
    --mdh-amber-90: #402402;
    --mdh-amber-95: #321B02;
    --mdh-amber-99: #311B02;
    --mdh-gold-1: #FFFCEF;
    --mdh-gold-2: #FEFAE3;
    --mdh-gold-3: #FFF6CC;
    --mdh-gold-4: #FEF3BE;
    --mdh-gold-5: #FFEFA7;
    --mdh-gold-10: #FFE05F;
    --mdh-gold-20: #F5CB0B;
    --mdh-gold-30: #DCB30B;
    --mdh-gold-35: #C8A109;
    --mdh-gold-40: #B59007;
    --mdh-gold-50: #937204;
    --mdh-gold-55: #866702;
    --mdh-gold-60: #7D6003;
    --mdh-gold-70: #6A5103;
    --mdh-gold-80: #533F04;
    --mdh-gold-85: #433306;
    --mdh-gold-90: #372902;
    --mdh-gold-95: #2B1F01;
    --mdh-gold-99: #291E02;
    --mdh-yellow-1: #FCFDEF;
    --mdh-yellow-2: #FAFBE4;
    --mdh-yellow-3: #F7F8CD;
    --mdh-yellow-4: #F5F6C0;
    --mdh-yellow-5: #F3F3AA;
    --mdh-yellow-10: #EAE767;
    --mdh-yellow-20: #D9D40B;
    --mdh-yellow-30: #C0BC0B;
    --mdh-yellow-35: #ADA90D;
    --mdh-yellow-40: #9C9907;
    --mdh-yellow-50: #7C7904;
    --mdh-yellow-55: #726F03;
    --mdh-yellow-60: #696703;
    --mdh-yellow-70: #5A5703;
    --mdh-yellow-80: #454403;
    --mdh-yellow-85: #383709;
    --mdh-yellow-90: #2E2C02;
    --mdh-yellow-95: #232201;
    --mdh-yellow-99: #232202;
    --mdh-chartreuse-1: #F8FCEF;
    --mdh-chartreuse-2: #F4FBE5;
    --mdh-chartreuse-3: #EFFCD3;
    --mdh-chartreuse-4: #EBFBC8;
    --mdh-chartreuse-5: #E2F7B2;
    --mdh-chartreuse-10: #CEEE78;
    --mdh-chartreuse-20: #B6DE0B;
    --mdh-chartreuse-30: #A0C40A;
    --mdh-chartreuse-35: #90B106;
    --mdh-chartreuse-40: #82A007;
    --mdh-chartreuse-50: #677F04;
    --mdh-chartreuse-55: #5D7402;
    --mdh-chartreuse-60: #576C03;
    --mdh-chartreuse-70: #4A5C03;
    --mdh-chartreuse-80: #384603;
    --mdh-chartreuse-85: #2D3903;
    --mdh-chartreuse-90: #242E02;
    --mdh-chartreuse-95: #1C2401;
    --mdh-chartreuse-99: #1C2402;
    --mdh-lime-1: #F5FCF1;
    --mdh-lime-2: #F0FCE8;
    --mdh-lime-3: #E7FED8;
    --mdh-lime-4: #DDFACB;
    --mdh-lime-5: #D3F9B9;
    --mdh-lime-10: #B6F288;
    --mdh-lime-20: #88E60B;
    --mdh-lime-30: #78CD0A;
    --mdh-lime-35: #6BB803;
    --mdh-lime-40: #61A606;
    --mdh-lime-50: #4C8404;
    --mdh-lime-55: #457903;
    --mdh-lime-60: #3F7003;
    --mdh-lime-70: #366003;
    --mdh-lime-80: #294A03;
    --mdh-lime-85: #203B04;
    --mdh-lime-90: #182F02;
    --mdh-lime-95: #132602;
    --mdh-lime-99: #132502;
    --mdh-green-1: #F4FEF3;
    --mdh-green-2: #ECFEEB;
    --mdh-green-3: #DDFDDB;
    --mdh-green-4: #D5FDD3;
    --mdh-green-5: #C6FCC4;
    --mdh-green-10: #9DF69B;
    --mdh-green-20: #0DEF35;
    --mdh-green-30: #0DD42F;
    --mdh-green-35: #11BF2B;
    --mdh-green-40: #08AC24;
    --mdh-green-50: #058A1B;
    --mdh-green-55: #047E18;
    --mdh-green-60: #027414;
    --mdh-green-70: #046311;
    --mdh-green-80: #044D0C;
    --mdh-green-85: #043F09;
    --mdh-green-90: #033306;
    --mdh-green-95: #012803;
    --mdh-green-99: #032805;
    --mdh-emerald-1: #F2FEF6;
    --mdh-emerald-2: #E9FEF0;
    --mdh-emerald-3: #D4FEE3;
    --mdh-emerald-4: #C8FEDC;
    --mdh-emerald-5: #B6FED1;
    --mdh-emerald-10: #7EF9B3;
    --mdh-emerald-20: #0EEC91;
    --mdh-emerald-30: #0DD180;
    --mdh-emerald-35: #06BE73;
    --mdh-emerald-40: #08AA67;
    --mdh-emerald-50: #058851;
    --mdh-emerald-55: #047C4A;
    --mdh-emerald-60: #037344;
    --mdh-emerald-70: #046239;
    --mdh-emerald-80: #044C2C;
    --mdh-emerald-85: #053E23;
    --mdh-emerald-90: #03321B;
    --mdh-emerald-95: #012714;
    --mdh-emerald-99: #032715;
    --mdh-teal-1: #F0FEFB;
    --mdh-teal-2: #E5FEF8;
    --mdh-teal-3: #CDFEF3;
    --mdh-teal-4: #C0FEF1;
    --mdh-teal-5: #AAFEED;
    --mdh-teal-10: #41FBDF;
    --mdh-teal-20: #0EE8CC;
    --mdh-teal-30: #0DCEB4;
    --mdh-teal-35: #04B9A2;
    --mdh-teal-40: #08A792;
    --mdh-teal-50: #058574;
    --mdh-teal-55: #047A6A;
    --mdh-teal-60: #037162;
    --mdh-teal-70: #046053;
    --mdh-teal-80: #044A40;
    --mdh-teal-85: #0A3C34;
    --mdh-teal-90: #03312A;
    --mdh-teal-95: #012620;
    --mdh-teal-99: #032620;
    --mdh-cyan-1: #F6FDFF;
    --mdh-cyan-2: #EDFBFE;
    --mdh-cyan-3: #E0F9FF;
    --mdh-cyan-4: #DAF8FF;
    --mdh-cyan-5: #CAF6FE;
    --mdh-cyan-10: #9BEEFF;
    --mdh-cyan-20: #2DE2FF;
    --mdh-cyan-30: #0DC9E3;
    --mdh-cyan-35: #18B5CC;
    --mdh-cyan-40: #08A3B9;
    --mdh-cyan-50: #058294;
    --mdh-cyan-55: #047788;
    --mdh-cyan-60: #036E7D;
    --mdh-cyan-70: #045E6B;
    --mdh-cyan-80: #044852;
    --mdh-cyan-85: #0B3B42;
    --mdh-cyan-90: #033037;
    --mdh-cyan-95: #01252B;
    --mdh-cyan-99: #03252B;
    --mdh-azure-1: #F8FCFF;
    --mdh-azure-2: #F4FAFF;
    --mdh-azure-3: #EDF6FF;
    --mdh-azure-4: #E8F4FF;
    --mdh-azure-5: #E0F1FF;
    --mdh-azure-10: #C7E5FF;
    --mdh-azure-20: #A2D4FF;
    --mdh-azure-30: #6DBDFF;
    --mdh-azure-35: #4CAAF4;
    --mdh-azure-40: #419ADF;
    --mdh-azure-50: #327BB3;
    --mdh-azure-55: #2D70A4;
    --mdh-azure-60: #245E8A;
    --mdh-azure-70: #1C4D73;
    --mdh-azure-80: #164060;
    --mdh-azure-85: #0A3555;
    --mdh-azure-90: #0E2C44;
    --mdh-azure-95: #092336;
    --mdh-azure-99: #0B2335;












    /* Gradients */
    --mdh-gradient-alpine-overlook-dark: linear-gradient(180deg, rgba(12, 100, 235), rgba(76, 152, 207));
    --mdh-gradient-alpine-overlook: linear-gradient(180deg, rgba(117, 180, 225), rgba(246, 250, 253));
    --mdh-gradient-cold-front-dark: linear-gradient(180deg, rgba(143, 130, 246), rgba(230, 107, 111));
    --mdh-gradient-cold-front: linear-gradient(180deg, rgba(244, 215, 255), rgba(252, 217, 218));
    --mdh-gradient-early-bird-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(143, 130, 246));
    --mdh-gradient-early-bird: linear-gradient(180deg, rgba(199, 196, 255), rgba(255, 245, 156));
    --mdh-gradient-evergreen-petrichor-dark: linear-gradient(180deg, rgba(34, 159, 185), rgba(0, 123, 108));
    --mdh-gradient-evergreen-petrichor: linear-gradient(180deg, rgba(137, 218, 183), rgba(255, 248, 184));
    --mdh-gradient-high-noon-dark: linear-gradient(180deg, rgba(236, 108, 5), rgba(206, 44, 50));
    --mdh-gradient-high-noon: linear-gradient(180deg, rgba(255, 242, 128), rgba(255, 146, 40));
    --mdh-gradient-midnight-moon-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(102, 83, 240));
    --mdh-gradient-midnight-moon: linear-gradient(180deg, rgba(169, 163, 254), rgba(222, 221, 255));
    --mdh-gradient-open-horizon-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(207, 94, 255));
    --mdh-gradient-open-horizon: linear-gradient(180deg, rgba(117, 180, 225), rgba(252, 217, 218));
    --mdh-gradient-summer-solstice-dark: linear-gradient(180deg, rgba(255, 146, 41), rgba(143, 130, 246));
    --mdh-gradient-summer-solstice: linear-gradient(180deg, rgba(255, 146, 40), rgba(199, 196, 255));
    --mdh-gradient-summit-sunset-dark: linear-gradient(180deg, rgba(207, 94, 255), rgba(230, 107, 111));
    --mdh-gradient-summit-sunset: linear-gradient(180deg, rgba(244, 215, 255), rgba(246, 145, 148));
    --mdh-gradient-tropical-mist-dark: linear-gradient(180deg, rgba(76, 145, 248), rgba(35, 164, 130));
    --mdh-gradient-tropical-mist: linear-gradient(180deg, rgba(117, 180, 225), rgba(137, 218, 183));
    ${legacyCeColors}
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

    /* Signal colors: "-mark" = chart marks (bars/pins/dots); "-text" = the signal as
       foreground, since CVD-optimized mark colors can be too weak as text. Light keeps
       one canonical hex per signal, picked from the values components hardcoded — where
       components disagreed (GlucoseStats' #d36540/#8287bb), they shift to it; dark
       overrides. */
    '--mdhui-color-glucose-mark': '#c4291c',
    '--mdhui-color-glucose-text': '#c4291c',
    '--mdhui-color-heart-rate-mark': '#e35c33',
    '--mdhui-color-heart-rate-text': '#e35c33',
    '--mdhui-color-activity-mark': '#f5b722',
    '--mdhui-color-activity-text': '#f5b722',
    '--mdhui-color-sleep-mark': '#7b88c6',
    '--mdhui-color-sleep-text': '#7b88c6',
    // No shipped hex to mirror — this signal is new, so it comes from the ramp. Grade 55
    // is the lightest teal that still clears AA on the 1-5 backgrounds.
    '--mdhui-color-air-quality-mark': 'var(--mdh-teal-55)',

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

// Dark values are palette references so pairings inherit the ramp's audited WCAG+APCA
// guarantees — validate changes with `npm run audit:colors`.
export const darkColorStyle: CSSProperties = {
    '--mdhui-background-color-0': 'var(--mdh-grey-85)',
    '--mdhui-background-color-1': 'var(--mdh-grey-95)',
    '--mdhui-background-color-2': 'var(--mdh-grey-99)',
    '--mdhui-background-color-highest-contrast': 'var(--mdh-grey-99)',

    '--mdhui-border-color-0': 'var(--mdh-grey-70)',
    '--mdhui-border-color-1': 'var(--mdh-grey-70)',
    '--mdhui-border-color-2': 'var(--mdh-grey-60)',

    '--mdhui-text-color-0': 'var(--mdh-grey-0)',
    '--mdhui-text-color-1': 'var(--mdh-grey-1)',
    '--mdhui-text-color-2': 'var(--mdh-grey-10)',
    '--mdhui-text-color-3': 'var(--mdh-grey-30)',
    '--mdhui-text-color-4': 'var(--mdh-grey-40)',

    '--mdhui-color-glucose-mark': 'var(--mdh-red-orange-40)',
    // grade 35 rather than the mark's 40: as foreground on the grey-85 cards the 40 lands
    // at Lc 43, under what APCA wants for text, while 35 reaches Lc 51.
    '--mdhui-color-glucose-text': 'var(--mdh-red-orange-35)',
    '--mdhui-color-heart-rate-mark': 'var(--mdh-red-orange-40)',
    // grade 35 like glucose-text: the mark's 40 falls just under the Lc 45 text floor on cards.
    '--mdhui-color-heart-rate-text': 'var(--mdh-red-orange-35)',
    '--mdhui-color-activity-mark': 'var(--mdh-gold-20)',
    '--mdhui-color-activity-text': 'var(--mdh-gold-20)',
    '--mdhui-color-sleep-mark': 'var(--mdh-indigo-40)',
    '--mdhui-color-sleep-text': 'var(--mdh-indigo-35)',
    '--mdhui-color-air-quality-mark': 'var(--mdh-teal-35)',

    // Accent base tokens keep the light-mode fill grades (fills carry white text);
    // "-text" = foreground-tuned grades for links/status text.
    '--mdhui-color-primary': 'var(--mdh-blue-50)',
    '--mdhui-color-success': 'var(--mdh-green-50)',
    '--mdhui-color-warning': 'var(--mdh-red-orange-50)',
    '--mdhui-color-danger': 'var(--mdh-red-50)',
    '--mdhui-color-primary-text': 'var(--mdh-blue-30)',
    '--mdhui-color-success-text': 'var(--mdh-green-35)',
    '--mdhui-color-warning-text': 'var(--mdh-orange-35)',
    // red-35 on the grade-85 cards is gap 50 — band-licensed AA text with real chroma;
    // the 35/85 rows exist for exactly this pairing (like 55 exists for light backgrounds).
    '--mdhui-color-danger-text': 'var(--mdh-red-35)',

    '--mdhui-box-shadow-color-0': 'var(--mdh-grey-80)',
    '--mdhui-box-shadow-color-1': 'var(--mdh-grey-60)',

    '--mdhui-box-shadow-0': '0px 0px 1px 1px var(--mdhui-border-color-0)',
    '--mdhui-box-shadow-1': '0px 0px 1px 1px var(--mdhui-border-color-0)',

    '--mdhui-overlay-gradient': 'linear-gradient(to left, rgba(0, 0, 0, 0) 0%, rgba(0, 11, 15, 0.2) 100%) !important',
    color: 'var(--mdh-grey-5)'
} as CSSProperties;

export const darkColorScheme = css({
    ':root': darkColorStyle
} as CSSObject);

export const global = css`
a {
    color: var(--mdhui-color-primary-text);
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