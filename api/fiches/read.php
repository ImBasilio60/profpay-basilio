<?php
include '../../db/config.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM 
    fiches
    INNER JOIN professeurs ON professeurs.ID_P = fiches.ID_P
    INNER JOIN salaires ON salaires.ID_S = fiches.ID_S
    INNER JOIN tauxhoraires ON tauxhoraires.ID_T = fiches.ID_T
    ORDER BY DATEF DESC");

    $fiches = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($fiches);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de lecture : " . $e->getMessage()]);
}
