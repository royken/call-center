import { CommandeClientComponent } from './commande-client/commande-client.component';
import { ClientDetailComponent } from './client-detail.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ClientDetailComponent,
    data: {
      title: 'Fiche Client'
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
    path: 'commande',
    component: CommandeClientComponent,
    data: {
      title: 'Commande'
   }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientDetailRoutingModule { }
