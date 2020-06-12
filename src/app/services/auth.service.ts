import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

//const apiUrl = 'http://10.112.1.17:8085/induction-api/';
const apiUrl = "http://localhost:8085/demo/";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  isLoggedIn:boolean;
  redirectUrl: string;
  token: String;

  constructor(private http: HttpClient) {}

  checkLogin(url: string): boolean {
    let token = localStorage.getItem('token');
    console.log("isLoggedIN", this.isLoggedIn);
    console.log("TOKEN", this.token);
    if (this.isLoggedIn && token != null) {
      return true;
    }
    this.redirectUrl = url;

    return false;
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "users/login", data).pipe(
      tap((_) => (this.isLoggedIn = true)),
      catchError(this.handleError("login", []))
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(apiUrl + "users/signout").pipe(
      tap((_) => (this.isLoggedIn = false)),
      catchError(this.handleError("logout", []))
    );
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "users/register", data).pipe(
      tap((_) => this.log("register")),
      catchError(this.handleError("register", []))
    );
  }

  getAllUser():Observable<any>{
    return this.http.get<any>(apiUrl + "users/utilisateurs").pipe(
      tap((_) => this.log("get users")),
      catchError(this.handleError("get users", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }

  getAllUtilisateurs(): Observable<any> {
    return this.http.get(apiUrl + "users/utilisateurs").pipe(
      tap((_) => this.log("utilisateurs")),
      catchError(this.handleError("get utilisateurs", []))
    );
  }

  getUtilisateurById(id: any): Observable<any> {
    return this.http.get(apiUrl + "users/utilisateurs" + "/" + id).pipe(
      tap((_) => this.log("utilisateur")),
      catchError(this.handleError("get utilisateur by ID", []))
    );
  }

  setIsloggedIn(value: boolean){
    this.isLoggedIn = value;
    console.log("isLoggedIN BEFORE CHECK", this.isLoggedIn);
  }
}
