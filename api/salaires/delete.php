<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

try {
    // Préparer la requête pour supprimer un salaire
    $stmt = $pdo->prepare("DELETE FROM salaires WHERE ID_S = :id");

    // Exécuter la requête avec l'ID passé
    $stmt->execute([
        'id' => trim($data['id'])
    ]);

    echo json_encode([
        'message' => 'Salaire supprimé avec succès'
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
