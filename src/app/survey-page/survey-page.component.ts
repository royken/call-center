import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey',
  templateUrl: './survey-page.component.html',
  styleUrls: ['./survey-page.component.scss']
})
export class SurveyPageComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {
    console.log("HELLLLOOOOO")
  }

}
