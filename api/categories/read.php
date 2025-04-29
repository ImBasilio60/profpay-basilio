<?php
// api/read.php
include '../../db/config.php';
header('Content-Type: application/json');

try {
    $stmt = $pdo->query("SELECT * FROM categories ORDER BY ID_C DESC");
    $items = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Si aucun item, renvoie un tableau vide
    echo json_encode($items ?: []);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
