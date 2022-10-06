import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})
export class HourlyComponent implements OnInit {
  public address: string = '';
  public today: any;
  public dataHours: any = [];
  public infoHours: any = [];

  constructor( private common: CommonService) { }

  ngOnInit(): void {
    this.address = this.common.address;
    this.today = this.common.today;
    this.dataHours = this.common.dataHours;
    this.infoHours = this.common.getInfoDays(this.dataHours, 3);
    let temp = ((this.today.getHours()+1) < 10 ? '0' : '') + (this.today.getHours()+1) + ':00';
    for(let hour of this.infoHours[0].hours) {
      if(hour.hour === temp) {
        hour.isExpand = true;
      }
    }
  }

  // public activeCurrentHour(day: any) {
  //   let d1 = new Date().getdataHours();
  //   let d2 = new Date().getMinutes();
  //   let day1 = d1 + d2;
  //   let day2: string;
  //   for(let day of this.hours) {
  //     if((day.dayOfMonth == this.today.getDate()) && (day.month == this.today.getMonth() + 1) && (day.year == this.today.getFullYear())) {
  //       for (let hour of day.hours) {
  //         day2 = hour.hour;
  //       }
  //     }
  //   }
  //   return 1;
  // }

  public getValue(value: any, field: string) {
    return value[field];
  }

  public convertNum(value: any) {
    const temp: number = +value;
    return temp;
  }

  public expand(obj: any): void {
    obj.isExpand = !obj.isExpand;
  }

}
