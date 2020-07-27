import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from  '../appointment-list/appointment.model';
import { Router } from '@angular/router'

@Component({
  selector: 'app-new-appointment',
  templateUrl: './new-appointment.component.html',
  styleUrls: ['./new-appointment.component.css']
})
export class NewAppointmentComponent implements OnInit {
  title:String = "Add Appointment";
  // minDate: Date;
  // maxDate: Date;
  // book: Date;
 
  constructor(private appointmentService: AppointmentService, private router:Router) { 
    // this.minDate = new Date();
    // this.maxDate = new Date();
    // this.minDate.setDate(this.minDate.getDate());
    // this.maxDate.setDate(this.maxDate.getDate() + 2);
  }
  appointmentItem = new AppointmentModel(null,null,null,null,null);

  ngOnInit(): void {
  }
  AddAppointment()
  {
    
    this.appointmentService.newAppointment(this.appointmentItem)
    console.log("Called");
    alert("Your Appointment added Successfully!!");
    this.router.navigate(['/delete']);
  }

}
