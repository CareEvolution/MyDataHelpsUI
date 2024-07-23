import { StoryObj, Meta } from "@storybook/react";
import HtmlStep from "./HtmlStep";

const meta: Meta<typeof HtmlStep> = {
    title: "SurveyStep/HtmlStep",
    component: HtmlStep,
    parameters: {
        layout: "fullscreen",
    },
    args: {
        styles: {},
    },
};
export default meta;


export const HtmlStepEmpty: StoryObj<typeof HtmlStep> = {};

export const HtmlStepElementStyles: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<h1>h1</h1>
<h2>h2</h2>
<h3>h3</h3>
<h4>h4</h4>
<p>paragraph</p>
<p>paragraph<br />with line break</p>
<a href="#">anchor</a>
<button>button (completes step)</button>
<ul>
        <li>ulist item 1</li>
        <li>ulist item 2</li>
        <ul>
            <li>ulist item 3.1</li>
            <li>ulist item 3.2</li>
        </ul>
</ul>
<ol>
        <li>olist item 1</li>
        <li>olist item 2</li>
        <ol>
            <li>olist item 3.1</li>
            <li>olist item 3.2</
        </ol>
</ol>
`,
    },
};

export const HtmlStepDefaultClassStyles: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<div class="title">title</div>
<p>text</p>
<button>Next</button>
<button disabled>Disabled Next</button>
<div class="spinner"></div>
`,
    },
};

export const HtmlStepCustomClassStyles: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<div class="title">title</div>
<p>text</p>
<button>NEXT</button>
<button disabled>DISABLED next</button>
`,
        styles: {
            titleFontSize: "3em",
            titleColor: "red",
            titleFontWeight: "bold",
            titleAlignment: "right",
            textFontSize: "0.5em",
            textAlignment: "left",
            textColor: "blue",
            textFontWeight: "bold",
            nextButtonTextColor: "green",
            nextButtonBackgroundColor: "black",
            nextButtonFontWeight: "bold",
            nextButtonLetterSpacing: "5px",
            nextButtonTextTransform: "lowercase",
            nextButtonBackgroundGradient: {
                direction: "TopToBottom",
                startColor: "black",
                endColor: "gray",
            },
        },
    }
};


export const QuestionStepDefaultStyles: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<div class="title">Question Step</div>
<p>This is a question step with one text answer.</p>
<input type="text" placeholder="Required"/>
<button>Next</button>
`,
        styles: {},
    }
};


export const FormStepDefaultStyles: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<div class="title">Form Step</div>
<p>This is a form step with the following answer types:</p>
<ul>
<li>Text</li>
<li>Date</li>
<li>Number</li>
<li>Dropdown</li>
<li>Text Area</li>
</ul>
<div class="form-item">
<label for="text">Text</label>
<input id="text" type="text" placeholder="Required"/>
</div>
<div class="form-item">
<label for="number">Number</label>
<input id="number" type="number" placeholder="Required"/>
</div>
<div class="form-item">
<label for="date">Date</label>
<input id="date" type="date" placeholder="Required"/>
</div>
<div class="form-item">
<label for="dropdown">Dropdown</label>
<select id="dropdown">
<option>Test</option>
<option>Test 2</option>
</select>
</div>
<div class="form-item">
<label for="textarea">Textarea</label>
<textarea id="textarea" placeholder="Required"></textarea>
</div>
</div>
<button>Next</button>
`,
        styles: {},
    }
};

export const HtmlStepDocumentOnload: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<div class="title">Participant Status</div>
<div class="spinner" id="spinner"></div>
<p id="statusText" style="visibility:hidden">
        <p>You have been enrolled for <span id="enrollmentDays">X</span> days.</p>
</p>
<script type="text/javascript">
MyDataHelps.setParticipantAccessToken({access_token: "unused", expires_in: 3600});
MyDataHelps.getParticipantInfo().then(function (participantInfo) {
    document.getElementById("enrollmentDays").innerText = participantInfo.customFields["enrollmentDays"];
    document.getElementById("statusText").style.visibility = "visible";
    document.getElementById("spinner").style.display = "none";
});
</script>
`,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        name: "getParticipantInfo",
                        url: "https://mydatahelps.org/api/v1/delegated/participant",
                    },
                    response: (url: any, opts: any, request: any) => {
                        return {
                            customFields: {
                                enrollmentDays: 15,
                            },
                        };
                    },
                    options: {
                        delay: 3000,
                    },
                },
            ],
        },
    },
};

export const HtmlStepWithJquery: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
<script src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
<script type="text/javascript">
function initialize() {
    $("#parentEl").html("<h2>jQuery is working</h2>");
}
</script>
<p id="parentEl"></p>
<script type="text/javascript">
initialize();
</script>
`
    }
};

export const HtmlStepBpi: StoryObj<typeof HtmlStep> = {
    args: {
        html: `
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"
            integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
            crossorigin="anonymous"></script>
    <script type="text/javascript">
 function is_touch_device() {
            return 'ontouchstart' in window || navigator.maxTouchPoints;
        };
 
       var setup = function(){
            var answers = [];
            var noChronicPain = false;
            var viewedBack = false;

            function select(element) {
                element.toggleClass("selected");
                if (element.hasClass("selected")) {
                    answers.push(element.attr("value"));
                } else {
                    var index = answers.indexOf(element.attr("value"));
                    answers.splice(index, 1);
                }
            }

            var event = "click";
            if (is_touch_device()) {
                event = "touchstart";
            }

            function hideError() {
                $(".error-message").hide();
            }

            $(".clickable-area").on(event, function () {
                select($(this));
                hideError();
            });

            $(".no-chronic-pain").on(event, function () {
                enableContinue();
                if ($(this).hasClass("selected")) {
                    noChronicPain = false;
                    $(this).removeClass("selected");
                } else {
                    noChronicPain = true;
                    $(this).addClass("selected");
                }
                hideError();
            })

            function flip() {
                enableContinue();
                if ($(".body-site-map-container").hasClass("flipped")) {
                    $(".body-site-map-container").removeClass("flipped");
                    $(".flip-to-front").hide();
                    $(".flip-to-back").show();
                } else {
                    $(".body-site-map-container").addClass("flipped");
                    $(".flip-to-front").show();
                    $(".flip-to-back").hide();
                }
            }

            $(".flip").on(event, flip);

            function enableContinue() {
                viewedBack = true;
                $(".next-button").html("Continue");
            }

            $(".next-button").click(function () {
                if (!viewedBack) {
                    flip();
                    enableContinue();
                }
                else {
                    if (noChronicPain && answers.length || !noChronicPain && !answers.length) {
                        $(".error-message").show();
                    } else {
                        var answer = answers.length ? answers.join(",") : "No Chronic Pain";
                        MyDataHelps.completeStep(answer);
                    }
                }
            });
        };

    </script>
    <style type="text/css">
        div, p, a, li, td
        {
            -webkit-text-size-adjust: none;
        }

        body
        {
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }

        .transform-container
        {
            width: 400px;
            height: 500px;
            position: relative;
            padding-bottom: 10px;
            perspective: 800px;
            perspective-origin: 200px 0px;
        }

        .body-site-map-container
        {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transform-style: preserve-3d;
            transition: transform 1s;
        }

            .body-site-map-container.flipped
            {
                transform: rotateY( 180deg );
            }

        .body-site-map
        {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            text-align: center;
            background: #FFF;
            backface-visibility: hidden;
            -webkit-backface-visibility: hidden;
        }

            .body-site-map.body-site-back
            {
                transform: translateZ(0px);
                transform: rotateY( 180deg );
	            z-index: 1;
            }

        .next-button
        {
            width: 180px;
            text-align: center;
            padding-top: 10px;
            padding-bottom: 10px;
            font-size: 16px;
            color: #2e6e9e;
            border-radius: 2px;
            border: solid 1px #2e6e9e;
            background: #FFF;
            cursor: pointer;
            margin-top: 0px;
            margin-bottom: 20px;
        }

        .clickable-area
        {
            position: absolute;
            background: none;
            opacity: .4;
            cursor: pointer;
            border-radius: 2px;
            height: 22px;
            transform: translateZ(1px);
          	z-index: 1;
        }

            .clickable-area.selected
            {
                background: #2e6e9e;
            }

	    
        .body-site-map.body-site-back .clickable-area
        {
            transform: translateZ(2px);
          	z-index: 1;
        }
        .body-site-map-container.flipped .body-site-map.body-site-front
        {
			pointer-events: none;
        }
        .body-site-map-container.flipped .body-site-map.body-site-back
        {
			z-index: 2;
        }

        .flip
        {
            position: absolute;
            left: 10px;
            top: 10px;
            padding: 10px;
            cursor: pointer;
            border: solid 1px #aaa;
            border-radius: 10px;
            box-shadow: inset 0px 0px 10px #aaa;
            transform: translateZ(0px);
            z-index: 1000;
        }

            .flip img
            {
                width: 50px;
            }

        .header
        {
            position: fixed;
            background: #eee;
            border-top: solid 5px #ffcf06;
            font-weight: bold;
            line-height: 30px;
            font-size: 18px;
            width: 400px;
            text-align: center;
            background: #032e60;
            color: #FFF;
            z-index: 2;
        }

        .intro
        {
            width: 400px;
            font-size: 1em;
            text-align: left;
            padding: 10px;
            padding-bottom: 0;
            box-sizing: border-box;
        }

        .no-chronic-pain
        {
            display: inline-block;
            border: solid 1px #333;
            padding: 5px;
            position: relative;
            padding-left: 27px;
            cursor: pointer;
            border-radius: 2px;
            font-weight: bold;
        }

            .no-chronic-pain .overlay
            {
                display: none;
            }

            .no-chronic-pain .box
            {
                border: solid 2px #333;
                border-radius: 1px;
                position: absolute;
                left: 6px;
                top: 6px;
                width: 10px;
                height: 10px;
            }

            .no-chronic-pain.selected .overlay
            {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: #2e6e9e;
                opacity: .4;
                display: block;
            }

        .legend-wrapper
        {
            position: relative;
        }

            .legend-wrapper .legend
            {
                position: absolute;
                left: 300px;
                top: 10px;
                border: solid 1px #666;
                padding: 5px;
                z-index: 1;
                font-size: 12px;
                font-weight: bold;
                border-radius: 2px;
                color: #666;
            }

        .error-message
        {
            color: red;
            padding-bottom: 10px;
            font-weight: bold;
            text-align: center;
            position: relative;
            z-index: 1000;
        }
    </style>

    <div class="intro">
      On the diagram, select <strong>the areas where you feel pain</strong>.
    </div>
  <br>
    <div class="legend-wrapper">
        <div class="legend">
            Rt = right<br />
            Lt = left
        </div>
    </div>
    <div style="position:relative;z-index:1000">
        <div class="flip flip-to-back"><img src="https://s3.amazonaws.com/rkstudio-customer-assets/oPIOIDS/flip-back.png" /></div>
        <div class="flip flip-to-front" style="display:none"><img src="https://s3.amazonaws.com/rkstudio-customer-assets/oPIOIDS/flip-front.png" /></div>
    </div>
    <div class="transform-container">
        <div class="body-site-map-container">
            <div class="body-site-map body-site-front">
                <img src="https://s3.amazonaws.com/rkstudio-customer-assets/oPIOIDS/bodymap-front.png" />
                <div class="clickable-area" value="Face" style="left: 189px; top: 22px; width: 57px;"></div>
                <div class="clickable-area" value="Rt jaw" style="left:128px;top:51px;width:62px;"></div>
                <div class="clickable-area" value="Lt jaw" style="left:200px;top:51px;width:62px;"></div>
                <div class="clickable-area" value="Rt chest/breast" style="left:129px;top:95px;width:64px;height:48px"></div>
                <div class="clickable-area" value="Lt chest/breast" style="left:197px;top:95px;width:64px;height:48px"></div>
                <div class="clickable-area" value="Rt upper arm" style="left:43px;top:142px;width:105px;"></div>
                <div class="clickable-area" value="Lt upper arm" style="left:237px;top:145px;width:103px;"></div>
                <div class="clickable-area" value="Rt elbow" style="left:56px;top:169px;width:80px;"></div>
                <div class="clickable-area" value="Lt elbow" style="left:254px;top:174px;width:80px;"></div>
                <div class="clickable-area" value="Abdomen" style="left:130px;top:186px;width:88px;"></div>
                <div class="clickable-area" value="Rt lower arm" style="left:21px;top:196px;width:101px;"></div>
                <div class="clickable-area" value="Lt lower arm" style="left:272px;top:198px;width:101px;"></div>
                <div class="clickable-area" value="Rt wrist/hand" style="left:0px;top:223px;width:105px;"></div>
                <div class="clickable-area" value="Lt wrist/hand" style="left:295px;top:223px;width:105px;"></div>
                <div class="clickable-area" value="Pelvis" style="left:158px;top:222px;width:63px;"></div>
                <div class="clickable-area" value="Rt groin" style="left:128px;top:255px;width:75px;"></div>
                <div class="clickable-area" value="Lt groin" style="left:209px;top:254px;width:75px;"></div>
                <div class="clickable-area" value="Rt upper leg" style="left:90px;top:303px;width:100px;"></div>
                <div class="clickable-area" value="Lt upper leg" style="left:229px;top:293px;width:100px;"></div>
                <div class="clickable-area" value="Rt knee" style="left:125px;top:353px;width:70px;"></div>
                <div class="clickable-area" value="Lt knee" style="left:245px;top:330px;width:70px;"></div>
                <div class="clickable-area" value="Rt lower leg" style="left:95px;top:392px;width:98px;"></div>
                <div class="clickable-area" value="Lt lower leg" style="left:235px;top:374px;width:94px;"></div>
                <div class="clickable-area" value="Rt ankle/foot" style="left:93px;top:450px;width:102px;"></div>
                <div class="clickable-area" value="Lt ankle/foot" style="left:246px;top:438px;width:103px;"></div>
            </div>
            <div class="body-site-map body-site-back">
                <img src="https://s3.amazonaws.com/rkstudio-customer-assets/oPIOIDS/bodymap-back.png" />
                <div class="clickable-area" value="Head" style="left:114px;top:14px;width:98px;"></div>
                <div class="clickable-area" value="Neck" style="left:186px;top:66px;width:61px;"></div>
                <div class="clickable-area" value="Lt shoulder" style="left:71px;top:111px;width:97px;"></div>
                <div class="clickable-area" value="Rt shoulder" style="left:231px;top:103px;width:98px;"></div>
                <div class="clickable-area" value="Upper back" style="left:201px;top:126px;width:98px;"></div>
                <div class="clickable-area" value="Lower back" style="left:194px;top:196px;width:100px;"></div>
                <div class="clickable-area" value="Lt hip" style="left:125px;top:224px;width:62px;"></div>
                <div class="clickable-area" value="Rt hip" style="left:218px;top:223px;width:62px;"></div>
                <div class="clickable-area" value="Lt buttocks" style="left:114px;top:255px;width:92px;"></div>
                <div class="clickable-area" value="Rt buttocks" style="left:220px;top:252px;width:94px;"></div>
            </div>
        </div>
    </div>
    <div class="intro error-message" style="display:none">Please select either 'No Chronic Pain' OR one of the body areas.</div>
    <div style="width:400px;text-align:center;position:relative;z-index:1000">
        <button class="next-button">View Other Side</button>
    </div>
    <script type="text/javascript">
      setup();
   </script>
`,
    },
};
