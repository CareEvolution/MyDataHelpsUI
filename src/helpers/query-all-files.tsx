import MyDataHelps, { Guid, UploadedFile, UploadedFileQuery, UploadedFilesPage } from '@careevolution/mydatahelps-js';

export default function (query: UploadedFileQuery): Promise<UploadedFile[]> {

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
        const queryParameters: UploadedFileQuery = { ...query };
        if (pageID) {
            queryParameters.pageID = pageID;
        }
        return MyDataHelps.queryFiles(queryParameters);
    }

    return getFiles();
}
