<?php
// api/create_notification.php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

try {
    $stmt = $pdo->prepare("INSERT INTO notifications (user_id, message, type, is_read)
                           VALUES (:user_id, :message, :type, :is_read)");
    $stmt->execute([
        'user_id' => $data['user_id'],
        'message' => $data['message'],
        'type'    => $data['type'],
        'is_read' => $data['is_read'] ?? 0
    ]);

    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}

