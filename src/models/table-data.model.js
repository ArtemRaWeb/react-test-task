export class TableData {
    constructor(arr) {
        this.name = arr[1];
        this.city = arr[6];
        this.incomeAmount = Math.round((parseFloat(arr[4]) / 100) * arr[3]);
        this.totalRevenue = Math.round(arr[3]);
    }
}
