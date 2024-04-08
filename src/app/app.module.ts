import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { WFHComponent } from './wfh/wfh.component';
import { TimingsComponent } from './timings/timings.component';
import { LeavesComponent } from './leaves/leaves.component';
import { TasksComponent } from './tasks/tasks.component';
import { PeopleComponent } from './people/people.component';
import { WfhmanagerComponent } from './wfhmanager/wfhmanager.component';
import { WfhadminComponent } from './wfhadmin/wfhadmin.component';

const appRoutes : Routes = [
  {path : "" , component : LoginComponent},
  {path : "user-dashboard" , component : UserDetailsComponent},
  {path : "WFH" , component : WFHComponent},
  {path : "user-timings",component : TimingsComponent},
  {path : "user-leaves",component : LeavesComponent},
  {path : "user-tasks",component : TasksComponent},
  {path : "user-people",component : PeopleComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDetailsComponent,
    WFHComponent,
    TimingsComponent,
    LeavesComponent,
    TasksComponent,
    PeopleComponent,
    WfhmanagerComponent,
    WfhadminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
