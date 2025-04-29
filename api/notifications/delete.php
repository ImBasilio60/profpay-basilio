<?php
// api/delete_notification.php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

try {
    $stmt = $pdo->prepare("DELETE FROM notifications WHERE id = :id");
    $stmt->execute(['id' => $data['id']]);

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
