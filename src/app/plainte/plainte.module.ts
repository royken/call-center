import { PlainteRoutingModule } from './plainte-routing.module';
import { PlainteComponent } from './plainte.component';
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
import { NgxSpinnerModule } from 'ngx-spinner';




@NgModule({
  imports: [
    CommonModule,
    PlainteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxSpinnerModule
  ],
  exports: [],
  declarations: [
    PlainteComponent
  ],
  providers: [],
})
export class PlainteModule { }
