import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-add-edit-utilisateur',
  templateUrl: './add-edit-utilisateur.component.html',
  styleUrls: ['./add-edit-utilisateur.component.scss']
})
export class AddEditUtilisateurComponent implements OnInit {
  utilisateurForm: FormGroup;
  isEdit: boolean = false;
  isLoading: boolean;
  utilisateur: any;
  roles = ["SUPER_ADMIN", "ADMIN", "USER"];
  idUser: string;

  constructor(private router: Router,
    private service: AuthService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.idUser = id;
      this.isEdit = true;
      this.service.getUtilisateurById(this.idUser).subscribe((data: any) => {
        this.utilisateur = data;
        this.utilisateurForm = this.buildForm(this.utilisateur);
      });
    } else {
      this.utilisateur = {};
      this.utilisateurForm = this.buildForm(this.utilisateur);
    }
  }

  buildForm(utilisateur: any){
    const form = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      role:  ['', [ Validators.required ] ],
    });

    form.patchValue({
      nom: this.utilisateur.nom,
      username: this.utilisateur.username,
      password: this.utilisateur.password,

   });
    return form;
  }

  saveUtilisateur(){
    if(this.utilisateurForm.status === 'INVALID'){
      return null;
    }
    const utilisateur = {
      'id': null,
      'nom' : this.utilisateurForm.value.nom,
      'username' : this.utilisateurForm.value.username,
      'password' : this.utilisateurForm.value.password,
      'role': this.utilisateurForm.value.role
    }
    if(this.isEdit)
    utilisateur.id = this.idUser;
    console.log("USER", JSON.stringify(utilisateur))
    this.service.register(utilisateur).subscribe(() => {
      this.router.navigate(['/users'])
    })

  }

  onBack(){
    this.router.navigate(['/users']);
  }

}
