import { AddEditUtilisateurComponent } from './add-edit-utilisateur/add-edit-utilisateur.component';
import { UtilisateurComponent } from './utilisateur.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: UtilisateurComponent,
    data: {
      title: 'Utilisateurs'
    },

    /* children: [
       {
         path: 'commande',
         component: CommandeClientComponent,
         data: {
           title: 'Commande'
        }
       }
     ]*/
  },
  {
    path: 'user-add',
    component: AddEditUtilisateurComponent,
    data: {
      title: 'Ajouter Utilisateur'
   }
  },
  {
    path: 'user-edit/:id',
    component: AddEditUtilisateurComponent,
    data: {
      title: 'Modifier Utilisateur'
   }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateurRoutingModule { }
