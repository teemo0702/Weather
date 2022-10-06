import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {
  public address: string = '';
  public today: any;
  public dataWeathers: any = [];
  public dataHours: any = [];
  public infoFiveDays: any = [];
  public infoTwoDayHours: any = [];
  public infoFiveHours: any = [];
  public infoCurrentHour: any;
  public infoCurrentDay: any;
  public airHighest: any = this.common.getAirHighest();

  constructor( private common: CommonService) { }

  ngOnInit(): void {
    this.address = this.common.address;
    this.today = this.common.today;
    this.dataWeathers = this.common.dataWeathers;
    this.dataHours = this.common.dataHours;
    this.infoFiveDays = this.common.getInfoDays(this.dataWeathers, 5);
    this.getInfoFiveHours();
    this.infoCurrentDay = this.infoFiveDays[0];
    this.infoCurrentHour = this.infoFiveHours[0];
  }

  public getInfoFiveHours() {
    // const d = new Date("July 21, 1983 22:15:00");
    // let temp = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':00';
    let temp = (this.today.getHours() < 10 ? '0' : '') + this.today.getHours() + ':00';
    let i = 0;
    let j = 0;
    for(let day of this.dataHours) {
      if((day.dayOfMonth >= this.today.getDate()) && (day.month >= this.today.getMonth() + 1) && (day.year >= this.today.getFullYear())) {
        for (let hour of day.hours) {
          this.infoTwoDayHours = this.infoTwoDayHours.concat(hour);
          if (this.infoTwoDayHours.length > 27) {
            break;
          }
        }
        j++;
      }
      if (j > 1) {
        break;
      }
    }
    for (let hour of this.infoTwoDayHours) {
      if (temp == hour.hour) {
        this.infoFiveHours = this.infoTwoDayHours.slice(i, i + 5);;
      }
      i++;
    }
  }

}
