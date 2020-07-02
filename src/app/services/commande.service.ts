import { Commande } from './../client-detail/commande-client/commande';
import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

const apiUrl = "http://localhost:8085/demo/";
@Injectable({
  providedIn: "root",
})
export class CommandeService {
  produitsSubject = new Subject<any[]>();
  private produits = [
    {
      id: 1,
      nom: "Produit 1",
      codesi: "1016",
      qte: 0,
      prixU: 1500,
    },
    {
      id: 2,
      nom: "Produit 2",
      codesi: "1014",
      qte: 0,
      prixU: 1400,
    },
    {
      id: 3,
      nom: "Produit 3",
      codesi: "1013",
      qte: 0,
      prixU: 1700,
    },
    {
      id: 4,
      nom: "Produit 4",
      codesi: "1013",
      qte: 0,
      prixU: 1600,
    },
    {
      id: 5,
      nom: "Produit 5",
      codesi: "1013",
      qte: 0,
      prixU: 1700,
    },
    {
      id: 6,
      nom: "Produit 6",
      codesi: "1013",
      qte: 0,
      prixU: 1600,
    },
    {
      id: 7,
      nom: "Produit 7",
      codesi: "1013",
      qte: 0,
      prixU: 1600,
    },
    {
      id: 8,
      nom: "Produit 8 ",
      codesi: "1013",
      qte: 0,
      prixU: 1600,
    },
    {
      id: 9,
      nom: "Produit 9",
      codesi: "1013",
      qte: 0,
      prixU: 1600,
    },
  ];

  constructor(private http: HttpClient) {}

  emitProductsSubject() {
    this.produitsSubject.next(this.produits.slice());
  }

  incrementQuantity(id) {
    this.produits[id - 1].qte = this.produits[id - 1].qte + 1;
    this.emitProductsSubject();
  }

  decrementQuantity(id) {
    if (this.produits[id - 1].qte > 0)
      this.produits[id - 1].qte = this.produits[id - 1].qte - 1;
    this.emitProductsSubject();
  }

  updateQuantity(id, qte){
    var i = 0;
    for(i = 0; i < this.produits.length;i++){
      console.log("Produit", JSON.stringify(this.produits[i]))
      if(this.produits[i].codesi === id){
        this.produits[i].qte = qte;
        console.log("found", JSON.stringify(this.produits[i]))
      }
    }
    this.emitProductsSubject();
  }

  enregistrer() {
    console.log("PRODUITS", JSON.stringify(this.produits));
  }

  getProductsCommanded(): Array<Commande>{
    var products: Array<Commande> = [];
    this.produits.forEach(produit => {
      if(produit.qte > 0){
        products.push(produit);
      }
    })
    return products;
  }

  getAllCommandes(): Observable<any> {
    return this.http.get(apiUrl + "commandes");
  }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl + "commandes/add", data).pipe(
      tap((_) => this.log("register commande")),
      catchError(this.handleError("register commande", []))
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
