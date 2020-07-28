import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppointmentModel } from './appointment-list/appointment.model'

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private appointment:AppointmentModel;

  private _deleteAppointmentUrl ="http://localhost:3000/api/deleteAppointment"

  constructor(private http:HttpClient) { }

  getAppointments(){
    return this.http.get("http://localhost:3000/api/appointments");
  }

  newAppointment(item){
    return this.http.post("http://localhost:3000/api/insert",{"appointment":item});
    
  }

  updateAppointment(item){
    return this.http.post("http://localhost:3000/api/update",{"appointment":item})
    .subscribe(data =>{console.log(data)})
  }

  oneAppointment(id){
    return this.http.post("http://localhost:3000/api/oneAppointment",{"id":id})
  }

  deleteAppointment(id){
    console.log(id);
    return this.http.post(this._deleteAppointmentUrl,{"id":id}).subscribe((status)=>{
    console.log(status);

    })
    
  }
}