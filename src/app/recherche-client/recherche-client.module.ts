import { RechercheClientRoutingModule } from './recherche-client-routing.module';
import { RechercheClientComponent } from './recherche-client.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    RechercheClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [],
  declarations: [
    RechercheClientComponent
  ],
  providers: [],
})
export class RechercheClientModule { }
