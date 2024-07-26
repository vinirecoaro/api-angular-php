<?php

// Include the connection
include("conexao.php");

header('Content-Type: application/json');

// Get data
$getData = file_get_contents("php://input");

// Extract data from JSON
$extract = json_decode($getData);

// Check if the extraction was successful and properties exist
if ($extract === null || !isset($extract->curso->nomeCurso) || !isset($extract->curso->valorCurso)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

// Split data from JSON
$courseName = $extract->curso->nomeCurso;
$coursePrice = $extract->curso->valorCurso;

// SQL
$sql = "INSERT INTO cursos (nomeCurso, valorCurso) VALUES ('$courseName', '$coursePrice')";
$result = mysqli_query($conexao, $sql);

if ($result) {
    // Get the last inserted ID
    $lastId = mysqli_insert_id($conexao);
    
    // Prepare the response
    $course = [
        'idCurso' => $lastId,
        'nomeCurso' => $courseName,
        'valorCurso' => $coursePrice
    ];

    echo json_encode(['cursos' => [$course]]); // Return an array of courses
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to insert course', 'details' => mysqli_error($conexao)]);
}

// Close the connection
mysqli_close($conexao);

?>
