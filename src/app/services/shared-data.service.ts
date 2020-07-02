import { Client } from "./../client";
import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SharedDataService {
  private message = new BehaviorSubject("First Message");
  sharedMessage = this.message.asObservable();


  public clientData: Client = {} as Client;
  private clientRecord: BehaviorSubject<Client> = new BehaviorSubject<Client>(
    this.clientData
  );

  constructor() {}

  public getClientRecord(): Observable<Client> {
    return this.clientRecord.asObservable();
  }
  public setClientRecord(client: Client): void {
    this.clientData = client;
    console.log("INTERM CLIENT", JSON.stringify(this.clientData))
    this.clientRecord.next(this.clientData);
  }

  nextMessage(message: string) {
    this.message.next(message);
  }


}
