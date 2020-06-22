import { ArticleService } from "./../../services/article.service";
import { SharedDataService } from "./../../services/shared-data.service";
import { Client } from "./../../client";
import { Observable, of, from, BehaviorSubject, Subscription } from "rxjs";
import { Component, OnInit, ɵConsole } from "@angular/core";
import { COMMANDES } from "./commandes";
import { Commande } from "./commande";
import { CommandeService } from "app/services/commande.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

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
    //console.log(codeProduit)
    return 'assets/img/produits/' + codeProduit + '.png';
  }

  closeModal() {
    let user=localStorage.getItem('username');
    var commandeItems = this.getCommandeItems();
    var commande = {
      client: this.selectedClient.numero,
      username: user,
      items: commandeItems
    }

    this.commandeService.register(commande).subscribe(data => {
      this.modalService.dismissAll();
      if(data.id == null){
        this.showErrorToast("Erreur d'enregistrement")
      }
      else{
        this.showSuccessToast("Commande Enregistrée")
      }
    })
    this.modalService.dismissAll();

  }

  goToClientDetailPage(){
    this.router.navigate(['detail-client']);
  }

  getCommandeItems(): Array<any>{
    var commandeItems: Array<any> = [];
    this.articlesCommandes.forEach(item => {
      var commandeItem = {
        nomProduit: item.artDesign,
        quantite: item.qte,
        codeProduit: item.artCodars
      }
      commandeItems.push(commandeItem);
    })
    return commandeItems;
  }

  showErrorToast(errorMessage: string) {
    Swal.fire("Commande!", errorMessage, "error");
  }

  showSuccessToast(successMessage: string) {
    Swal.fire("Commande!", successMessage, "success");
  }
}
