interface Date {
    DateToString(): string;
}

Date.prototype.DateToString = function(): string {
    let dayStr = this.getDate().toString();
    if (dayStr.length === 1) {
        dayStr = '0' + dayStr;
    }
    let monthStr = this.getMonth().toString();
    if (monthStr.length === 1) {
        monthStr = '0' + monthStr;
    }
    let yearStr = this.getFullYear().toString();
    let fechaStr = yearStr + monthStr + dayStr;
    return fechaStr;
}