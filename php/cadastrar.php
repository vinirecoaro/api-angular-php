<?php

//Include the conection
include("conexao.php");

//Get data
$getData = file_get_contents("php://input");

//Extract data from json
$extract = json_decode($getData);

//Split data from json
$courseName = $extract->cursos->nomeCurso;
$coursePrice = $extract->cursos->valorCurso;

//SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$courseName', '$coursePrice')";
mysqli_query($conexao, $sql);

//Export registered data
$course =  [
    'nomeCurso' => $courseName,
    'valorCurso' => $coursePrice
];

json_encode(['cursos'=>$course]);

?>