<?php
include '../../db/config.php';
header('Content-Type: application/json');
$data = json_decode(file_get_contents("php://input"), true);
if (!isset($data['id'])) {
    echo json_encode(["error" => "ID requis"]);
    exit;
}
try {
    $stmt = $pdo->prepare("DELETE FROM professeurs WHERE ID_P = :id");
    $stmt->execute(['id' => $data['id']]);
    if ($stmt->rowCount() > 0) {
        echo json_encode(['message' => 'Item supprimé avec succès']);
    } else {
        echo json_encode(['message' => 'Aucun élément trouvé pour cet ID']);
    }
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}