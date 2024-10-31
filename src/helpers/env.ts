import MyDataHelps from '@careevolution/mydatahelps-js';

export function isDevelopment() {
    return MyDataHelps.baseUrl && (MyDataHelps.baseUrl.startsWith('https://mdhorg.ce.dev') || MyDataHelps.baseUrl.startsWith('https://mydatahelps.dev'));
}