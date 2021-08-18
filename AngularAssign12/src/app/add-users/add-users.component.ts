import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
//import { User } from 'src/app/user.model';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {
  
  user = {

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
  // Added list for drop down option for role and customerName field

  Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
  Customers=[{id:1,name:'Ankita'},{id:2,name:'Ankit'},{id:3,name:'Bhaibhav'}];

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }

  saveUser(): void {
    
    console.log("data:",this.user);
    //console.log("Object1:",this.object1);
    this.usersService.addUser(this.user)
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
    this.user = {

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
