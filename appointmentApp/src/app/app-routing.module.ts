import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { NewAppointmentComponent } from './new-appointment/new-appointment.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { UpdateComponent } from './update/update.component';
import { UpdateAndDeleteComponent } from './update-and-delete/update-and-delete.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'addappointment',
    component:NewAppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'update/:id',
    component: UpdateComponent
  },

  {
    path:'appointments',
    component: AppointmentListComponent
  },

  {
    path:'delete',
    component: UpdateAndDeleteComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
