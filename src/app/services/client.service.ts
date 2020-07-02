import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";

const apiUrl = "//localhost:8085/bracongo-api/";
@Injectable({
  providedIn: "root",
})
export class ClientService {

   private clientsLoaded: boolean = false;

   private clientsList = [];

  constructor(private http: HttpClient) {}

  rechercheByNumero(numero: any): Observable<any> {
    return this.http.get(apiUrl + "clients/recherchebyNumero" + "/" + numero);
  }

  rechercheByNom(nom: any): Observable<any> {
    return this.http.get(apiUrl + "clients/recherchebyNom" + "/" + nom);
  }

  rechercheByNomAndNumero(nom: string, numero: string): Observable<any> {
    return this.http.get(
      apiUrl + "clients/recherchebyNumeroAndNom" + "/" + nom + "/" + numero
    );
  }

  getPlaintesClient(numero: string): Observable<any> {
    return this.http.get(apiUrl + "plaintes/maryse/client" + "/" + numero);
  }

  getMaterielClient(numero: string): Observable<any> {
    return this.http.get(apiUrl + "materiels/maryse/client" + "/" + numero);
  }

  getHistoRemise(numero: String, password: String): Observable<any> {
    return this.http.get(
      apiUrl + "achats/remise/histo" + "/" + numero + "/" + password
    );
  }

  getHistoAchatsMois(numero: String, password: String): Observable<any> {
    return this.http.get(apiUrl + "achats" + "/" + numero + "/" + password);
  }

  getProduitsAchatsMois(numero: String, password: String): Observable<any> {
    return this.http.get(
      apiUrl + "achats/produits" + "/" + numero + "/" + password
    );
  }

  getHistoAchatsAnnee(numero: String, password: String): Observable<any> {
    return this.http.get(
      apiUrl + "achats/annee" + "/" + numero + "/" + password
    );
  }

  isClientLoaded():boolean{
    return this.clientsLoaded;
  }

  setClientsLoaded(loaded: boolean){
    this.clientsLoaded = loaded;
  }

  getListClients():Array<any>{
    return this.clientsList;
  }

  setListClient(clients: Array<any>){
    this.clientsList = clients;
  }
}
