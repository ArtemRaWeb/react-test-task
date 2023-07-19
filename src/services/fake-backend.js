import { TableData } from '../models/table-data.model';
import { tableData } from './demo-data';

const arrayToObject = (arr, min, max) => {
    return arr
        .map(row => new TableData(row))
        .filter(item => item.incomeAmount >= min && item.incomeAmount <= max)
        .sort((first, second) => second.incomeAmount - first.incomeAmount);
};

export function configureFakeBackend() {
    let realFetch = window.fetch;

    window.fetch = function (url, params) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // get table data
                if (params.method === 'GET') {
                    const objUrl = new URL(url, 'http://dummy.com');
                    const params = new URLSearchParams(objUrl.search);
                    const minValue = parseInt(params.get('min'));
                    const maxValue = parseInt(params.get('max'));
                    const fakeData = arrayToObject(tableData, minValue, maxValue);

                    resolve({ ok: true, data: JSON.stringify(fakeData) });
                    return;
                }

                // pass through any requests not handled above
                realFetch(url, params).then(response => resolve(response));
            }, 500);
        });
    };
}
