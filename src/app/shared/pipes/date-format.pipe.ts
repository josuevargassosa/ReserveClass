import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date-format'
})
export class DateFormatPipe implements PipeTransform {

  transform(date: Date): string {
    let dayStr = date.getDate().toString();
    if (dayStr.length === 1) {
        dayStr = '0' + dayStr;
    }
    let monthStr = (date.getMonth() + 1).toString();
    if (monthStr.length === 1) {
        monthStr = '0' + monthStr;
    }
    let yearStr = date.getFullYear().toString();
    let fechaStr = yearStr + monthStr + dayStr;
    return fechaStr;
  }

}
