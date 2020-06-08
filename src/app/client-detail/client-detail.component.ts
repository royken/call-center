import { ClientService } from './../services/client.service';
import { Materiel } from './../materiel';
import { Plainte } from './../plainte';
import { Client } from './../client';
import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  selectedClient: Client;

  plaintes: Plainte[];
  plaintesLoaded: boolean = false;

  materiels: Materiel[];
  materielsLoaded: boolean = false;

  constructor(private router: Router, private sharedDataService: SharedDataService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.sharedDataService.getClientRecord().subscribe(data => {
      this.selectedClient = data;
      console.log("DEST CLIENT", JSON.stringify(this.selectedClient))
      this.clientService.getMaterielClient(this.selectedClient.numero).subscribe(data => {
        this.materiels = data;
        this.materielsLoaded = true;
      })

      this.clientService.getPlaintesClient(this.selectedClient.numero).subscribe(data => {
        this.plaintes = data;
        this.plaintesLoaded = true;
      })
    })


  }

  gotoCommande(){
    console.log("hello")
    this.router.navigate(['detail-client','commande']);
  }

  gotoVentes(){
    this.router.navigate(['detail-client','ventes']);
  }

}
