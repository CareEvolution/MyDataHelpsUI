import MyDataHelps, { Guid, UploadedFile, UploadedFilesPage } from '@careevolution/mydatahelps-js';
import * as Model from '@careevolution/mydatahelps-js/types';

export default function (query: Model.UploadedFileQuery): Promise<UploadedFile[]> {

    async function getFiles(): Promise<UploadedFile[]> {
        let page = await getFilesPage();
        let allFiles = page.files;

        while (page.nextPageID) {
            page = await getFilesPage(page.nextPageID);
            allFiles = allFiles.concat(page.files);
        }

        return allFiles;
    }

    async function getFilesPage(pageID?: Guid): Promise<UploadedFilesPage> {
        const queryParameters: Model.UploadedFileQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return MyDataHelps.queryFiles(queryParameters);
    }

    return getFiles();
}
