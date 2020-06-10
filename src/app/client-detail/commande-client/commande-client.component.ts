import { ArticleService } from "./../../services/article.service";
import { SharedDataService } from "./../../services/shared-data.service";
import { Client } from "./../../client";
import { Observable, of, from, BehaviorSubject, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { COMMANDES } from "./commandes";
import { Commande } from "./commande";
import { CommandeService } from "app/services/commande.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-commande-client",
  templateUrl: "./commande-client.component.html",
  styleUrls: ["./commande-client.component.scss"],
})
export class CommandeClientComponent implements OnInit {
  productsSubscription: Subscription;
  products: any[];
  produitsCommande: any[];
  closeResult = "";
  selectedClient: Client;
  articles: any[];
  articlesCommandes: any[];
  articleSubscription: Subscription;
  articleLoaded: boolean = false;

  constructor(
    private commandeService: CommandeService,
    private modalService: NgbModal,
    private sharedDataService: SharedDataService,
    private articleService: ArticleService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.sharedDataService.getClientRecord().subscribe((data) => {
      this.selectedClient = data;
    });

    this.articleService.getArticles().subscribe((_) => {
      this.articleSubscription = this.articleService.articlesSubject.subscribe(
        (articles: any[]) => {
          this.articles = articles;
          this.articleLoaded = true;
        }
      );
      this.articleService.emitProductsSubject();
    });
  }

  onAddQuantity(id) {
    this.articleService.incrementQuantity(id);
  }
  onRemoveQuantity(id) {
    this.articleService.decrementQuantity(id);
  }
  onSave() {
    this.commandeService.enregistrer();
  }
  ngOnDestroy() {
    this.articleSubscription.unsubscribe();
  }

  getProduitsCommande() {
    this.articlesCommandes = this.articleService.getProductsCommanded();
    console.log(JSON.stringify(this.articlesCommandes));
  }

  open(content) {
    this.getProduitsCommande();
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getArticleImage(codeProduit: String){
    console.log(codeProduit)
    return 'assets/img/produits/' + codeProduit + '.png';
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  goToClientDetailPage(){
    this.router.navigate(['detail-client']);
  }
}
