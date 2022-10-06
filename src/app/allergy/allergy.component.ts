import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.css']
})
export class AllergyComponent implements OnInit {
  public today: any;
  public afterTomorrowDay: any;
  public afterTomorrowName: any;
  public pollens: any = [];
  public tipAllergies = [
    {
      name: 'Tắm rửa sau khi ở ngoài trời',
      imgUrl: '../../assets/img/allergy/1.png',
      description: 'Để loại bỏ lượng phấn hoa bám vào người khi bạn ở bên ngoài, hãy tắm rửa và thay quần áo.',
    },
    {
      name: 'Giảm thiểu phấn hoa trong nhà',
      imgUrl: '../../assets/img/allergy/2.png',
      description: 'Luôn đóng cửa sổ và sử dụng máy lạnh hoặc máy lọc HEPA để lọc tác nhân gây dị ứng.',
    },
    {
      name: 'Xem Thời tiết',
      imgUrl: '../../assets/img/allergy/3.png',
      description: 'Tìm hiểu khi nào những điều kiện như gió làm tăng lượng phấn hoa để bạn có thể chuẩn bị.',
    },
    {
      name: 'Biết rõ các lựa chọn giảm nhẹ tình trạng dị ứng của bạn',
      imgUrl: '../../assets/img/allergy/4.png',
      describe: 'Hãy trao đổi với bác sĩ của bạn về các lựa chọn từ sử dụng thuốc đến bình xịt mũi.',
    }
  ];

  public pollen: any = [
    {
      dayOfWeek: 'Thứ tư',
      dayOfMonth: '14',
      month: '9',
      year: '2022',
      tree: 'Không có',
      grass: 'Không có',
      chalk: 'Không có',
    },
    {
      dayOfWeek: 'Thứ năm',
      dayOfMonth: '15',
      month: '9',
      year: '2022',
      tree: 'Không có',
      grass: 'Không có',
      chalk: 'Không có',
    },{
      dayOfWeek: 'Thứ sáu',
      dayOfMonth: '16',
      month: '9',
      year: '2022',
      tree: 'Không có',
      grass: 'Không có',
      chalk: 'Không có',
    },{
      dayOfWeek: 'Thứ bảy',
      dayOfMonth: '17',
      month: '9',
      year: '2022',
      tree: 'Không có',
      grass: 'Không có',
      chalk: 'Không có',
    },{
      dayOfWeek: 'Chủ nhật',
      dayOfMonth: '18',
      month: '9',
      year: '2022',
      tree: 'Không có',
      grass: 'Không có',
      chalk: 'Không có',
    },
  ];

  public pol: any = [
    {
      name: 'cây',
      imgUrl: '../../assets/img/allergy/bui1.png',
      day: [
        {
          dayOfWeek: 'Thứ tư',
          dayOfMonth: '14',
          month: '9',
          year: '2022',
          status: 'Không có',
        },
      ]
    },
    {

    },
    {

    }
  ];

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.today = this.common.today;
    this.pollens = this.common.pollens;
    this.afterTomorrowDay = new Date(this.today);
    this.afterTomorrowDay = new Date(this.afterTomorrowDay.setDate(this.afterTomorrowDay.getDate() + 2));
    this.afterTomorrowName = this.afterTomorrowDay.toLocaleString('vi', { weekday: 'long' });
  }
}
