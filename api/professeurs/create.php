<?php
include '../../db/config.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

try {
    $stmt = $pdo->prepare("
        INSERT INTO professeurs (MATRICULE, NOM, PRENOM, TEL, EMAIL, CIN, ID_C) 
        VALUES (:matricule, :nom, :prenom, :tel, :email, :cin, :categorie)
    ");

    $stmt->execute([
        'matricule' => trim($data['matricule']),
        'nom'       => trim($data['nom']),
        'prenom'    => trim($data['prenom']),
        'tel'       => trim($data['telephone']),
        'email'     => trim($data['email']),
        'cin'       => trim($data['cin']),
        'categorie' => trim($data['categorie'])
    ]);

    echo json_encode([
        'message' => 'Item ajouté avec succès',
        'id'      => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    echo json_encode(["error" => "Erreur : " . $e->getMessage()]);
}
