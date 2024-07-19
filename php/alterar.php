<?php

//Include the conection
include("conexao.php");

//Get data
$getData = file_get_contents("php://input");

//Extract data from json
$extract = json_decode($getData);

//Split data from json
$courseId = $extract->cursos->idCurso;
$courseName = $extract->cursos->nomeCurso;
$coursePrice = $extract->cursos->valorCurso;

//SQL
$sql = "UPDATE cursos SET nomeCurso='$courseName', valorCurso=$coursePrice WHERE idCurso=$courseId";
mysqli_query($conexao, $sql);

//Export registered data
$course =  [
    'idCurso' => $courseId,
    'nomeCurso' => $courseName,
    'valorCurso' => $coursePrice
];

json_encode(['cursos'=>$course]);

?>