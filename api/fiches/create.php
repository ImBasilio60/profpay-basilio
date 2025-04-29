<?php
include '../../db/config.php';
header('Content-Type: application/json');

// Récupérer les données JSON envoyées par la requête
$data = json_decode(file_get_contents("php://input"), true);

try {
    // Préparer la requête SQL pour insérer une fiche
    $stmt = $pdo->prepare("
        INSERT INTO fiches (REF, HEURE_SUPPL, ID_P, ID_T, ID_S)
        VALUES (:ref, :heure_suppl, :id_p, :id_t, :id_s)
    ");

    // Exécuter la requête
    $stmt->execute([
        'ref' => trim($data['REF']),
        'heure_suppl' => isset($data['HEURE_SUPPL']) ? $data['HEURE_SUPPL'] : null,
        'id_p' => isset($data['ID_P']) ? $data['ID_P'] : null,
        'id_t' => isset($data['ID_T']) ? $data['ID_T'] : null,
        'id_s' => isset($data['ID_S']) ? $data['ID_S'] : null
    ]);

    echo json_encode([
        'message' => 'Fiche ajoutée avec succès',
        'id'      => $pdo->lastInsertId()
    ]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Erreur de base de données : " . $e->getMessage()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}