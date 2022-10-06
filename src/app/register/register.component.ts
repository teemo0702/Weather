import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ServerService } from '../Services/server.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public users: User[] = [];
  public registerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[0-9a-z._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    pass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
    repass: new FormControl('', [Validators.pattern("^[A-Z]+[a-z0-9]{8,}$")]),
    check: new FormControl('')
  });

  constructor(
    private router: Router,
    private server: ServerService
  ) {}

  ngOnInit(): void {
  }

  private createNewData() {
    const newUser: any = {};
    for( const control in this.registerForm.controls) {
      if(control) {
        const controls: any = this.registerForm.controls;
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
    let check = true;
    let checkMail = false;
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let pass = document.getElementById('password');
    let repass = document.getElementById('repass');
    let errName: any = document.getElementById('errName');
    let errEmail: any = document.getElementById('errEmail');
    let errPass: any = document.getElementById('errPass');
    let errRepass: any = document.getElementById('errRepass');
    errName.innerHTML = '';
    errEmail.innerHTML = '';
    errPass.innerHTML = '';
    errRepass.innerHTML = '';
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.getData(() => {
      for (let user of this.users) {
        if (this.createNewData().email === user.email) {
          checkMail = true;
        }
      }

      if (this.createNewData().pass === '') {
        errPass.innerHTML = "";
        pass?.focus();
        check = false;
      } else if (this.createNewData().repass === '') {
        errRepass.innerHTML = "Nhập lại mật khẩu trống";
        repass?.focus();
        check = false;
      } else if (this.createNewData().pass !== this.createNewData().repass) {
        errRepass.innerHTML = "Mật khẩu không khớp";
        repass?.focus();
        check = false;
      }

      if (this.createNewData().email === '') {
        errEmail.innerHTML = "";
        email?.focus();
        check = false;
      } else if (!filter.test(this.createNewData().email)) {
        errEmail.innerHTML = "";
        email?.focus();
        check = false;
      } else if (checkMail) {
        errEmail.innerHTML = "E-mail đã tồn tại";
        email?.focus();
        check = false;
      }

      if (this.createNewData().name === '') {
        errName.innerHTML = "";
        name?.focus();
        check = false;
      }

      if (check) {
        this.server.addUser(this.createNewData()).subscribe(data => {
          this.router.navigate(['today']);
        })
        alert('Đăng kí thành công !!! Chuyển đến trang chủ');
      }
    });
  }

  public checkName() {
    let name = document.getElementById('name');
    if (!this.createNewData().name) {
      name?.nextElementSibling?.firstElementChild?.classList.remove('hidden');
    } else {
      name?.nextElementSibling?.firstElementChild?.classList.add('hidden');
    }
  }

  public checkEmail() {
    let check = false;
    let email = document.getElementById('email');
    let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    this.getData(() => {
      if (!filter.test(this.createNewData().email)) {
        email?.nextElementSibling?.firstElementChild?.classList.remove('hidden');
      } else {
        email?.nextElementSibling?.firstElementChild?.classList.add('hidden');
      }
      for (let user of this.users) {
        if (this.createNewData().email === user.email) {
          check = true;
        }
      }
      if (check) {
        email?.nextElementSibling?.lastElementChild?.classList.remove('hidden');
      } else {
        email?.nextElementSibling?.lastElementChild?.classList.add('hidden');
      }
    });
  }

  public checkPass() {
    let pass = document.getElementById('password');
    if (!this.createNewData().pass) {
      pass?.nextElementSibling?.firstElementChild?.classList.remove('hidden');
    } else {
      pass?.nextElementSibling?.firstElementChild?.classList.add('hidden');
    }
  }

  public checkRepass() {
    let repass = document.getElementById('repass');
    if (this.createNewData().repass !== this.createNewData().pass) {
      repass?.nextElementSibling?.firstElementChild?.classList.remove('hidden');
    } else {
      repass?.nextElementSibling?.firstElementChild?.classList.add('hidden');
    }
  }

  get name() { return this.registerForm.get('name'); }
  get email() { return this.registerForm.get('email'); }
  get pass() { return this.registerForm.get('pass'); }
}
