<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

try {
    // Préparer la requête d'insertion dans la table salaires
    $stmt = $pdo->prepare("
        INSERT INTO salaires (SBASE, ID_C)
        VALUES (:sbase, :categorie)
    ");

    $stmt->execute([
        'sbase'     => trim($data['SBASE']),
        'categorie' => trim($data['ID_C'])
    ]);

    echo json_encode([
        'message' => 'Salaire ajouté avec succès',
        'id'      => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
