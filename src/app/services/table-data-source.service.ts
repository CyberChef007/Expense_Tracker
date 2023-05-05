import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MonthNavigation } from '../models/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableDataSourceService {

  monthNavigationObservable = new Subject<MonthNavigation[]>();
  monthNavigationSelectedObservable = new Subject<MonthNavigation>();

  previousSavingsObservable = new Subject<{
    monthYear: string;
    monthNumber: string;
    sum: string;
  }>();  // Current month previous savings
  currentSavingsRequestObservable = new Subject<{
    monthYear: string;
    monthNumber: string;
  }>(); // Previous Months Current Savings

  constructor(private http:HttpClient) { }


  // ------------------------------- BACK END REQUESTS ------------------------------ //

  getMonthsList(){
    return this.http.get<any>('https://localhost:7020/api/MonthsData/GetListOfMonths');
  }


  getTableRows(monthYear: string, monthNumber: string, tableName: string) {
    let parameters = new HttpParams();
    parameters = parameters.append('monthYear', monthYear);
    parameters = parameters.append('monthNumber', monthNumber);
    parameters = parameters.append('tableName', tableName);

    return this.http.get<any>(
      'https://localhost:7020/api/MonthsData/GetTableData',
      {
        params: parameters,
      }
    )
  }

  postTableRow(monthDataForBackEnd: any) {
    return this.http.post(
      'https://localhost:7020/api/MonthsData/InsertTableRow',
      monthDataForBackEnd,
      { responseType: 'text'}
    );
  }


  deleteTableRow(rowId: number) {
    return this.http.delete(
      'https://localhost:7020/api/MonthsData/DeleteTableRow/' + rowId,
      {
        responseType: 'text',
      }
    );
  }
}
