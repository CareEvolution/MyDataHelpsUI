import MyDataHelps, { Guid, InboxItem, InboxItemQueryParameters, InboxItemUpdateResult } from "@careevolution/mydatahelps-js";

export interface InboxDataService {
    loadInboxItems: (parameters: InboxItemQueryParameters) => Promise<InboxItem[]>;
    loadInboxItem: (id: Guid) => Promise<InboxItem | undefined>;
    markItemRead: (inboxItem: InboxItem) => Promise<InboxItemUpdateResult>;
}

const service: InboxDataService = {
    loadInboxItems: (parameters: InboxItemQueryParameters): Promise<InboxItem[]> => {
        let items: InboxItem[] = [];

        let getPage = function (pageID?: Guid): Promise<InboxItem[]> {
            parameters.pageID = pageID;
            return MyDataHelps.queryInboxItems(parameters).then(function (response) {
                items = items.concat(response.items);
                if (response.nextPageID) {
                    return getPage(response.nextPageID);
                } else {
                    return items;
                }
            });
        };

        return getPage().then(function (items) {
            return items;
        });
    },
    loadInboxItem: (id: Guid): Promise<InboxItem | undefined> => {
        return MyDataHelps.getInboxItem(id);
    },
    markItemRead: (inboxItem: InboxItem): Promise<InboxItemUpdateResult> => {
        return MyDataHelps.updateInboxItem(inboxItem.id, 'markRead');
    }
};

export default service;