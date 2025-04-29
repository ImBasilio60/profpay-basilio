<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

try {
    // Préparer la requête de mise à jour du salaire
    $stmt = $pdo->prepare("
        UPDATE salaires
        SET SBASE = :sbase, ID_C = :categorie
        WHERE ID_S = :id
    ");

    // Exécuter la requête avec les valeurs passées
    $stmt->execute([
        'sbase'    => trim($data['SBASE']),
        'categorie'=> trim($data['ID_C']),
        'id'       => trim($data['ID_S'])
    ]);

    echo json_encode([
        'message' => 'Salaire mis à jour avec succès'
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
