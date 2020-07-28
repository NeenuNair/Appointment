import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from  '../appointment-list/appointment.model';
import {AppConstants} from '../app-constants';
import {AppDepartments} from '../app-department';
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  title:String = "Add Appointment";
  minDate: Date;
  maxDate: Date;
  slot_values: any = AppConstants.time_slots;
  department_values: any = AppDepartments.department_slots;
  
  
 
  constructor(private appointmentService: AppointmentService, private router:Router) { 
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 2);

  }

  appointmentItem = new AppointmentModel(null,null,null,null,null,null);

  ngOnInit(): void {
  }
  AddAppointment()
  {
    console.log("Called");
    // let date=document.getElementById('adate')['value'].toLocaleDateString();
    // console.log(date)
    this.appointmentItem.date =this.appointmentItem.date.toLocaleDateString();
  // this.appointmentItem.date="07/30/2020"
    this.appointmentService.newAppointment(this.appointmentItem)
    .subscribe(
      (res:any)=>
      {
        if(res.message=="OK")
        {
          alert("Your Appointment added Successfully!!");
          this.router.navigate(['/delete']);
          console.log(this.appointmentItem.date);
        }
        else
        {
          alert("This Slot not available")
        }
      }
      )
    
    
  }

}
