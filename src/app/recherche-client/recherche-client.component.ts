import { Client } from "./../client";
import { SharedDataService } from "./../services/shared-data.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { isNumeric } from "rxjs/util/isNumeric";
import Swal from "sweetalert2";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as SurveyCreator from "survey-creator";
import { ClientService } from "./../services/client.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-recherche-client",
  templateUrl: "./recherche-client.component.html",
  styleUrls: ["./recherche-client.component.scss"],
})
export class RechercheClientComponent implements OnInit {
  numeroDeCompte: string;
  nomClient: string;
  clientsLoaded: boolean = false;
  rechercheForm: FormGroup;
  listClients: Client[];

  displayedColumns: string[] = [
    "code",
    "nom",
    "adresse",
    "quartier",
    "regime",
    "categorie",
    "action",
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  isLoadingResults = false;

  options = {
    showLogicTab: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private sharedDataService: SharedDataService,
    private spinner: NgxSpinnerService
  ) {
    var creator = new SurveyCreator.SurveyCreator(
      "creatorElement",
      this.options
    );
    //Show toolbox in the right container. It is shown on the left by default
    creator.showToolbox = "right";
    //Show property grid in the right container, combined with toolbox
    creator.showPropertyGrid = "right";
    //Make toolbox active by default
    creator.rightContainerActiveItem("toolbox");
  }

  ngOnInit(): void {
    var clientsExists = this.clientService.isClientLoaded();
    if (clientsExists) {
      this.listClients = this.clientService.getListClients();
      this.dataSource = new MatTableDataSource(this.listClients);
      this.dataSource.paginator = this.paginator;
      this.clientsLoaded = true;
    }

    this.rechercheForm = this.formBuilder.group({
      numeroDeCompte: ["", [Validators.maxLength(10), Validators.minLength(5)]],
      nomClient: ["", [Validators.maxLength(20), Validators.minLength(3)]],
    });
  }

  initialize() {
    this.numeroDeCompte = null;
    this.nomClient = null;
  }

  rechercheByNumero() {
    console.log("Numero", this.rechercheForm.value.numeroDeCompte);
    /*Swal.fire({
      title: 'Error!',
      text: 'L\'organe est obligatoire',
      icon: 'error',
      confirmButtonText: 'Fermer'
    })*/
  }

  rechercheByNom() {
    console.log("Nom", this.rechercheForm.value.nomClient);
    /*Swal.fire(
      'Enregistrement!',
      'Sous Organe ' + data.nom + ' enregistré!',
      'success'
    )*/
  }

  rechercheByNomAndNumero() {
    var numero: string = this.rechercheForm.value.numeroDeCompte;
    var nomClient: string = this.rechercheForm.value.nomClient;
    if (numero.length == 0 && nomClient.length == 0) {
      this.showErrorToast("Veuillez saisir numéro et/ou nom client");
      return;
    }

    if (numero.length == 0 && nomClient.length != 0) {
      // recherche par nom
      if (nomClient.length < 3 || nomClient.length > 20) {
        this.showErrorToast(
          "La longueur du nom doit être comprise entre 3 et 20"
        );
        return;
      }

      this.showSpinner();
      this.clientService.rechercheByNom(nomClient).subscribe((data) => {
        this.listClients = data;
        this.dataSource = new MatTableDataSource(this.listClients);
        this.dataSource.paginator = this.paginator;
        this.clientsLoaded = true;
        this.registerListInService();
        this.spinner.hide();
      });
      return;
    }

    if (nomClient.length == 0 && numero.length != 0) {
      // recherche par numero
      if (numero.length < 5 || numero.length > 10) {
        this.showErrorToast(
          "La longueur du numéro doit être comprise entre 5 et 10"
        );
        return;
      }
      if (!isNumeric(numero)) {
        this.showErrorToast("Le numéro de compte doit être un nombre");
        return;
      }

      this.showSpinner();

      this.clientService.rechercheByNumero(numero).subscribe((data) => {
        this.listClients = data;
        this.dataSource = new MatTableDataSource(this.listClients);
        this.dataSource.paginator = this.paginator;
        this.clientsLoaded = true;
        this.registerListInService();
        this.spinner.hide();
      });
      return;
    } else {
      if (nomClient.length < 3 || nomClient.length > 20) {
        this.showErrorToast(
          "La longueur du nom doit être comprise entre 3 et 20"
        );
        return;
      }
      if (numero.length < 5 || numero.length > 10) {
        this.showErrorToast(
          "La longueur du numéro doit être comprise entre 5 et 10"
        );
        return;
      }
      if (!isNumeric(numero)) {
        this.showErrorToast("Le numéro de compte doit être un nombre");
        return;
      }

      this.showSpinner();

      this.clientService
        .rechercheByNomAndNumero(nomClient, numero)
        .subscribe((data) => {
          this.listClients = data;
          this.dataSource = new MatTableDataSource(this.listClients);
          this.dataSource.paginator = this.paginator;
          this.clientsLoaded = true;
          this.registerListInService();
          this.spinner.hide();

        });
      return;
    }
    //  console.log("Deux", this.numeroDeCompte);
    // this.router.navigate(["detail-client"]);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  gotoClientDetail(client: Client) {
    console.log("CLIENT", JSON.stringify(client));
    this.sharedDataService.setClientRecord(client);
    this.router.navigate(["detail-client"]);
  }

  showSpinner() {
    this.spinner.show(undefined, {
      type: "ball-triangle-path",
      size: "medium",
      bdColor: "rgba(0, 0, 0, 0.8)",
      color: "#fff",
      fullScreen: true,
    });
  }

  showErrorToast(errorMessage: string) {
    Swal.fire("Recherche!", errorMessage, "error");
  }

  registerListInService(){
    this.clientService.setListClient(this.listClients);
    this.clientService.setClientsLoaded(true);
  }
}
