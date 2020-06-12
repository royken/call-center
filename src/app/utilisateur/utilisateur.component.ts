import { AuthService } from './../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  resultLoaded = false;
  isRateLimitReached = false;

  utilisateurs: Array<any>;

  public displayedColumns = ['nom', 'username', 'role', 'update', 'delete' ];
  public dataSource = new MatTableDataSource<any>();

  constructor(private router: Router,
    private service: AuthService) { }

  ngOnInit() {
    this.service.getAllUser().subscribe((data: Array<any>) => {
      this.utilisateurs = data;
      this.dataSource.data = data;
      this.resultLoaded = true;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public filtrer = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  gotoEditer(item) {
    console.log(JSON.stringify(item));
    this.router.navigate(['users',"user-edit", item.id]);
  }

  gotoAjouter() {
    this.router.navigate(['users',"user-add"]);
  }

}
