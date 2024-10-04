import { tool } from "@langchain/core/tools";
import { z } from "zod";
import MyDataHelps, { DeviceDataV2AggregateQuery, StringMap } from "@careevolution/mydatahelps-js";
import { queryDailyData, getAllDailyDataTypes } from "../query-daily-data";
import { getNewsFeedPage } from "../news-feed/data";

const deviceDataV2QuerySchema = z.object({
  namespace: z.enum(["Fitbit", "AppleHealth", "Garmin", "Dexcom", "HealthConnect"])
    .describe("The namespace of the device data, representing the manufacturer of the devices used to collect the data."),

  type: z.string().describe("The device data type is specific to the namespace. Example data types for AppleHealth are Steps, Heart Rate."),

  observedAfter: z.string().optional()
    .describe(`The start of the date range for the query. This is a datetime in the participant's local timezone, passed without the timezone offset.
      This is exclusive. For example, if you want to query data for 11/26/2024, you would pass in "observedAfter": "2024-11-26T00:00:00". An event
      that happened at 11/26/2024 00:00:00 would not be included in the results.`),

  observedBefore: z.string().optional()
    .describe(`The end of the date range for the query. This is a datetime in the participant's local timezone, passed without the timezone offset.
      This is exclusive. For example, if you want to query data for up to 11/26/2024, you would pass in "observedBefore": "2024-11-26T00:00:00". An event
      that happened at 11/26/2024 00:00:00 would not be included in the results.`),

  dataSource: z.object({
    sourceName: z.string().optional().describe(`The name of the device that the data is coming from. Examples: "Oura", "Mike's iPhone".
          You can prompt the user for the device name if it is unclear what that is from the user's question.`),
    sourceIdentifier: z.string().optional()
      .describe(`The identifier of the device that the data is coming from. Examples: "com.ouraring.oura", "com.apple.health.E0BCE94D-0698-4E79-951C-A98A07D698B0".`),
    sourceProductType: z.string().optional().describe(`The product type of the device that the data is coming from. Examples: "iPhone15,3".`),
    sourceOperatingSystemVersion: z.string().optional().describe(`The operating system version of the device that the data is coming from. Examples: "17.6.1".`)
  }).optional()
    .describe(`These can be used to restrict the returned results to data coming from a specific device only.`),

  properties: z.record(z.string(), z.string()).optional()
    .describe('Filters to apply to the properties of the data points.')
});

export const PersistParticipantInfoTool = tool(
  async (input): Promise<string> => {
    const response = await MyDataHelps.persistParticipantInfo(input.demographics, input.customFields as StringMap);
    return JSON.stringify(response);
  },
  {
    name: "persistParticipantInfo",
    description: "Can be used to save data about the current participant, including dynamic information in the participant's custom fields.",
    schema: z.object({
      demographics: z.object({
        email: z.string().optional().describe("The email address of the participant."),
        mobilePhone: z.string().optional().describe("The mobile phone number of the participant."),
        firstName: z.string().optional().describe("The first name of the participant."),
        middleName: z.string().optional().describe("The middle name of the participant."),
        lastName: z.string().optional().describe("The last name of the participant."),
        dateOfBirth: z.string().optional().describe("The date of birth of the participant."),
        gender: z.string().optional().describe("The gender of the participant."),
        preferredLanguage: z.string().optional().describe("The preferred language of the participant."),
        street1: z.string().optional().describe("The first line of the participant's street address."),
        street2: z.string().optional().describe("The second line of the participant's street address."),
        city: z.string().optional().describe("The city of the participant."),
        state: z.string().optional().describe("The state of the participant."),
        postalCode: z.string().optional().describe("The postal code of the participant."),
        unsubscribedFromEmails: z.string().optional().describe("Whether the participant is unsubscribed from email messages."),
        unsubscribedFromSms: z.string().optional().describe("Whether the participant is unsubscribed from SMS messages.")
      }).optional().describe("Demographic information about the participant."),
      customFields: z.record(z.string(), z.string()).optional().describe("Custom fields where dynamic information can be saved for the participant.")
    })
  }
);

const appleHealthQuerySchema = z.object({
  endDate: z.string().optional().describe("The end of the date range for the query. This is a datetime in the participant's local timezone."),
  startDate: z.string().optional().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
  pageSize: z.number().optional().describe("The number of items to return."),
  pageID: z.string().optional().describe("The page ID to continue from.")
});

export const QueryAppleHealthWorkoutsTool = tool(
  async (input): Promise<string> => {
    const response = await MyDataHelps.queryAppleHealthWorkouts(input);
    return JSON.stringify(response);
  },
  {
    name: "queryAppleHealthWorkouts",
    description: "Query the participant's workouts from Apple Health.",
    schema: appleHealthQuerySchema
  }
);

export const QueryAppleHealthActivitySummariesTool = tool(
  async (input): Promise<string> => {
    const response = await MyDataHelps.queryAppleHealthActivitySummaries(input);
    return JSON.stringify(response);
  },
  {
    name: "queryAppleHealthActivitySummaries",
    description: `Query the participant's Apple Health activity summaries. These include Active Energy Burned,
      Active Energy Burned Goal, Apple Exercise Time, Apple Exercise Time Goal, Apple Stand Hours and Apple Stand Hours Goal.`,
    schema: appleHealthQuerySchema
  }
);

export const QueryNotificationsTool = tool(
  async (input): Promise<string> => {
    const response = await MyDataHelps.queryNotifications(input);
    return JSON.stringify(response);
  },
  {
    name: "queryNotifications",
    description: "Query notifications sent to the participant.",
    schema: z.object({
      type: z.enum(["Sms", "Push", "Email"]).optional().describe("The type of notification to query."),
      statusCode: z.enum(["Succeeded", "Unsubscribed", "MissingContactInfo", "NoRegisteredMobileDevice", "NoAssociatedUser", "ServiceError"])
        .optional().describe("The status code of the notification."),
      sentBefore: z.string().optional().describe("The end of the date range for the query. This is a datetime in the participant's local timezone."),
      sentAfter: z.string().optional().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
      identifier: z.string().optional().describe("The identifier of the notification.")
    })
  }
);

export const QuerySurveyAnswersTool = tool(
  async (input): Promise<string> => {
    const response = await MyDataHelps.querySurveyAnswers(input);
    return JSON.stringify(response);
  },
  {
    name: "querySurveyAnswers",
    description: "Query answers to surveys the participant has completed.",
    schema: z.object({
      surveyResultID: z.string().optional().describe("The ID of the survey result."),
      surveyID: z.string().optional().describe("The ID of the survey."),
      surveyName: z.string().optional().describe("The name of the survey."),
      after: z.string().optional()
        .describe(`The start of the date range for the query. Survey answers submitted after this date will be retrieved.
          This is a datetime in the participant's local timezone.`),
      before: z.string().optional()
        .describe(`The end of the date range for the query. Survey answers submitted before this date will be retrieved.
          This is a datetime in the participant's local timezone.`),
      stepIdentifier: z.string().optional().describe("The step identifier."),
      resultIdentifier: z.string().optional().describe("The result identifier."),
      answer: z.string().optional().describe("A particular answer."),
      pageID: z.string().optional().describe("The page ID to continue from.")
    })
  }
);

export const QueryDeviceDataV2Tool = tool(
  async (input): Promise<string> => {
    let response = await MyDataHelps.queryDeviceDataV2(input);

    return JSON.stringify(response.deviceDataPoints.map(({ value, startDate, startDateOffset, observationDate, observationDateOffset, units, dataSource }) => ({
      value,
      startDate,
      startDateOffset,
      observationDate,
      observationDateOffset,
      units,
      dataSource: dataSource?.sourceName
    })));
  },
  {
    name: "queryDeviceDataV2",
    description: `Can query a participant's device data. This represents raw individual fine grained data points, not aggregated in any way.
  
      Before using this tool call the getDeviceDataV2AllDataTypes tool to see which data types are available. If a particular data type is not available
      use the queryDailyData tool instead.

      For sleep this is the function you would query to determine the time a participant went to bed or woke up. For sleep a day consists of from 6 pm the 
      previous day to 6 pm the day of (For example 11/26/2024 sleep is from 11/25/2024 at 6 pm to 11/26/2024 at 6 pm). To determine the time a participant
      went to bed look at the startDate of the first not awake and not in bed sleep stage for that day. To determine wake up times look at the observationDate
      of the last not awake and not in bed sleep stage for that day.`,
    schema: deviceDataV2QuerySchema
  }
);

export const QueryDeviceDataV2AggregateTool = tool(
  async (input): Promise<string> => {
    let response = await MyDataHelps.queryDeviceDataV2Aggregate(input);

    return JSON.stringify(response.intervals.map(({ date, statistics }) => ({ date, statistics })));
  },
  {
    name: "queryDeviceDataV2Aggregate",
    description: `Can query a participant's aggregated device data. This can be used to get for instance a participant's hourly steps 
      count or their min max heart rate every day.`,
    schema: deviceDataV2QuerySchema.extend({
      intervalAmount: z.number().describe("The number of periods to aggregate over. Together with intervalType this can be 1 Days or 3 Minutes."),
      intervalType: z.enum(["Minutes", "Hours", "Days", "Weeks", "Months"])
        .describe("The type of interval to aggregate over. Together with intervalAmount this can be 1 Days or 3 Minutes."),
      aggregateFunctions: z.array(z.enum(["sum", "avg", "count", "min", "max"])).describe("The aggregations functions to apply to the granular data.")
    })
  }
);

export const QueryDailySleepTool = tool(
  async (input): Promise<string> => {
    let response = await MyDataHelps.queryDeviceDataV2DailySleep(input as DeviceDataV2AggregateQuery);

    return JSON.stringify(response.sleepStageSummaries.map(({ date, duration, value }) => ({ date, duration, value })));
  },
  {
    name: "queryDeviceDataV2DailySleep",
    description: `Can query daily aggregated sleep data. This will include sleep broken down by sleep stage.
      Use this function when you need to do sleep aggregate queries instead of deviceDataV2Aggregate.`,
    schema: deviceDataV2QuerySchema.extend({
      type: z.string()
        .describe("The device data type is specific to the namespace. For Apple Health this is called Sleep Analysis, for Fitbit it is called Sleep."),
    })
  }
);

export const QueryDailyDataTool = tool(
  async (input): Promise<string> => {
    let response = await queryDailyData(input.type, new Date(input.startDate), new Date(input.endDate), false);

    return JSON.stringify(response);
  },
  {
    name: "queryDailyData",
    description: "Query daily data for a participant. Before using this tool call the getAllDailyDataTypes tool to see which data types are available.",
    schema: z.object({
      type: z.string().describe("The type of daily data to query."),
      startDate: z.string().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
      endDate: z.string().describe("The end of the date range for the query. This is a datetime in the participant's local timezone.")
    })
  }
);

export const GetDeviceDataV2AllDataTypesTool = tool(
  async (): Promise<string> => {
    let response = await MyDataHelps.getDeviceDataV2AllDataTypes();
    return JSON.stringify(response);
  },
  {
    name: "getDeviceDataV2AllDataTypes",
    description: "Get all the device data types that can be queried with the queryDeviceDataV2 tool. Only types that are enabled can be queried.",
    schema: z.object({})
  }
);

export const GetAllDailyDataTypesTool = tool(
  async (): Promise<string> => {
    return JSON.stringify(getAllDailyDataTypes());
  },
  {
    name: "getAllDailyDataTypes",
    description: "Get all the daily data types that can be queried with the queryDailyData tool.",
    schema: z.object({})
  }
);

export const GetEhrNewsFeedPageTool = tool(
  async (input): Promise<string> => {
    const response = await getNewsFeedPage(input.feed, input.pageID, input.pageDate);
    return JSON.stringify(response);
  },
  {
    name: "getEhrNewsFeedPage",
    description: "Get electronic health record (EHR) data for the participant.",
    schema: z.object({
      feed: z.enum(["Immunizations", "LabReports", "Procedures", "Reports"]).describe("The type of feed to query."),
      pageID: z.string().optional().describe("The page ID to continue from if you need to fetch more results."),
      pageDate: z.string().optional().describe("The date of the page to continue from if you are doing a time-based query.")
    })
  }
);

export const GraphingTool = tool(
  async (input): Promise<string> => {

    let response = await fetch('https://kwejahcwmsyzidk5vde5uyv33a0saruz.lambda-url.us-east-1.on.aws', {
      method: 'POST',
      body: JSON.stringify({ code: input.code }),
      headers: { 'Content-Type': 'application/json' }
    }).then(response => response.json());

    return response.image;
  },
  {
    name: "graphing",
    description: `If the user asks for something to be graphed, use this tool. This tool returns a base 64 encoded string
      that represents an image. You should NOT use or interpret the returned content or include it in your response in any way.
      The UI will handle displaying the image.`,
    schema: z.object({
      code: z.string().describe("The python code that, when executed, will generate an image representing the graph.")
    })
  }
);

export const UploadedFileQueryTool = tool(
  async (input): Promise<string> => {

    let response = await MyDataHelps.queryFiles(input);

    return JSON.stringify(response);
  },
  {
    name: "uploadedFileQuery",
    description: `Query files uploaded by the current participant.`,
    schema: z.object({
      category: z.string().optional().describe("Category of files to query for. The generated AI Assistant graphs are saved under the 'ai-graph' category.")
    })
  }
);

export const GetUploadedFileTool = tool(
  async (input): Promise<string> => {

    let response = await MyDataHelps.getFileDownloadUrl(input.key);

    return JSON.stringify(response);
  },
  {
    name: "getUploadedFile",
    description: `Get a file uploaded by the current participant. This tool will return a presigned url that can be used to download the file.
      When you call this tool, if you pass in a file key that is an image, your response back
      to the user should always be 'Please see your uploaded file above.' and that's it.`,
    schema: z.object({
      key: z.string().describe(`The file key of the file to get.`)
    })
  }
);
