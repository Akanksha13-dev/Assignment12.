import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Users } from 'src/app/users.model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  
  currentData = {

    id: '',
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    role: '',
    address: '',
    datetime:'',
    customersId:''
  }
  submitted = false;
  Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
  CustomersI=[{id:1,name:'Ankita'},{id:2,name:'Ankit'},{id:3,name:'Bhaibhav'}];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    
    console.log("data:",this.currentData);
    //console.log("Object1:",this.object1);
    this.usersService.addUser(this.currentData)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newUser(): void {
    this.submitted = false;
    this.currentData = {

      id: '',
      firstName: '',
      middleName:'',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
      address: '',
      datetime:'',
      customersId:''
    };
  }
  

}
