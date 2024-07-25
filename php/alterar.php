<?php

//Include the conection
include("conexao.php");

//Get data
$getData = file_get_contents("php://input");

//Extract data from json
$extrair = json_decode($getData);

//Split data from json
$idCurso = $extrair->cursos->idCurso;
$nomeCurso = $extrair->cursos->nomeCurso;
$valorCurso = $extrair->cursos->valorCurso;

//SQL
$sql = "UPDATE cursos SET nomeCurso='$nomeCurso', valorCurso=$valorCurso WHERE idCurso=$idCurso";
mysqli_query($conexao, $sql);

//Export registered data
$curso =  [
    'idCurso' => $idCurso,
    'nomeCurso' => $nomeCurso,
    'valorCurso' => $valorCurso
];

json_encode(['cursos'=>$curso]);

?>