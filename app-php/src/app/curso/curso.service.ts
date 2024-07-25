import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { Curso } from './curso';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  //URL
  url = "http://localhost/api/php/";

  //Vetor
  vetor : Curso[] = [];

  //Construtor
  constructor(private http:HttpClient) { }

  //Obter todos os curos
  obterCursos() : Observable<Curso[]>{
    return this.http.get<{ cursos: Curso[] }>(this.url+"listar").pipe(
      map((res) => {
        this.vetor = res.cursos;
        return this.vetor
      })
    )
  }
  
  //Cadastrar Curso
  cadastrarCurso(c:Curso) : Observable<Curso[]>{
    return this.http.post<CursoResponse>(this.url+'cadastrar', {curso:c})
    .pipe(
      map((res) => {
        this.vetor.push(...res.cursos);
        return this.vetor;
      })
    )
  }

//Remover curso
removerCurso(c: Curso): Observable<Curso[]> {
  let params = new HttpParams();

  if (c.idCurso !== null && c.idCurso !== undefined) {
    params = params.set("idCurso", c.idCurso.toString());
  } else {
    // Trate o caso onde idCurso é null ou undefined
    return new Observable<Curso[]>((observer) => {
      observer.error(new Error('idCurso é null ou undefined'));
      observer.complete();
    });
  }

  return this.http.delete<{ sucesso: boolean }>(this.url + 'excluir', { params: params })
    .pipe(
      map((res) => {
        if (res.sucesso) {
          // Filtra o vetor para remover o curso com o idCurso correspondente
          this.vetor = this.vetor.filter((curso) => {
            return curso.idCurso !== c.idCurso;
          });
        }
        return this.vetor;
      })
    );
}


}

interface CursoResponse {
  cursos : Curso[];
}


