import { PlainteService } from './../services/plaintes.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-plainte',
  templateUrl: './plainte.component.html',
  styleUrls: ['./plainte.component.scss']
})
export class PlainteComponent implements OnInit {

  plaintes: Array<any> = [];

  displayedColumns: string[] = [
    "date",
    "client",
    "type",
    "description",
    "agent"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  isLoadingResults = false;

  constructor(private spinner: NgxSpinnerService, private plainteService: PlainteService) { }

  ngOnInit(): void {
    this.plainteService.getAllPlaintes().subscribe(data => {
      this.plaintes = data;
      this.dataSource = new MatTableDataSource(this.plaintes);
      this.isLoadingResults = true;
    })
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

}
