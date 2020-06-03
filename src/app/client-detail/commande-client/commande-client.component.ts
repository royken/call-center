import { Observable, of, from, BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {COMMANDES} from './commandes';
import { Commande } from './commande';

@Component({
  selector: 'app-commande-client',
  templateUrl: './commande-client.component.html',
  styleUrls: ['./commande-client.component.scss']
})
export class CommandeClientComponent implements OnInit {



  produits2 = [

    {
      id: 1,
      nom: "Produit 1",
      codesi: "1016",
      qte: 0,
      prixU: 1500
    },
    {
      id: 2,
      nom: "Produit 2",
      codesi: "1014",
      qte: 0,
      prixU: 1400
    },
    {
      id: 3,
      nom: "Produit 3",
      codesi: "1013",
      qte: 0,
      prixU: 1700
    },
    {
      id: 4,
      nom: "Produit 4",
      codesi: "1013",
      qte: 0,
      prixU: 1600
    },
    {
      id: 5,
      nom: "Produit 5",
      codesi: "1013",
      qte: 0,
      prixU: 1700
    },
    {
      id: 6,
      nom: "Produit 6",
      codesi: "1013",
      qte: 0,
      prixU: 1600
    },
    {
      id: 7,
      nom: "Produit 7",
      codesi: "1013",
      qte: 0,
      prixU: 1600
    },
    {
      id: 8,
      nom: "Produit 8 ",
      codesi: "1013",
      qte: 0,
      prixU: 1600
    },
    {
      id: 9,
      nom: "Produit 9",
      codesi: "1013",
      qte: 0,
      prixU: 1600
    }
  ];

  products: Observable<Commande[]> ;
  private _countries$ = new BehaviorSubject<Commande[]>([]);

  constructor() {
    this._countries$.next(COMMANDES);
   }

  ngOnInit(): void {
    this.products = this.getProducts();
  }

  getProducts(): Observable<any[]>{
    return  this._countries$.asObservable();
  }

  augmenteItem(id){
    console.log(id)
    console.log("hello")
    this.products[id - 1].qte = this.products[id - 1].qte + 1;
    console.log("hello1");
   // console.log("PRODUITS", JSON.stringify(this.produits));
  }

  reduireItem(id){
    console.log(id);
    if(this.products[id - 1].qte > 0)
      this.products[id - 1].qte --;
  }

  enregistrer(){
    console.log("PRODUITS", JSON.stringify(this.products));
  }

}
