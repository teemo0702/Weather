import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.css']
})
export class WeekendComponent implements OnInit {
  public address: string = '';
  public today: any;
  public dataWeathers: any = [];
  public infoWeekend: any = [];
  public infoCurrentWeekend: any = [];
  public infoNextWeekend: any = [];

  constructor( private common: CommonService) { }

  ngOnInit(): void {
    this.address = this.common.address;
    this.today = this.common.today;
    this.dataWeathers = this.common.dataWeathers;
    this.getTwoWeek();
    this.infoCurrentWeekend[0].isExpand = true;
  }

  public getTwoWeek() {
    let i = 0;
    let temp: any;
    // let temp2 = new Date("2022, 09, 19");
    if (this.today.getDay() === 0) {
      temp = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 6);
    } else {
      temp = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - this.today.getDay() + 1);
    }
    for(let day of this.dataWeathers) {
      if((day.dayOfMonth == temp.getDate()) && (day.month == temp.getMonth() + 1) && (day.year == temp.getFullYear())) {
        this.infoWeekend = this.dataWeathers.slice(i, i + 14);
      }
      i++;
    }

    for(let index in this.infoWeekend) {
      if(index == '4' || index == '5' || index == '6') {
        this.infoCurrentWeekend.push(this.infoWeekend[index]);
      }
      if(index == '11' || index == '12' || index == '13') {
        this.infoNextWeekend.push(this.infoWeekend[index]);
      }
    }
  }

  public checkToday(index: number): any {
    // let temp = new Date("2022, 09, 12")
    if((this.infoCurrentWeekend[index].dayOfMonth == this.today.getDate()) && (this.infoCurrentWeekend[index].month == this.today.getMonth() + 1) && (this.infoCurrentWeekend[index].year == this.today.getFullYear())) {
      return true;
    } else {
      return false;
    }
  }

  public expand(obj: any) {
    obj.isExpand = !obj.isExpand;
  }
}
