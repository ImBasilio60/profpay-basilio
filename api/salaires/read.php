<?php
include '../../db/config.php';
header('Content-Type: application/json');

try {
    // Préparer la requête pour récupérer tous les salaires
    $stmt = $pdo->prepare("SELECT * FROM salaires
                            INNER JOIN 
                            categories ON categories.ID_C = salaires.ID_C 
                            ORDER BY
                            ID_S DESC");
    $stmt->execute();

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result ?: []);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
