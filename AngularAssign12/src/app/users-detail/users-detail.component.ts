import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.css']
})
export class UsersDetailComponent implements OnInit {
  //currentData:any;
  currentData={
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
// Added
   Role=[{key:1,name:'Admin'},{key:2,name:'Subscriber'},{key:3,name:'SuperAdmin'}];
   CustomersI=[{id:1,name:'Ankita'},{id:2,name:'Ankit'},{id:3,name:'Bhaibhav'}];
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
          this.currentData = data;
          const date=new Date(data.datetime);
          this.currentData.datetime=date.toISOString().slice(0,-5);
          console.log('data',data);
         // console.log('updatedata',this.updateData);
          console.log('currentdata',this.currentData);
        },
        error => {
          console.log(error);
        });
  }

  update(): void {
    this.usersService.editUser(this.currentData.id, this.currentData)
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
    this.usersService.deleteUser(this.currentData.id)
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
