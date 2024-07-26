import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators'
import { Curso } from './curso';
import { Observable, throwError } from 'rxjs';

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
  
  cadastrarCurso(c: Curso): Observable<Curso[]> {
    return this.http.post<{ cursos: Curso[] }>(this.url + 'cadastrar', { curso: c })
      .pipe(
        map((res) => {
          this.vetor.push(...res.cursos);
          return this.vetor;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Erro no serviço cadastrarCurso:', error);
          return throwError(error);
        })
      );
  }
  

//Remover curso
removerCurso(c: Curso): Observable<Curso[]> {
  let params = new HttpParams();

  if (c.idCurso !== null && c.idCurso !== undefined) {
    params = params.set("idCurso", c.idCurso.toString());
  } else {
    return new Observable<Curso[]>((observer) => {
      observer.error(new Error('idCurso é null ou undefined'));
      observer.complete();
    });
  }

  return this.http.delete<{ sucesso: boolean, mensagem?: string }>(this.url + 'excluir', { params: params })
    .pipe(
      map((res) => {
        if (res.sucesso) {
          this.vetor = this.vetor.filter((curso) => curso.idCurso !== c.idCurso);
        } else {
          console.error(res.mensagem);
        }
        return this.vetor;
      }),
      catchError(error => {
        console.error('Error removing course:', error);
        return throwError(error);
      })
    );
}

atualizarCurso(c: Curso): Observable<Curso[]> {
  // Executa a alteração via URL
  return this.http.put<{ cursos: Curso[] }>(this.url + 'alterar', { cursos: c })
    .pipe(
      map((res) => {
        const cursoAlterado = this.vetor.find((item) => item.idCurso === c.idCurso);

        // Alterar o valor do vetor local
        if (cursoAlterado) {
          cursoAlterado.nomeCurso = c.nomeCurso;
          cursoAlterado.valorCurso = c.valorCurso;
        }

        // Retorno
        return this.vetor;
      })
    );
}

}



