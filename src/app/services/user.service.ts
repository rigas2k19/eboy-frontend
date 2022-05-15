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
  private usersUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient){}

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser(uname: string | null): Observable<User>{
    return this.http.get<User>(this.usersUrl+"/"+uname);
  }

}
