import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Despesa } from '../models/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  private getUrl: string = "http://localhost:8080/api/despesas"

  constructor(private _httpClient: HttpClient) { }

  getDespesas(): Observable<Despesa[]>{
    return this._httpClient.get<Despesa[]>(this.getUrl).pipe(
      map(response => response)
    )
  }

  saveDespesa(despesa: Despesa): Observable<Despesa>{
    return this._httpClient.post<Despesa>(this.getUrl,despesa)

  }

  deleteDespesa(id: number): Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/${id}`,{responseType: 'text'})

  }

}
