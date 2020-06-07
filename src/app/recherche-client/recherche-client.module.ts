import { ClientService } from './../services/client.service';
import { RechercheClientRoutingModule } from './recherche-client-routing.module';
import { RechercheClientComponent } from './recherche-client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    RechercheClientRoutingModule,
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
    RechercheClientComponent
  ],
  providers: [ClientService],
})
export class RechercheClientModule { }
