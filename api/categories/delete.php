<?php
include '../../db/config.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['ID_C']) || empty($data['ID_C'])) {
    echo json_encode(["error" => "L'identifiant ID_C est requis pour supprimer"]);
    exit;
}
try {
    $stmt = $pdo->prepare("DELETE FROM categories WHERE ID_C = :id_c");
    $stmt->execute(['id_c' => $data['ID_C']]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => "Catégorie supprimée avec succès"]);
    } else {
        echo json_encode(['message' => "Aucune catégorie trouvée avec l'ID donné"]);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
?>
