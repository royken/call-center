import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  gotoCommande(){
    console.log("hello")
    this.router.navigate(['detail-client','commande']);
  }

}
