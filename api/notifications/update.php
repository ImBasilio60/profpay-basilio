<?php
// api/update_notification.php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

try {
    $stmt = $pdo->query("UPDATE notifications 
    SET is_read = 1 ");
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
