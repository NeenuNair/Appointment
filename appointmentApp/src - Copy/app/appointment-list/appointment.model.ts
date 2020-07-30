export class AppointmentModel{
        constructor(
            public userId: string,
            public name : string,
            public age : number,
            public place : string,
            public phoneNumber : number,
            public date : any,
            public slot : string
          ){}
    }