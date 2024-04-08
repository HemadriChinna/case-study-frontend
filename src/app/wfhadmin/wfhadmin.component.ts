import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wfhadmin',
  templateUrl: './wfhadmin.component.html',
  styleUrl: './wfhadmin.component.css'
})
export class WfhadminComponent {
  email: string = "";
  apiUrl : string = "";
  Token : string = "";
  responseData : any = "";
  startdate : Date ;
  enddate : Date;
  reason : string = "";
  employeeId : number;
  urlforid : string = "";
  responsedataforid : any;
  role : string = "";
  currentdate :string = new Date().toISOString().split('T')[0];
  ngOnInit(): void {
    if (localStorage.getItem("Token") == null || localStorage.getItem("Email") == null) {
      this.router.navigate(["/"]);
    }
    this.fetchWFH();
  }
  isStartDatePassed(startDate : string) : boolean{
    const start = new Date(startDate);
    const currentDate = new Date();
    return start<currentDate;
  }
  fetchWFH() {
    this.email = localStorage.getItem("Email");
    this.apiUrl = "http://localhost:8080/employees/projects/"+this.email;
    this.urlforid = "http://localhost:8080/email/"+this.email;
    this.Token = localStorage.getItem("Token");
    const httpOptions = {
      headers : new HttpHeaders({
        'Authorization': 'Basic ' + this.Token
      })
    };
    this.http.get(this.urlforid,httpOptions).subscribe(
      (data) => {
        this.responsedataforid = data;
        console.log(this.responsedataforid);
        this.role = this.responsedataforid.designation;
        this.role = this.role.toLowerCase();
          this.http.get(this.apiUrl,httpOptions).subscribe(
            (data) => {
              this.responseData = data;
              console.log(this.responseData);
              console.log(this.role);
            }
          )
      }
    )
}
  logout() {
  localStorage.clear();
  this.router.navigate(["/"]);
}
rejectWFH(itemId : number) {
  const httpOptions = {
    headers : new HttpHeaders({
      'Authorization': 'Basic ' + this.Token
    })
  };
  this.http.put('http://localhost:8080/reject/'+itemId,{},httpOptions).subscribe(
    (rejectresponse) => {console.log("Rejected Successfully",rejectresponse);
    this.fetchWFH();
    },
    (error) => {
      console.error("Error while rejecting :",error);
    }
  )
}
approveWFH(itemId : number) {
  const httpOptions = {
    headers : new HttpHeaders({
      'Authorization': 'Basic ' + this.Token
    })
  };
  this.http.put('http://localhost:8080/approve/'+itemId,{},httpOptions).subscribe(
    (approveresponse) => {console.log("approved successfully",approveresponse);
    this.fetchWFH();
    },
    (error) => {
      console.error('Error occurred while approving :', error);
    }
  );
}
  constructor(private router : Router,private http : HttpClient) {}
  clickLogo() {
    this.router.navigate(["/user-dashboard"]);
  }
  saveWFH() {
      this.employeeId = this.responsedataforid.employeeId;
      let workFromHomeData = {
        employeeId: this.responsedataforid.employeeId,
        startDate: this.startdate,
        endDate : this.enddate,
        reason: this.reason,
        email: this.email
      };
      const httpOptions = {
        headers : new HttpHeaders({
          'Authorization': 'Basic ' + this.Token
        })
      };
      this.http.post<any>('http://localhost:8080/saveWormFromHomes',[workFromHomeData],httpOptions)
      .subscribe(response => {
        console.log('Data sent successfully:', response);
        this.fetchWFH();
      }, 
      error => {
        console.error('Error occurred while sending data:', error);
      });
  }
  approveTask(task: any) {
    const httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Basic ' + this.Token
        })
    };

    const taskapi = "http://localhost:8080/saveWorkFromTask/" + task.id;
    const approveapi = 'http://localhost:8080/approveTask/'+task.id;

    this.http.put(taskapi, task, httpOptions).subscribe(
        (response) => {
            console.log("Task saved successfully", response);
            this.http.put(approveapi, {}, httpOptions).subscribe(
                (approveResponse) => {
                    console.log("Task approved successfully", approveResponse);
                    this.fetchWFH();
                },
                (approveError) => {
                    console.error('Error approving task:', approveError);
                }
            );
        },
        (error) => {
            console.error('Error saving task:', error);
        }
    );
}
}
