import { CommandeService } from 'app/services/commande.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {

  commandes: Array<any> = [];

  displayedColumns: string[] = [
    "date",
    "client",
    "agent"
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  isLoadingResults = false;

  constructor(private spinner: NgxSpinnerService, private commandeService: CommandeService) { }

  ngOnInit(): void {
    this.commandeService.getAllCommandes().subscribe(data => {
      this.commandes = data;
      this.dataSource = new MatTableDataSource(this.commandes);
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
