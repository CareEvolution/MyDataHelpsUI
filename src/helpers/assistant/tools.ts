import { StructuredTool } from "@langchain/core/tools";
import { z } from "zod";
import MyDataHelps, { DeviceDataV2AggregateQuery, DeviceDataV2Query, ParticipantDemographics, StringMap } from "@careevolution/mydatahelps-js";
import { queryDailyData, getAllDailyDataTypes } from "../query-daily-data";
import { getNewsFeedPage } from "../news-feed/data";

class DeviceDataV2Common {
  static Namespace = z.enum(["Fitbit", "AppleHealth", "Garmin", "Dexcom", "HealthConnect"])
    .describe("The namespace of the device data, representing the manufacturer of the devices used to collect the data.");

  static DataSourceFilters = z.record(z.string(), z.string()).optional()
    .describe('Filters to apply to the data source. For example, to filter by sourceName, use { sourceName: "Oura" }.');

  static PropertyFilters = z.record(z.string(), z.string()).optional()
    .describe('Filters to apply to the properties of the data points.');
}

export class PersistParticipantInfoTool extends StructuredTool {
  schema = z.object({
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
    customFields: z.record(z.string(), z.string())
      .optional().describe("Custom fields where dynamic information can be saved for the participant.")
  });

  name = "persistParticipantInfo";

  description = "Can be used to save data about the current participant, including dynamic information in the participant's custom fields.";

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.persistParticipantInfo(input.demographics as Partial<ParticipantDemographics>, input.customFields as StringMap);

    return JSON.stringify(response);
  }
}

const appleHealthQuerySchema = z.object({
  endDate: z.string().optional().describe("The end of the date range for the query. This is a datetime in the participant's local timezone."),
  startDate: z.string().optional().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
  pageSize: z.number().optional().describe("The number of items to return."),
  pageID: z.string().optional().describe("The page ID to continue from.")
});

export class QueryAppleHealthWorkoutsTool extends StructuredTool {
  schema = appleHealthQuerySchema;

  name = "queryAppleHealthWorkouts";

  description = "Query the participant's workouts from Apple Health.";

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryAppleHealthWorkouts(input);

    return JSON.stringify(response);
  }
}

export class QueryAppleHealthActivitySummariesTool extends StructuredTool {
  schema = appleHealthQuerySchema;

  name = "queryAppleHealthActivitySummaries";

  description = `Query the participant's Apple Health activity summaries. These include Active Energy Burned,
    Active Energy Burned Goal, Apple Exercise Time, Apple Exercise Time Goal, Apple Stand Hours and Apple Stand Hours Goal.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryAppleHealthActivitySummaries(input);

    return JSON.stringify(response);
  }
}

export class QueryNotificationsTool extends StructuredTool {
  schema = z.object({
    type: z.enum(["Sms", "Push", "Email"]).optional().describe("The type of notification to query."),
    statusCode: z.enum(["Succeeded", "Unsubscribed", "MissingContactInfo", "NoRegisteredMobileDevice", "NoAssociatedUser", "ServiceError"])
      .optional().describe("The status code of the notification."),
    sentBefore: z.string().optional().describe("The end of the date range for the query. This is a datetime in the participant's local timezone."),
    sentAfter: z.string().optional().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
    identifier: z.string().optional().describe("The identifier of the notification."),
  });

  name = "queryNotifications";

  description = "Query notifications sent to the participant.";

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryNotifications(input);

    return JSON.stringify(response);
  }
}

export class QuerySurveyAnswersTool extends StructuredTool {
  schema = z.object({
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
  });

  name = "querySurveyAnswers";

  description = `Query answers to surveys the participant has completed.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.querySurveyAnswers(input);

    return JSON.stringify(response);
  }
}

export class QueryDeviceDataV2Tool extends StructuredTool {
  schema = z.object({
    namespace: DeviceDataV2Common.Namespace,
    type: z.string().describe("The device data type is specific to the namespace."),
    observedAfter: z.string().optional()
      .describe("The start of the date range for the query. This is a datetime in the participant's local timezone, passed without the timezone offset."),
    observedBefore: z.string().optional()
      .describe("The end of the date range for the query. This is a datetime in the participant's local timezone, passed without the timezone offset."),
    dataSourceFilters: DeviceDataV2Common.DataSourceFilters,
    propertyFilters: DeviceDataV2Common.PropertyFilters
  });

  name = "queryDeviceDataV2";

  description = `Can query a participant's device data. This represents raw individual fine grained data points, not aggregated in any way.

    Before using this tool call the getDeviceDataV2AllDataTypes tool to see which data types are available. If a particular data type is not available
    use the queryDailyData tool instead.

    For sleep this is the function you would query to determine the time a participant went to bed or woke up. For sleep a day consists of from 6 pm the 
    previous day to 6 pm the day of (For example 11/26/2024 sleep is from 11/25/2024 at 6 pm to 11/26/2024 at 6 pm). To determine the time a participant
    went to bed look at the startDate of the first not awake and not in bed sleep stage for that day. To determine wake up times look at the observationDate
    of the last not awake and not in bed sleep stage for that day.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryDeviceDataV2(input as DeviceDataV2Query);

    return JSON.stringify(response.deviceDataPoints.map(({ value, startDate, startDateOffset, observationDate, observationDateOffset, units, dataSource }) => ({
      value,
      startDate,
      startDateOffset,
      observationDate,
      observationDateOffset,
      units,
      dataSource: dataSource?.sourceName
    })));
  }
}

export class QueryDeviceDataV2AggregateTool extends StructuredTool {
  schema = z.object({
    namespace: DeviceDataV2Common.Namespace,
    type: z.string().describe("The device data type is specific to the namespace. Example data types for AppleHealth are Steps, Heart Rate."),
    observedAfter: z.string().optional().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
    observedBefore: z.string().optional().describe("The end of the date range for the query. This is a datetime in the participant's local timezone."),
    intervalAmount: z.number().describe("The number of periods to aggregate over. Together with intervalType this can be 1 Days or 3 Minutes."),
    intervalType: z.enum(["Minutes", "Hours", "Days", "Weeks", "Months"])
      .describe("The type of interval to aggregate over. Together with intervalAmount this can be 1 Days or 3 Minutes."),
    aggregateFunctions: z.array(z.enum(["sum", "avg", "count", "min", "max"])).describe("The aggregations functions to apply to the granular data."),
    dataSourceFilters: DeviceDataV2Common.DataSourceFilters,
    propertyFilters: DeviceDataV2Common.PropertyFilters
  });

  name = "queryDeviceDataV2Aggregate";

  description = `Can query a participant's aggregated device data. This can be used to get for instance a participant's hourly steps 
    count or their min max heart rate every day.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryDeviceDataV2Aggregate(input as DeviceDataV2AggregateQuery);

    return JSON.stringify(response.intervals.map(({ date, statistics }) => ({ date, statistics })));
  }
}

export class QueryDailySleepTool extends StructuredTool {
  schema = z.object({
    namespace: DeviceDataV2Common.Namespace,
    type: z.string()
      .describe("The device data type is specific to the namespace. For Apple Health this is called Sleep Analysis, for Fitbit it is called Sleep."),
    observedAfter: z.string().optional()
      .describe("The start of the date range for the query. This is a date (no time) in the participant's local time. This is inclusive."),
    observedBefore: z.string().optional()
      .describe("The end of the date range for the query. This is a date (no time) in the participant's local time. This is inclusive."),
    dataSourceFilters: DeviceDataV2Common.DataSourceFilters,
    propertyFilters: DeviceDataV2Common.PropertyFilters
  });

  name = "queryDeviceDataV2DailySleep";

  description = `Can query daily aggregated sleep data. This will include sleep broken down by sleep stage.
    Use this function when you need to do sleep aggregate queries instead of deviceDataV2Aggregate.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await MyDataHelps.queryDeviceDataV2DailySleep(input as DeviceDataV2AggregateQuery);

    return JSON.stringify(response.sleepStageSummaries.map(({ date, duration, value }) => ({ date, duration, value })));
  }
}

export class QueryDailyDataTool extends StructuredTool {
  schema = z.object({
    type: z.string().describe("The type of daily data to query."),
    startDate: z.string().describe("The start of the date range for the query. This is a datetime in the participant's local timezone."),
    endDate: z.string().describe("The end of the date range for the query. This is a datetime in the participant's local timezone.")
  });

  name = "queryDailyData";

  description = "Query daily data for a participant.";

  async _call(input: z.infer<typeof this.schema>) {
    let response = await queryDailyData(input.type, new Date(input.startDate), new Date(input.endDate), false);

    return JSON.stringify(response);
  }
}

export class GetDeviceDataV2AllDataTypesTool extends StructuredTool {
  schema = z.object({});

  name = "getDeviceDataV2AllDataTypes";

  description = "Get all the device data types that can be queried with the queryDeviceDataV2 tool. Only types that are enabled can be queried.";

  async _call() {
    let response = await MyDataHelps.getDeviceDataV2AllDataTypes();

    return JSON.stringify(response);
  }
}

export class GetAllDailyDataTypesTool extends StructuredTool {
  schema = z.object({});

  name = "getAllDailyDataTypes";

  description = "Get all the daily data types that can be queried with the queryDailyData tool.";

  async _call() {
    return JSON.stringify(getAllDailyDataTypes());
  }
}

export class GetEhrNewsFeedPageTool extends StructuredTool {
  schema = z.object({
    feed: z.enum(["Immunizations", "LabReports", "Procedures", "Reports"]).describe("The type of feed to query."),
    pageID: z.string().optional().describe("The page ID to continue from if you need to fetch more results."),
    pageDate: z.string().optional().describe("The date of the page to continue from if you are doing a time based query.")
  });

  name = "getEhrNewsFeedPage"

  description = `Get electronic health record (EHR) data for the participant.`;

  async _call(input: z.infer<typeof this.schema>) {
    let response = await getNewsFeedPage(input.feed, input.pageID, input.pageDate);

    return JSON.stringify(response);
  }
}
