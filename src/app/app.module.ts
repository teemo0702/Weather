import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TodayComponent } from './today/today.component';
import { HourlyComponent } from './hourly/hourly.component';
import { TenDaysComponent } from './ten-days/ten-days.component';
import { WeekendComponent } from './weekend/weekend.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { AllergyComponent } from './allergy/allergy.component';
import { AirQualityComponent } from './air-quality/air-quality.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AutoFocusInputDirective } from './Directives/auto-focus-input.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    TodayComponent,
    HourlyComponent,
    TenDaysComponent,
    WeekendComponent,
    MonthlyComponent,
    AllergyComponent,
    AirQualityComponent,
    LoginComponent,
    RegisterComponent,
    AutoFocusInputDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
