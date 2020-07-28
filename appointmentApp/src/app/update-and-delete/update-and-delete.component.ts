import { Component, OnInit } from '@angular/core';
import { AppointmentModel } from '../appointment-list/appointment.model';
import { AppointmentService } from '../appointment.service';
import {AppConstants} from '../app-constants';
import {AppDepartments} from '../app-department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-and-delete',
  templateUrl: './update-and-delete.component.html',
  styleUrls: ['./update-and-delete.component.css']
})
export class UpdateAndDeleteComponent implements OnInit {

  title:String = "Update or Delete Appointment List";
  appointments: AppointmentModel[];
  slot_values: any = AppConstants.time_slots;
  department_values: any = AppDepartments.department_slots;

  

deleteAppointment(id){
  console.log("deleted" + id);
  this.appointmentService.deleteAppointment(id);
  alert("Are you sure to delete this Appointment?");
  this.router.navigate(['/']);

}

  constructor(private appointmentService: AppointmentService, private router: Router) { 
  }

  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe((data)=>{
      this.appointments=JSON.parse(JSON.stringify(data));
    })
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
