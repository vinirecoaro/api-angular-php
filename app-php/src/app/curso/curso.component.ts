import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  //URL base
  url = "http://localhost/api/php/";

  //vetor de cursos
  vetor : Curso[] = [];

  curso = new Curso();

  constructor(private cursoService : CursoService) { }

  ngOnInit(): void {
    this.selecao();
  }

  //Cadastro
  cadastro(){
    this.cursoService.cadastrarCurso(this.curso).subscribe(
      (res:Curso[]) => {

        //Adicionando dados ao vetor
        this.vetor = res

        //Limpar os atributos
        this.curso.nomeCurso = null
        this.curso.valorCurso = null
      }
    )
  }

  //Seleção
  selecao(){
    this.cursoService.obterCursos().subscribe(
      (res: Curso[]) => {
        this.vetor = res;
      }
    );
  }
  

  //Alterar
  alterar(){
    alert("Alterar")
  }

  //Remover
  remover(){
    this.cursoService.removerCurso(this.curso).subscribe(
      (res : Curso[]) => {
        this.vetor = res;

        this.curso.nomeCurso = null
        this.curso.valorCurso = null
      }
    )
  }

}
