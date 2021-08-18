import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  //currentData:any;
  user:User={
    id: '',
    firstName: '',
    middleName:'',
    lastName: '',
    email: '',
    phoneNumber: '',
    role:'',
    roles: {key:'',name:''},
    address: '',
    datetime:'',
    customersId:'',
    customers:{id:'',name:'',address:'',website:''},
  };
  
  message='';
// Added list for drop down option for role and customerName field
   Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
   Customers=[{id:1,name:'Ankita'},{id:2,name:'Ankit'},{id:3,name:'Bhaibhav'}];
   //
  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserD((this.route.snapshot.paramMap.get('id')));
  }
  getUserD(id:any): void {
    console.log(id);
  
    this.usersService.getUser(id)
      .subscribe(
        data => {
          this.user = data;
          const date=new Date(data.datetime);
          this.user.datetime=date.toISOString().slice(0,-5);
          console.log('data',data);
         // console.log('updatedata',this.updateData);
          console.log('currentdata',this.user);
        },
        error => {
          console.log(error);
        });
  }

  update(): void {
    this.usersService.editUser(this.user.id, this.user)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The User was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  delete(): void {
    this.usersService.deleteUser(this.user.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

}
