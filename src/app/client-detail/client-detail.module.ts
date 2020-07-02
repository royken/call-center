import { ClientDetailComponent } from './client-detail.component';
import { ClientDetailRoutingModule } from './client-detail-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandeClientComponent } from './commande-client/commande-client.component';
import { VentesClientComponent } from './ventes-client/ventes-client.component';
import { ClientSurveyComponent } from './client-survey/client-survey.component';
import{MatButtonModule} from '@angular/material/button'
import{MatPaginatorModule} from '@angular/material/paginator'
import{MatTableModule} from '@angular/material/table'
import{MatIconModule} from '@angular/material/icon'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import{MatFormFieldModule} from '@angular/material/form-field';
import{MatInputModule} from '@angular/material/Input';




@NgModule({
  imports: [
    CommonModule,
    ClientDetailRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [],
  declarations: [
    ClientDetailComponent,
    CommandeClientComponent,
    VentesClientComponent,
    ClientSurveyComponent
  ],
  providers: [],
})
export class ClientDetailModule { }
