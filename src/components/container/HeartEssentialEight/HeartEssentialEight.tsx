import MyDataHelps from "@careevolution/mydatahelps-js";
import { useInitializeView } from "../../../helpers";
import { Action, LoadingIndicator, ProgressRing, Card } from "../../presentational";
import React, { useState } from "react";
import { previewHeartEssentialData } from "./HeartEssentialEight.previewdata";
import "./HeartEssentialEight.css";
import iconCholesterol from "./icons/controlcholesterol.svg";
import iconEatWell from "./icons/eatwell.svg";
import iconGetActive from "./icons/getactive.svg";
import iconLoseWeight from "./icons/loseweight.svg";
import iconManageBloodPressure from "./icons/managebloodpressure.svg";
import iconReduceBloodSugar from "./icons/reducebloodsugar.svg";
import iconSleep from "./icons/sleep.svg";
import iconStopSmoking from "./icons/stopsmoking.svg";

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
  const customRingStyle: React.CSSProperties = {
    backgroundColor: "lightblue",
    height: "100px",
    width: "100px",
  };

  let [score, setScore] = React.useState<number>();
  let [achievementMap, setAchievementMap] =
    useState<Record<HeartEssentialEightScores, boolean>>();

  async function initialize() {
    if (props.previewState) {
      if (["Default", "NoData"].includes(props.previewState ?? "")) {
        const data =
          props.previewState === "Default" ? previewHeartEssentialData : {};
        loadScoresFromCustomFieldData(data);
      }
    } else {
      MyDataHelps.getParticipantInfo().then((participantInfo) => {
        loadScoresFromCustomFieldData(participantInfo.customFields);
      });
    }
  }

  function loadScoresFromCustomFieldData(
    customFieldData: Record<string, string>
  ) {
    let newScore: number = 0;
    let newAchievementMap = {} as Record<HeartEssentialEightScores, boolean>;

    for (const key in props.customFieldDictionary) {
      if (props.customFieldDictionary[key]) {
        let surveyScore = customFieldData[props.customFieldDictionary[key]];
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

    if (newScore > 0) {
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
        let subtitle: any;
        let url: string;
        const circleClasses: string[] = ["circle"];
        switch (key) {
          case "Activity":
            icon = iconGetActive;
            subtitle="Display Active Time from Fitbit / Garmin.  Probably AppleExerciseTime for Apple Health. Or manual entry";
            circleClasses.push("activity");
            break;
          case "BloodPressure":
            icon = iconManageBloodPressure;
            subtitle="Display most recent value from EHR, or manual entry";
            circleClasses.push("bloodPressure");
            break;
          case "BloodSugar":
            icon = iconReduceBloodSugar;
            subtitle="Display Glucose numbers from Dexcom, or manual entry";
            circleClasses.push("bloodSugar");
            break;
          case "BMI":
            icon = iconLoseWeight;
            subtitle="Display BMI calculated from survey data"
            circleClasses.push("bmi");
            break;
          case "Cholesterol":
            icon = iconCholesterol;
            subtitle="Display most recent value from EHR, or manual entry";
            circleClasses.push("cholesterol");
            break;
          case "Diet":
            icon = iconEatWell;
            subtitle="Eat more whole foods / Cut back on candy / Whatever the key points are from the survey";
            circleClasses.push("diet");
            break;
          case "Nicotine":
            icon = iconStopSmoking;
            subtitle="Stop smoking / Congratulations on { 5+ years/never smoking }"
            circleClasses.push("nicotine");
            break;
          case "Sleep":
            icon = iconSleep;
            subtitle="Display value from Apple Health/Fitbit/Garmin, or manual entry"
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
            <Action
              key={`achievement-${key}`}
              title={title}
              subtitle={subtitle}
              icon={achievementIcon}
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
      {score === undefined && <LoadingIndicator />}
      {score !== undefined && (
      <>
        <Card>
          <div className="mdhui-heart-e8-score-container">
            <h3 className="le8-header">Heart Health Score</h3>
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
        </Card>
        {achievementMap && (
        <Card>
          <div className="mdhui-heart-e8-achievement-container">
            <h3 className="le8-header">
              Improve
            </h3>
            <div className="achievementActionList">
              {generateAchievementMap(false, achievementMap)}
            </div>
            <h3 className="le8-header">
              Celebrate
            </h3>
            <div className="achievementActionList">
              {generateAchievementMap(true, achievementMap)}
            </div>
          </div>
        </Card>
        )}
      </>
      )}
    </>
  );
}
