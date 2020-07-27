import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from  './appointment.model';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router'

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  title:String = "Appointment List";
  appointments:AppointmentModel[];

  constructor(private appointmentService: AppointmentService) { }
  
  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((data)=>{
      this.appointments=JSON.parse(JSON.stringify(data));
    })
  }

}

