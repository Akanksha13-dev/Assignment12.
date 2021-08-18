import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any;
  

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
  }
  retrieveUsers(element:any): void {
    element.textContent='Refresh Data'
  //   this.users=[{
  //     "id":"1",
  //     "first__name": "Akanksha",
  //     "middle__name": "",
  //     "last__name": "Singh",
  //     "email": "singh@gmail.com",
  //     "phone_number": "9987654321",
  //     "role": 1,
  //     "address": "Bhopal",
  //     "datetime":"2020-2-3",
  //     "customer_Name":"ars"
  // },
  // {
  //     "id": "2",
  //     "first__name": "Jai",
  //     "middle__name": "Narayan",
  //     "last__name": "Singh",
  //     "email": "jns@gmail.com",
  //     "phone_number": "9087654321",
  //     "role": 0,
  //     "address": "Pune",
  //     "datetime":"2020-2-3",
  //     "customer_Name":"abs"

  // }]
    this.usersService.getUsers()
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }


}
