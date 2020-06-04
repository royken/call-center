import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import * as SurveyCreator from "survey-creator";

@Component({
  selector: "app-recherche-client",
  templateUrl: "./recherche-client.component.html",
  styleUrls: ["./recherche-client.component.scss"],
})
export class RechercheClientComponent implements OnInit {
  numeroDeCompte: string;
  nomClient: string;
  clientsLoaded: Boolean = false;
  rechercheForm: FormGroup;

  options = {
    showLogicTab: true,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    var creator = new SurveyCreator.SurveyCreator("creatorElement", this.options);
    //Show toolbox in the right container. It is shown on the left by default
    creator.showToolbox = "right";
    //Show property grid in the right container, combined with toolbox
    creator.showPropertyGrid = "right";
    //Make toolbox active by default
    creator.rightContainerActiveItem("toolbox");
  }

  ngOnInit(): void {
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
    console.log("Nom", this.nomClient);
    /*Swal.fire(
      'Enregistrement!',
      'Sous Organe ' + data.nom + ' enregistré!',
      'success'
    )*/
  }

  rechercheByNomAndNumero() {
    console.log("Deux", this.numeroDeCompte);
    this.router.navigate(["detail-client"]);
  }
}
