import { AchatData } from '../../models/achat-data';
import { ClientService } from './../../services/client.service';
import { ArticleService } from "./../../services/article.service";
import { SharedDataService } from "./../../services/shared-data.service";
import { Client } from "./../../client";
import { Observable, of, from, BehaviorSubject, Subscription } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-ventes-client',
  templateUrl: './ventes-client.component.html',
  styleUrls: ['./ventes-client.component.scss']
})
export class VentesClientComponent implements OnInit {

  selectedClient: Client;

  histoAchatMois: Array<any>;
  histoAchatMoisLoaded: boolean = false;
  produitsMois: Array<any>;
  produitsMoisLoaded: boolean = false;
  histoAchat: Array<any>;
  histoAchatLoaded: boolean = false;
  histoRemise: Array<any>;
  histoRemiseLoaded: boolean = false;

  achatJourData: Array<AchatData> ;

  achatMoisData: Array<AchatData> ;

   monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
];

  constructor(private clientService: ClientService, private sharedDataService: SharedDataService,private router: Router) { }

  ngOnInit(): void {
    this.sharedDataService.getClientRecord().subscribe((data) => {
      this.selectedClient = data;
      //console.log("DEST CLIENT", JSON.stringify(this.selectedClient));
      var password = this.getPasswordFromClient(this.selectedClient.numero);
      this.clientService.getHistoAchatsAnnee(this.selectedClient.numero, password).subscribe(data => {
          this.histoAchat = data;
          this.computeAchatMoisData();
          this.histoAchatLoaded = true;
      })

      this.clientService.getHistoAchatsMois(this.selectedClient.numero, password).subscribe(data => {
          this.histoAchatMois = data;
          this.computeAchatJourData();
          this.histoAchatMoisLoaded = true;
      })

      this.clientService.getHistoRemise(this.selectedClient.numero, password).subscribe(data => {
          this.histoRemise = data;
          this.histoRemiseLoaded = true;
      })

      this.clientService.getProduitsAchatsMois(this.selectedClient.numero, password).subscribe(data => {
          this.produitsMois = data;
          this.produitsMoisLoaded = true;
      })
    });
  }



  getPasswordFromClient(numero: String): String{
    var hash = 0;
    var i = 0;
        for (i = 0; i < numero.length; i++) {
            hash += numero.charCodeAt(i) * (i + 1);
        }
        return hash.toString();
  }

  computeAchatJourData(){
    var d = new Date();
    var jour = d.getDate();
    console.log("JOUR", jour)
    this.achatJourData = Array<AchatData>(jour);
    console.log("TABLEAU AVANT", JSON.stringify(this.achatJourData));
    var i = 0;
    for(i = 0; i < jour; i++){
      this.achatJourData[i ] = new AchatData();
    }

    console.log("TABLEAU APRES", JSON.stringify(this.achatJourData));

    this.histoAchatMois.forEach(element => {
      console.log("DATE", element.jour - 1 )
      if(element.famille === "BIERE"){
        this.achatJourData[element.jour - 1].addBi(element.quantite);
    }

    if(element.famille === "BG"){
      this.achatJourData[element.jour - 1].addBg(element.quantite);
    }

    if(element.famille === "PET"){
      this.achatJourData[element.jour - 1].addPet(element.quantite);
    }
    this.achatJourData[element.jour - 1].addCA(element.montant);
    this.achatJourData[element.jour - 1].addProduit(element.produit + ": "+ element.quantite );
    })
  }

  computeAchatMoisData(){
    var d = new Date();
    var jour = d.getMonth() + 1;
    console.log("MOIS", jour)
    this.achatMoisData = Array<AchatData>(jour);
    console.log("TABLEAU MOIS AVANT", JSON.stringify(this.achatMoisData));
    var i = 0;
    for(i = 0; i < jour; i++){
      this.achatMoisData[i] = new AchatData();
    }
    console.log("TABLEAU MOIS APRES", JSON.stringify(this.achatMoisData));

    this.histoAchat.forEach(element => {
      console.log("DATE", element.jour - 1 )
      if(element.famille === "BIERE"){
        this.achatMoisData[element.jour - 1].addBi(element.quantite);
    }

    if(element.famille === "BG"){
      this.achatMoisData[element.jour - 1].addBg(element.quantite);
    }

    if(element.famille === "PET"){
      this.achatMoisData[element.jour - 1].addPet(element.quantite);
    }
    this.achatMoisData[element.jour - 1].addCA(element.montant);
    })

    console.log("VENTES MOIS", JSON.stringify(this.achatMoisData));
  }

  getMonthByNumber(i: number): String{
    return this.monthNames[i];
  }

  goToClientDetailPage(){
    this.router.navigate(['detail-client']);
  }

  getRemiseMois(): number{
    return this.histoRemise[this.histoRemise.length - 1].remise;
  }

  getChiffreAffaireMois(): number{
    return this.histoRemise[this.histoRemise.length - 1].chiffreAffaire;
  }

}
