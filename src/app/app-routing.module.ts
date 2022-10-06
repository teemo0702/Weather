import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { TenDaysComponent } from './ten-days/ten-days.component';
import { WeekendComponent } from './weekend/weekend.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { AllergyComponent } from './allergy/allergy.component';
import { AirQualityComponent } from './air-quality/air-quality.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: TodayComponent },
  { path: 'today', component: TodayComponent },
  { path: 'hourly', component: HourlyComponent },
  { path: 'tenDays', component: TenDaysComponent },
  { path: 'weekend', component: WeekendComponent },
  { path: 'monthly', component: MonthlyComponent },
  { path: 'allergy', component: AllergyComponent },
  { path: 'airQuality', component: AirQualityComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
