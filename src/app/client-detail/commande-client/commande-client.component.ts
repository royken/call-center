import { Observable, of, from, BehaviorSubject, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { COMMANDES } from "./commandes";
import { Commande } from "./commande";
import { CommandeService } from "app/services/commande.service";

@Component({
  selector: "app-commande-client",
  templateUrl: "./commande-client.component.html",
  styleUrls: ["./commande-client.component.scss"],
})
export class CommandeClientComponent implements OnInit {
  productsSubscription: Subscription;
  //private _countries$ = new BehaviorSubject<Commande[]>([]);
  products: any[];

  constructor(private commandeService: CommandeService) {
    // this._countries$.next(COMMANDES);
  }

  ngOnInit(): void {
    this.productsSubscription = this.commandeService.produitsSubject.subscribe(
      (products: any[]) => {
        this.products = products;
      }
    );
    this.commandeService.emitProductsSubject();
  }

  onAddQuantity(id) {
    this.commandeService.incrementQuantity(id);
  }
  onRemoveQuantity(id) {
    this.commandeService.decrementQuantity(id);
  }
  onSave() {
    this.commandeService.enregistrer();
  }
  ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }
}
