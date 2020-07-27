import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../appointment.service';
import { AppointmentModel } from  '../appointment-list/appointment.model';
import { Router, ActivatedRoute} from '@angular/router'


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  title:String = "Update Appointment List";
  appointmentItem = new AppointmentModel(null,null,null,null,null);
  id;
  sub;

  constructor(private appointmentService: AppointmentService, private router: Router, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {

    this.sub =
    this.activatedRoute.paramMap.subscribe((params)=>
            {
              this.id=params.get('id');
              console.log("id"+ this.id);
              this.appointmentService.oneAppointment(this.id).subscribe((data)=>
              {
                this.appointmentItem = JSON.parse(JSON.stringify(data));
                console.log(this.appointmentItem);
              });  
              console.log(this.appointmentItem);
            });
          }
  ngOnDestroy()   
    {
      this.sub.unsubscribe();
    }     

    updateAppointment()
    {
      console.log(this.appointmentItem);
      this.appointmentService.updateAppointment(this.appointmentItem);
      console.log("One appointment is updated successfully");
      alert("Your appointmentr Updated Successfully!!");
      this.router.navigate(['/']);
    }

  }
