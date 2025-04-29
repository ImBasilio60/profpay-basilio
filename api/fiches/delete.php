<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['id_f']) || empty($data['id_f'])) {
    echo json_encode(["error" => "ID_F est requis pour la suppression."]);
    exit;
}

try {
    $stmt = $pdo->prepare("DELETE FROM fiches WHERE ID_F = :id_f");
    $stmt->execute(['id_f' => $data['id_f']]);

    echo json_encode(["message" => "Fiche supprimée avec succès"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de suppression : " . $e->getMessage()]);
}
