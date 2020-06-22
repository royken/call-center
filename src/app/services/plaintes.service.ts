import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const apiUrl = "http://localhost:8085/demo/";
@Injectable({
  providedIn: "root",
})
export class PlainteService {

  constructor(private http: HttpClient) {}

  getAllPlaintes(): Observable<any> {
    return this.http.get(apiUrl + "plaintes");
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "plaintes/add", data).pipe(
      tap((_) => this.log("register plainte")),
      catchError(this.handleError("register plainte", []))
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

}
