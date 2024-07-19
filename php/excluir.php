<?php

//Include the conection
include("conexao.php");

//Get data
$getData = file_get_contents("php://input");

//Extract data from json
$extract = json_decode($getData);

//Split data from json
$courseId = $extract->cursos->idCurso;

//SQL
$sql = "DELETE from cursos WHERE idCurso=$courseId";
mysqli_query($conexao, $sql);

?>