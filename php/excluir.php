<?php

// Include the connection
include("conexao.php");

header('Content-Type: application/json');

// Get the course ID from query parameters
if (!isset($_GET['idCurso'])) {
    echo json_encode(["sucesso" => false, "mensagem" => "Invalid input"]);
    exit();
}

// Split data from query parameters
$courseId = $_GET['idCurso'];

// SQL
$sql = "DELETE FROM cursos WHERE idCurso = $courseId";
$result = mysqli_query($conexao, $sql);

if ($result) {
    echo json_encode(["sucesso" => true]);
} else {
    echo json_encode(["sucesso" => false, "mensagem" => mysqli_error($conexao)]);
}
