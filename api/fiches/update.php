<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

// Vérifie que l'ID_F est présent
if (!isset($data['id_f']) || empty($data['id_f'])) {
    echo json_encode(["error" => "ID_F est requis pour la modification."]);
    exit;
}

// Vérifie que REF est fourni
if (!isset($data['ref']) || empty(trim($data['ref']))) {
    echo json_encode(["error" => "Le champ REF est obligatoire."]);
    exit;
}

try {
    $stmt = $pdo->prepare("
        UPDATE fiches 
        SET REF = :ref, HEURE_SUPPL = :heure_suppl, ID_P = :id_p, ID_T = :id_t, ID_S = :id_s 
        WHERE ID_F = :id_f
    ");

    $stmt->execute([
        'ref' => trim($data['ref']),
        'heure_suppl' => $data['heure_suppl'] ?? null,
        'id_p' => $data['id_p'] ?? null,
        'id_t' => $data['id_t'] ?? null,
        'id_s' => $data['id_s'] ?? null,
        'id_f' => $data['id_f']
    ]);

    echo json_encode(["message" => "Fiche mise à jour avec succès"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de mise à jour : " . $e->getMessage()]);
}
