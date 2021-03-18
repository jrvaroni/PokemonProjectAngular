import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

import { IPokemon } from '../../interfaces/Pokemon/Pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonServices {

  url = `${environment.baseUrl}`

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }


  getAllPokemons(pokemonCount = 151): Observable<any> {
    return this.httpClient.get<any>(`${this.url}pokemon/?limit=${pokemonCount}`, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getPokemon(url: string): Observable<IPokemon> {
    return this.httpClient.get<IPokemon>(url, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
