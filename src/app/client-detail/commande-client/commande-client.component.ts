import { Observable, of, from, BehaviorSubject, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { COMMANDES } from "./commandes";
import { Commande } from "./commande";
import { CommandeService } from "app/services/commande.service";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-commande-client",
  templateUrl: "./commande-client.component.html",
  styleUrls: ["./commande-client.component.scss"],
})
export class CommandeClientComponent implements OnInit {
  productsSubscription: Subscription;
  //private _countries$ = new BehaviorSubject<Commande[]>([]);
  products: any[];
  produitsCommande: any[];
  closeResult = '';

  constructor(private commandeService: CommandeService, private modalService: NgbModal) {
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

  getProduitsCommande(){
    this.produitsCommande = this.commandeService.getProductsCommanded();
  }

  open(content) {
    this.getProduitsCommande();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  closeModal(){
    this.modalService.dismissAll();
  }

}
