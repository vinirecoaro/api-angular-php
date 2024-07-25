export class Curso {
    nomeCurso: string;
    valorCurso: number;
    idCurso?: number;
  
    constructor(nomeCurso: string = '', valorCurso: number = 0, idCurso?: number) {
      this.nomeCurso = nomeCurso;
      this.valorCurso = valorCurso;
      if (idCurso !== undefined) {
        this.idCurso = idCurso;
      }
    }
  }
  