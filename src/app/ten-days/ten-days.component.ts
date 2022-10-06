import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-ten-days',
  templateUrl: './ten-days.component.html',
  styleUrls: ['./ten-days.component.css']
})
export class TenDaysComponent implements OnInit {
  public address: string = '';
  public today: any;
  public dataWeathers: any = [];
  public infoTenDays: any = [];

  constructor( private common: CommonService ) { }

  ngOnInit(): void {
    this.address = this.common.address;
    this.today = this.common.today;
    this.dataWeathers = this.common.dataWeathers;
    this.infoTenDays = this.common.getInfoDays(this.dataWeathers, 15);
    for(let day of this.infoTenDays) {
      if((day.dayOfMonth == this.today.getDate()) && (day.month == this.today.getMonth() + 1) && (day.year == this.today.getFullYear())) {
        day.isExpand = true;
      }
    }
  }

  public expand(obj: any) {
    obj.isExpand = !obj.isExpand;
  }
}
