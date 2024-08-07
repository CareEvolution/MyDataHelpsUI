import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers";
import { Action, LoadingIndicator, ProgressRing } from "../../presentational";
import React, { useState } from "react";
import { previewHeartEssentialData } from "./HeartEssentialEight.previewdata";
import "./HeartEssentialEight.css";
import iconCholesterol from "./controlcholesterol.svg";
import iconEatWell from "./eatwell.svg";
import iconGetActive from "./getactive.svg";
import iconLoseWeight from "./loseweight.svg";
import iconManageBloodPressure from "./managebloodpressure.svg";
import iconReduceBloodSugar from "./reducebloodsugar.svg";
import iconSleep from "./sleep.svg";
import iconStopSmoking from "./stopsmoking.svg";

export type HeartEssentialEightScores =
  | "Activity"
  | "BloodPressure"
  | "BloodSugar"
  | "BMI"
  | "Cholesterol"
  | "Diet"
  | "Nicotine"
  | "Sleep";

export interface HeartEssentialEightProps {
  previewState?: "Default" | "NoData";
  customFieldDictionary: Record<HeartEssentialEightScores, string> & {
    [key: string]: string;
  };
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function (props: HeartEssentialEightProps) {
  const { customFieldDictionary } = props;
  let [score, setScore] = React.useState<number>();
  let [achievementMap, setAchievementMap] =
    useState<Record<HeartEssentialEightScores, boolean>>();

  async function initialize() {
    if (props.previewState) {
      if (["Default", "NoData"].includes(props.previewState ?? "")) {
        const data =
          props.previewState === "Default" ? previewHeartEssentialData : {};
        loadScoresFromCustomFieldData(data);
      } else {
        MyDataHelps.getParticipantInfo().then((participantInfo) => {
          loadScoresFromCustomFieldData(participantInfo.customFields);
        });
      }
    }
  }

  function loadScoresFromCustomFieldData(
    customFieldData: Record<string, string>
  ) {
    let newScore: number = 0;
    let newAchievementMap = {} as Record<HeartEssentialEightScores, boolean>;

    for (const key in customFieldDictionary) {
      if (customFieldDictionary[key]) {
        let surveyScore = customFieldData[customFieldDictionary[key]];
        let numericScore = parseInt(surveyScore);
        if (!Number.isNaN(numericScore)) {
          newScore += numericScore;
          newAchievementMap[key as HeartEssentialEightScores] =
            numericScore >= 100;
        } else {
            newAchievementMap[key as HeartEssentialEightScores] = false;
        }
      }
    }

    if (newScore > 0){
        newScore = (newScore / 800) * 100;
    }

    setScore(parseFloat(newScore.toFixed(1)));
    setAchievementMap(newAchievementMap);
  }

  function generateAchievementMap(
    didAchieve: boolean,
    newAchievementMap: Record<HeartEssentialEightScores, boolean>
  ) {
    const map = newAchievementMap as Record<string, boolean>;
    const achievementList: any[] = [];
    for (const key in map) {
      const vv = map[key];
      if (vv === didAchieve) {
        const title = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
          return str.toUpperCase();
        });
        let icon: any;
        let url: string;
        const circleClasses: string[] = ["circle"];
        switch (key) {
          case "Activity":
            icon = iconGetActive;
            circleClasses.push("activity");
            break;
          case "BloodPressure":
            icon = iconManageBloodPressure;
            circleClasses.push("bloodPressure");
            break;
          case "BloodSugar":
            icon = iconReduceBloodSugar;
            circleClasses.push("bloodSugar");
            break;
          case "BMI":
            icon = iconLoseWeight;
            circleClasses.push("bmi");
            break;
          case "Cholesterol":
            icon = iconCholesterol;
            circleClasses.push("cholesterol");
            break;
          case "Diet":
            icon = iconEatWell;
            circleClasses.push("diet");
            break;
          case "Nicotine":
            icon = iconStopSmoking;
            circleClasses.push("nicotine");
            break;
        case "Sleep":
            icon = iconSleep;
            circleClasses.push("sleep");
            break;
          default:
            icon = null;
        }

        const achievementIcon = (
          <div className={circleClasses.join(" ")}>
            <img src={icon} />
          </div>
        );

        const achievement = (
          <Action key={`achievement-${key}`}
            title={title}
            titleIcon={achievementIcon}
            onClick={() => MyDataHelps.openExternalUrl(url)}
          />
        );
        achievementList.push(achievement);
      }
    }

    return achievementList;
  }

  useInitializeView(initialize, [], [props.previewState]);

  return (
    <>
        {/* <LoadingIndicator /> */}
      {/* {score === undefined && <LoadingIndicator />} */}
        <div className="mdhui-heart-e8-container">
          <div className="mdhui-heart-e8-score-container">
            <ProgressRing
              percentCompleted={score}
              color="rgb(193, 14, 33)"
              children={
                <div className="scoreContainer">
                  <div className="score">{score}</div>
                  <div className="scoreSubText">out of 100</div>
                </div>
              }
              animate={true}
            />
          </div>
          {achievementMap && <div className="mdhui-heart-e8-feedback">
            <div className="achievementSection"><div className="bulletPoint improve" /><h3>IMPROVE</h3></div>
            <div className="achievementSection">{generateAchievementMap(false, achievementMap)}</div>
            <div className="achievementSection"><div className="bulletPoint celebrate" /><h3>CELEBRATE</h3></div>
            <div className="achievementSection">{generateAchievementMap(true, achievementMap)}</div>
          </div>} 
        </div>
      
    </>
  );
}
