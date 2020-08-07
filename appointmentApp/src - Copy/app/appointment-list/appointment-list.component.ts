import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from  './appointment.model';
import {AuthService} from '../auth.service';
import {AppConstants} from '../app-constants';
import {AppDepartments} from '../app-department';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  title:String = "Appointment List";
  appointments:AppointmentModel[];
  slot_values: any = AppConstants.time_slots;
  department_values: any = AppDepartments.department_slots;

  constructor(private appointmentService: AppointmentService ,private auth:AuthService) { }
  
  ngOnInit(): void {
    
   
    if(this.auth.userRole()=='user')
    {
      let id=  this.auth.userId();
      this.appointmentService.getAppointment(id).subscribe((data)=>{
        this.appointments=JSON.parse(JSON.stringify(data));
      if(this.appointments==null)
      {
        alert("Appointments List is Empty!")
      }
    })
    }
    else
    {
      if(this.auth.userRole()=='admin')
      {
        this.appointmentService.getAllAppointments().subscribe((data)=>{
          this.appointments=JSON.parse(JSON.stringify(data));
          if(this.appointments==null)
          {
            alert("Appointment List is Empty!!")
          }
        })
      }
      else
      {
        alert("Login with Some valid Credentials!!")
      }
    }
    
   
   
  }

    getSlotLabel(slotId){
      if(slotId){
        return this.slot_values.find(x => x.id == slotId).label;
      }
  }
  getDepartmentLabel(DepartmentId){
    if(DepartmentId){
      return this.department_values.find(x => x.ids == DepartmentId).labels;
    }
}
  
}


