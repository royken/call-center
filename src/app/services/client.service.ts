import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const apiUrl = "http://localhost:8085/bracongo-api/";
@Injectable({
  providedIn: "root",
})
export class ClientService {
  constructor(private http: HttpClient) {}

  rechercheByNumero(numero: any): Observable<any> {
    return this.http.get(apiUrl + "clients/recherchebyNumero" + "/" + numero);
  }

  rechercheByNom(nom: any): Observable<any> {
    return this.http.get(apiUrl + "clients/recherchebyNom" + "/" + nom);
  }

  rechercheByNomAndNumero(nom: string, numero: string): Observable<any> {
    return this.http.get(apiUrl + "clients/recherchebyNumeroAndNom" + "/" + nom + '/' + numero);
  }

}
