import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-air-quality',
  templateUrl: './air-quality.component.html',
  styleUrls: ['./air-quality.component.css']
})
export class AirQualityComponent implements OnInit {
  public address: string = '';
  // public today: any;
  public airs: any = [];
  public airHighest: any = this.common.getAirHighest();

  constructor( private common: CommonService) { }

  ngOnInit(): void {
    this.address = this.common.address;
    // this.today = this.common.today;
    this.airs = this.common.airQualitys;
    let i = 0;
    for (let air of this.airs) {
      this.common.getAirDetail(air.level, i);
      i++;
    }
  }

  public openInfo() {
    const info = document.querySelector('.inforAir');
    info?.classList.toggle('hidden');
  }

  public closeInfo() {
    const info = document.querySelector('.inforAir');
    info?.classList.add('hidden');
  }

}
