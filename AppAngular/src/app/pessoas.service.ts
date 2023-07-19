import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pessoa } from './Pessoa';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PessoasService {
  url = 'https://localhost:5001/api/pessoas';

  constructor(private http : HttpClient) { }

  getAll(): Observable<Pessoa[]>{
    return this.http.get<Pessoa[]>(this.url);
  }

  getId(pessoaId: number): Observable<Pessoa>{
    const apiUrl = `${this.url}/${pessoaId}`;
    return this.http.get<Pessoa>(apiUrl);
  }

  savePerson(pessoa: Pessoa) : Observable<any>{
    return this.http.post<Pessoa>(this.url, pessoa, httpOptions)
  }

  updatePerson(pessoa: Pessoa) : Observable<any>{
    return this.http.put<Pessoa>(this.url, pessoa, httpOptions)
  }

  deletePerson(pessoaId: Pessoa) : Observable<any>{
    const apiUrl = `${this.url}/${pessoaId}`
    return this.http.delete<number>(apiUrl, httpOptions)
  }
}
