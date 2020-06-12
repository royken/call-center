import { ClientService } from './../services/client.service';
import { Materiel } from './../materiel';
import { Plainte } from './../plainte';
import { Client } from './../client';
import { SharedDataService } from './../services/shared-data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn, Validators } from '@angular/forms';
@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.scss']
})
export class ClientDetailComponent implements OnInit {

  selectedClient: Client;
  closeResult = "";

  plaintes: Plainte[];
  plaintesLoaded: boolean = false;

  materiels: Materiel[];
  materielsLoaded: boolean = false;
  typesPlainte = ['Materiel', 'Distribution', 'Facturation', 'Remise', 'Escroquerie'];
  plainteform: FormGroup;
  username: String = "";

  constructor(private router: Router, private sharedDataService: SharedDataService, private clientService: ClientService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

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

    this.plainteform = this.buildPlainteForm();


  }

  buildPlainteForm(){
    const form = this.formBuilder.group({
      description: ['', [ Validators.maxLength(200), Validators.minLength(5)]],
      typePlainte:  [null, [ Validators.required ] ],
    });
    return form;
  }

  open(content) {
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

  goToClientDetailPage(){
    this.router.navigate(['recherche-client']);
  }

  gotoCommande(){
    console.log("hello")
    this.router.navigate(['detail-client','commande']);
  }

  gotoVentes(){
    this.router.navigate(['detail-client','ventes']);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
