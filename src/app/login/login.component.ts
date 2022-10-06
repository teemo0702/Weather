import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { ServerService } from '../Services/server.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public users: User[] = [];
  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    pass: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private server: ServerService
  ) { }

  ngOnInit(): void {

  }

  private createNewData() {
    const newUser: any = {};
    for( const control in this.loginForm.controls) {
      if(control) {
        const controls: any = this.loginForm.controls;
        newUser[control] = controls[control].value;
      }
    }
    return newUser as User;
  }

  private getData(callback: any) {
    this.server.getUsers().subscribe(data => {
      this.users = data;
      callback();
    })
  }

  public nextPage() {
    let error = document.getElementById('error');
    let email = document.getElementById('email');
    let pass = document.getElementById('password');
    let next = false;
    this.getData(() => {
      for (let user of this.users) {
        if (this.createNewData().email === user.email && this.createNewData().pass === user.pass) {
          next = true;
        }
      }
      if (next) {
        this.router.navigate(['today']);
        alert('Đăng nhập thành công !!! Chuyển đến trang chủ');
      } else {
        if (!this.createNewData().email) {
          email?.nextElementSibling?.firstElementChild?.classList.remove('invisible');
          if (!this.createNewData().pass) {
            pass?.nextElementSibling?.firstElementChild?.classList.remove('invisible');
            error?.firstElementChild?.classList.add('invisible');
          } else {
            pass?.nextElementSibling?.firstElementChild?.classList.add('invisible');
            error?.firstElementChild?.classList.add('invisible');
          }
        } else {
          email?.nextElementSibling?.firstElementChild?.classList.add('invisible');
          if (!this.createNewData().pass) {
            pass?.nextElementSibling?.firstElementChild?.classList.remove('invisible');
            error?.firstElementChild?.classList.add('invisible');
          } else {
            pass?.nextElementSibling?.firstElementChild?.classList.add('invisible');
            error?.firstElementChild?.classList.remove('invisible');
          }
        }
      }
    });
  }

  public checkEmail() {
    let email = document.getElementById('email');
    let pass = document.getElementById('password');
    if (!this.createNewData().email) {
      email?.nextElementSibling?.firstElementChild?.classList.remove('invisible');
    } else {
      email?.nextElementSibling?.firstElementChild?.classList.add('invisible');
    }
  }

  public checkPass() {
    let pass = document.getElementById('password');
    if (!this.createNewData().pass) {
      pass?.nextElementSibling?.firstElementChild?.classList.remove('invisible');
    } else {
      pass?.nextElementSibling?.firstElementChild?.classList.add('invisible');
    }
  }

  get email() { return this.loginForm.get('email'); }
  get pass() { return this.loginForm.get('pass'); }
}
