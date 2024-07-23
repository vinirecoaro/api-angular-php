import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';

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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  //Cadastro
  cadastro(){
    alert("Cadastro")
  }

  //Seleção
  selecao(){
    alert("Seleção")
  }

  //Alterar
  alterar(){
    alert("Alterar")
  }

  //Remover
  remover(){
    alert("Remover")
  }

}
