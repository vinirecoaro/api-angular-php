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
  cadastro() {
    this.cursoService.cadastrarCurso(this.curso).subscribe(
      (res: Curso[]) => {
        // Adicionando dados ao vetor
        this.vetor = res;
  
        // Limpar os atributos
        this.curso.nomeCurso = null;
        this.curso.valorCurso = null;
  
        // Atualizar a listagem
        this.selecao();
      },
      (error) => {
        console.error('Erro ao cadastrar curso:', error);
      }
    );
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
    this.cursoService.atualizarCurso(this.curso).subscribe(
      (res) => {
        
        //Atualizar vetor
        this.vetor = res;

        //Limpar os valores do objeto
        this.curso.nomeCurso = null
        this.curso.valorCurso = null

        //Atualizar a listagem
        this.selecao()

      }
    )
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

  //Selecionar curso especifico
  selecionarCurso(c:Curso){
    this.curso.idCurso = c.idCurso
    this.curso.nomeCurso = c.nomeCurso
    this.curso.valorCurso = c.valorCurso
  }

}
