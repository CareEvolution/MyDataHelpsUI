import MyDataHelps from "@careevolution/mydatahelps-js";
import { formatISO } from "date-fns";
import { EhrNewsFeedPageModel } from "./types";

export function getNewsFeedPage(feed: string, pageID?: string, pageDate?: string): Promise<EhrNewsFeedPageModel> {
    var params: any = { Feed: feed, ClientLocalTime: formatISO(new Date()) };
    if (pageID) {
        params.PageID = pageID;
    }
    if (pageDate) {
        params.PageDate = pageDate;
    }

    var queryString = new URLSearchParams(params).toString();
    var endpoint = 'HealthAndWellnessApi.NewsFeed';
    return MyDataHelps.invokeCustomApi(endpoint, 'GET', queryString, true);
}