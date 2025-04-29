<?php
include '../../db/config.php';
header('Content-Type: application/json');

try {
    // $stmt = $pdo->prepare("SELECT * FROM notifications WHERE user_id = :adminId ORDER BY id DESC");
    // $stmt->execute(['adminId' => 3]);
    $stmt = $pdo->query("SELECT * FROM notifications 
    INNER JOIN admins ON admins.id = notifications.user_id
    ORDER BY created_at DESC");

    $notifications = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($notifications ?: []);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
