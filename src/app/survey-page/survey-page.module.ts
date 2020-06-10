import { SurveyComponent } from '../components/survey.component';
import { SurveyCreatorComponent } from '../components/survey.creator.component';
import { SurveyPageComponent } from './survey-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,


  ],
  exports: [],
  declarations: [
    SurveyPageComponent,
    SurveyComponent,
    SurveyCreatorComponent
  ],
  providers: [],
})
export class SurveyPageModule { }
