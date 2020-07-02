import { Article } from "./../article";
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
  articleCommandes: Array<Article> = [];
  articlesCommandesSubject = new Subject<any[]>();
  articlesQte = 0;
  prixTotal = 0;
  constructor(private http: HttpClient) {}

  /* getArticles(): Observable<any> {
    return this.http.get<Array<Article>>(apiUrl + "articles").subscribe(data => {
      this.articles = data;
    });
  }*/

  getArticles(client: String): Observable<Article[]> {
    return this.http.get<Article[]>(apiUrl + "articles/" + client).pipe(
      tap((data) => {
        this.articles = data;
      })
    );
  }

  getArticlesCommandes() {
    return this.articleCommandes;
  }

  emitProductsSubject() {
    this.articlesSubject.next(this.articles.slice());
  }

  emitProductsCommandesSubject() {
    this.articlesCommandesSubject.next(this.articleCommandes.slice());
  }

  incrementQuantity(id) {
    var index = this.articles.findIndex((element) => element.artCodars === id);
    this.articles[index].qte = this.articles[index].qte + 1;
    this.emitProductsSubject();
  }

  updateQuantity(id, qte) {
    var index = this.articles.findIndex((element) => element.artCodars === id);
    this.articles[index].qte = qte;
    this.updateArticlesCommandes();
    this.emitProductsSubject();
  }

  decrementQuantity(id) {
    var index = this.articles.findIndex((element) => element.artCodars === id);
    if (this.articles[index].qte > 0)
      this.articles[index].qte = this.articles[index].qte - 1;
    this.emitProductsSubject();
  }

  enregistrer() {
    console.log("PRODUITS", JSON.stringify(this.articles));
  }

  updateArticlesCommandes() {
    //this.articleCommandes = [];
    this.articlesQte = 0;
    this.prixTotal = 0;
    this.articles.forEach((article) => {
      if (article.qte > 0) {
        this.articleCommandeContainsArticle(article.artCodars);
        this.articleCommandes.push(article);
      }
    });
    this.updateTotalQtyAndTotalPrice();
    this.emitProductsCommandesSubject();
  }

  getProductsCommanded(): Array<Article> {
    var articles: Array<Article> = [];
    this.articles.forEach((article) => {
      if (article.qte > 0) {
        articles.push(article);
      }
    });
    return articles;
  }

  articleCommandeContainsArticle(codars) {
    var index = this.articleCommandes.findIndex(
      (element) => element.artCodars === codars
    );
    if (index !== -1) {
      this.articlesQte -= this.articleCommandes[index].qte;
      this.prixTotal -= this.articleCommandes[index].qte * this.articleCommandes[index].pu;
      this.articleCommandes.splice(index, 1);
    }
  }

  updateTotalQtyAndTotalPrice(){{
    this.articlesQte = 0
    this.prixTotal = 0
    this.articleCommandes.forEach(element => {
      this.articlesQte += element.qte;
        this.prixTotal += element.qte * element.pu;
    })
  }

  }
}
