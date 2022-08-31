import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../model/user";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";



const httpOptions = {
  headers: new HttpHeaders({'Accept': 'application/json', 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn:'root'
})

export class UserService {
  private usersUrl = 'https://localhost:8443/users';
  private signupUrl = 'https://localhost:8443/signup'
  private approveUrl = 'https://localhost:8443/users/approve';
  private isApprovedUrl = 'https://localhost:8443/users/isApproved';

  user: User = new User();

  constructor(private http: HttpClient){}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(uname: string | null): Observable<User>{
    return this.http.get<User>(this.usersUrl+"/"+uname);
  }

  public addUser(user: User): Observable<User>{
    alert("added user: " + user.username);
    //return this.http.post<User>(this.usersUrl, user,);
    return this.http.post<User>(this.signupUrl, user,);
  }

  // Delete User //
  public deleteUser(uname: string): Observable<User>{
    return this.http.delete<User>(this.usersUrl+"/"+uname);
  }

  // Approve User //
  public approveUser(user: User): Observable<User>{
    return this.http.put<User>(this.approveUrl+"/"+user.username, user,);
  }

  public isApproved(username: string): Observable<User> {
    return this.http.get<User>(this.isApprovedUrl+"/"+username);
  }
}


