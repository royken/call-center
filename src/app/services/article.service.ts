import { Article } from './../article';
import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Subject } from "rxjs/Subject";

const apiUrl = "http://localhost:8085/bracongo-api/";
@Injectable({
  providedIn: "root",
})
export class ArticleService {
  articlesSubject = new Subject<any[]>();
  articles: Array<Article>;
  constructor(private http: HttpClient) {}

 /* getArticles(): Observable<any> {
    return this.http.get<Array<Article>>(apiUrl + "articles").subscribe(data => {
      this.articles = data;
    });
  }*/

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl + "articles")
      .pipe(
        tap(data => {this.articles = data}),
      );
  }

  emitProductsSubject() {
    this.articlesSubject.next(this.articles.slice());
  }

  incrementQuantity(id) {
    var index = this.articles.findIndex(element => element.artCodars === id);
    this.articles[index].qte = this.articles[index].qte + 1;
    this.emitProductsSubject();

  }

  decrementQuantity(id) {
    var index = this.articles.findIndex(element => element.artCodars === id);
    if (this.articles[index].qte > 0)
      this.articles[index].qte = this.articles[index].qte - 1;
    this.emitProductsSubject();
  }

  enregistrer() {
    console.log("PRODUITS", JSON.stringify(this.articles));
  }

  getProductsCommanded(): Array<Article>{
    var articles: Array<Article> = [];
    this.articles.forEach(article => {
      if(article.qte > 0){
        articles.push(article);
      }
    })
    return articles;
  }

}
