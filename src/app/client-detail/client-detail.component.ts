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

  constructor(private router: Router, private sharedDataService: SharedDataService) { }

  ngOnInit(): void {
    this.sharedDataService.getClientRecord().subscribe(data => {
      this.selectedClient = data;
    })
  }

  gotoCommande(){
    console.log("hello")
    this.router.navigate(['detail-client','commande']);
  }

}
