import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.css']
})
export class MonthlyComponent implements OnInit {
  @ViewChild('detail_day') detailDayElm?: ElementRef;
  @ViewChildren('info_days') infoDaysElm?: QueryList<ElementRef>;
  @ViewChild('month') monthElm?: ElementRef;
  @ViewChild('year') yearElm?: ElementRef;

  arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  arrYear = [2021, 2022, 2023];

  public address: string = '';
  public today: any;
  public yesterday: any;
  public dataWeathers:any = [];
  public infoMonth: any = [];
  public detailDay: any = [];
  public infoToday: any = [];
  public infoYesterday: any = [];

  constructor( private common: CommonService) { }

  ngOnInit(): void {
    this.address = this.common.address;
    this.today = this.common.today;
    this.yesterday = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() - 1);
    this.dataWeathers = this.common.dataWeathers;
    this.infoToday = this.common.getInfoDay(this.dataWeathers, this.today);
    this.infoYesterday = this.common.getInfoDay(this.dataWeathers, this.yesterday);
    this.renderView();
    let i = 0;
    for(let day of this.infoMonth) {
      if((day.dayOfMonth == this.today.getDate()) && (day.month == this.today.getMonth() + 1) && (day.year == this.today.getFullYear()))
        this.openDetail(day, i);
      i++;
    }
  }

  public getCalc() {
    this.currentMonth = this.monthElm?.nativeElement.selectedIndex;
    this.currentYear = this.yearElm?.nativeElement.value;
    this.renderView();
  }

  /* Xử lí button ẩn hiện detail */
  public openDetail(obj: any, index: number) {
    // obj.isExpand = true;
    this.detailDay = obj;
    let getLastIdx: number;
    if (index % 7 === 0) {
      getLastIdx = index + 6;
    } else {
      getLastIdx = Math.ceil(index / 7) * 7 - 1;
    }
    setTimeout(() => {
      const dayWeekEnd = this.infoDaysElm?.get(getLastIdx)?.nativeElement;
      if (dayWeekEnd) {
        const parentDiv = dayWeekEnd.parentNode;
        parentDiv.insertBefore(this.detailDayElm?.nativeElement, dayWeekEnd.nextSibling);
      }
    }, 100);
  }

  public closeDetail(obj: any) {
    // obj.isExpand = false;
    this.detailDay = 0;
  }

  /* lịch */
  public currentMonth = new Date(2022, 7, 1).getMonth();
  public currentYear = new Date(2022, 7, 1).getFullYear();
  public currentMonthName = new Date(this.currentYear, this.currentMonth).toLocaleString('vi', { month: 'long' });
  public nextMonthName = new Date(this.currentYear, this.currentMonth + 1).toLocaleString('vi', { month: 'long' });
  public prevMonthName = new Date(this.currentYear, this.currentMonth - 1).toLocaleString('vi', { month: 'long' });

  public prevMonth = new Date(this.currentYear, this.currentMonth - 1).getMonth();
  public prevMonth1 = new Date(this.currentYear, this.currentMonth - 2).getMonth();
  public prevMonth2 = new Date(this.currentYear, this.currentMonth - 3).getMonth();

  // Lấy số ngày của 1 tháng/tháng trước đó/tháng sau đó
  public getDaysInMonth() {
    return new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  }
  public getDaysPrevMonth() {
    return new Date(this.currentYear, this.currentMonth, 0).getDate();
  }
  public getDaysNextMonth() {
    return new Date(this.currentYear, this.currentMonth + 2, 0).getDate();
  }

  // Lấy ngày start/end của tháng
  public getStartDayInMonth() {
    return new Date(this.currentYear, this.currentMonth, 1).getDay();
  }
  public getEndDayInMonth() {
    return new Date(this.currentYear, this.currentMonth +1, 0).getDay();
  }

  // Đánh dấu ngày hiện tại
  public activeCurrentDay(day: any) {
    let day1 = new Date().toDateString();
    let day2 = new Date(this.currentYear, this.currentMonth, day).toDateString();
    return day1 == day2 ? 1 : 0;
  }

  // Hiển thị lên trên giao diện
  public renderView() {
    let daysInMonth = this.getDaysInMonth();
    let daysPrevMonth = this.getDaysPrevMonth();
    let startDay = this.getStartDayInMonth();
    let endDay = this.getEndDayInMonth();
    this.infoMonth = [];

    // Tháng trước
    for (let i = startDay; i >= 1; i--) {
      for(let day of this.dataWeathers) {
        if((day.dayOfMonth == (daysPrevMonth-i + 1)) && (day.month == (this.currentMonth)) && (day.year == this.currentYear))
          this.infoMonth.push(day);
      }
    }
    // Tháng chính
    for (let i = 1; i <= daysInMonth; i++) {
      for(let day of this.dataWeathers) {
        if((day.dayOfMonth == i) && (day.month == (this.currentMonth + 1)) && (day.year == this.currentYear))
          this.infoMonth.push(day);
      }
    }
    // Tháng sau
    for (let i = 1; i < 7 - endDay; i++) {
      for(let day of this.dataWeathers) {
        if((day.dayOfMonth == i) && (day.month == (this.currentMonth + 2)) && (day.year == this.currentYear))
          this.infoMonth.push(day);
      }
    }
    this.prevMonthName = new Date(this.currentYear, this.currentMonth - 1).toLocaleString('vi', { month: 'long' });
    this.currentMonthName = new Date(this.currentYear, this.currentMonth).toLocaleString('vi', { month: 'long' });
    this.nextMonthName = new Date(this.currentYear, this.currentMonth + 1).toLocaleString('vi', { month: 'long' });
    this.detailDay = 0;
    this.handleMaxNumOfYear();
  }

  // Xử lý lịch chỉ trong 2 năm
  public handleMaxNumOfYear() {
    if ((this.today.getMonth() == this.currentMonth) && (this.today.getFullYear() - 1 == this.currentYear)) {
      document?.getElementById('btnPrevMonth')?.setAttribute('disabled', '');
      document?.getElementById('btnPrevMonth')?.setAttribute('class', 'w-32 px-[6px] text-[#7996ef] text-left');
    } else {
      document?.getElementById('btnPrevMonth')?.removeAttribute('disabled');
      document?.getElementById('btnPrevMonth')?.setAttribute('class', 'w-32 px-[6px] text-[#1b4de4] text-left');
    }
    if ((this.today.getMonth() == this.currentMonth) && (this.today.getFullYear() + 1 == this.currentYear)) {
      document?.getElementById('btnNextMonth')?.setAttribute('disabled', '');
      document?.getElementById('btnNextMonth')?.setAttribute('class', 'w-32 px-[6px] text-[#7996ef] text-right');
    } else {
      document?.getElementById('btnNextMonth')?.removeAttribute('disabled');
      document?.getElementById('btnNextMonth')?.setAttribute('class', 'w-32 px-[6px] text-[#1b4de4] text-right');
    }
  }

  // Xử lý button prev/next tháng
  public btnNextMonth() {
    if (this.currentMonth == 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    if (this.currentMonth == 0) {
      this.monthElm?.nativeElement.children[this.currentMonth + 11].removeAttribute("selected");
      this.monthElm?.nativeElement.children[this.currentMonth].setAttribute("selected", "");
      this.yearElm?.nativeElement.children[this.currentYear - 2022].removeAttribute("selected");
      this.yearElm?.nativeElement.children[this.currentYear - 2021].setAttribute("selected", "");
    } else {
      this.monthElm?.nativeElement.children[this.currentMonth - 1].removeAttribute("selected");
      this.monthElm?.nativeElement.children[this.currentMonth].setAttribute("selected", "");
    }
    this.renderView();
  }
  public btnPrevMonth() {
    if (this.currentMonth == 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    if (this.currentMonth == 11) {
      this.monthElm?.nativeElement.children[this.currentMonth - 11].removeAttribute("selected");
      this.monthElm?.nativeElement.children[this.currentMonth].setAttribute("selected", "");
      this.yearElm?.nativeElement.children[this.currentYear - 2020].removeAttribute("selected");
      this.yearElm?.nativeElement.children[this.currentYear - 2021].setAttribute("selected", "");
    } else {
      this.monthElm?.nativeElement.children[this.currentMonth + 1].removeAttribute("selected");
      this.monthElm?.nativeElement.children[this.currentMonth].setAttribute("selected", "");
    }
    this.renderView();
  }

}
