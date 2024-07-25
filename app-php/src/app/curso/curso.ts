export class Curso {
  nomeCurso: string | null;
  valorCurso: number | null;
  idCurso?: number | null;

  constructor(nomeCurso: string | null = null, valorCurso: number | null = null, idCurso?: number | null) {
    this.nomeCurso = nomeCurso;
    this.valorCurso = valorCurso;
    this.idCurso = idCurso;
  }
}
