-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 28, 2025 at 11:30 AM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gprof`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
CREATE TABLE IF NOT EXISTS `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `username`, `password`) VALUES
(3, 'admin', '$2y$10$Qoe.zx3Sbnk57MncJH.Xw.pYrWnrfotHoAHs3IiQm68qlh.cPmcq.');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `ID_C` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `CODE_C` varchar(10) NOT NULL,
  `CATEGORIE` varchar(30) DEFAULT NULL,
  `DIPLOME` varchar(25) DEFAULT NULL,
  PRIMARY KEY (`ID_C`),
  UNIQUE KEY `CODE_C` (`CODE_C`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`ID_C`, `CODE_C`, `CATEGORIE`, `DIPLOME`) VALUES
(1, '01', 'CATEGORIE 01', 'CEPE'),
(3, '02', 'CATEGORIE 02', 'BEPC'),
(4, '03', 'CATEGORIE 03', 'BACC'),
(5, '05', 'CATEGORIE 05', 'LICENCE'),
(8, '08', 'CATEGORIE 08', 'MASTER'),
(10, '09', 'CATEGORIE 09', 'MASTER');

-- --------------------------------------------------------

--
-- Table structure for table `fiches`
--

DROP TABLE IF EXISTS `fiches`;
CREATE TABLE IF NOT EXISTS `fiches` (
  `ID_F` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `DATEF` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `REF` varchar(10) NOT NULL,
  `HEURE_SUPPL` int DEFAULT NULL,
  `ID_P` int UNSIGNED DEFAULT NULL,
  `ID_T` int UNSIGNED DEFAULT NULL,
  `ID_S` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`ID_F`),
  UNIQUE KEY `REF` (`REF`),
  KEY `FK_FICHES_PROFESSEURS` (`ID_P`),
  KEY `FK_FICHES_TAUXHORAIRES` (`ID_T`),
  KEY `FK_FICHES_SALAIRES` (`ID_S`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fiches`
--

INSERT INTO `fiches` (`ID_F`, `DATEF`, `REF`, `HEURE_SUPPL`, `ID_P`, `ID_T`, `ID_S`) VALUES
(60, '2025-04-15 12:18:00', 'F-1584649', 0, 49, 1, 8),
(61, '2025-04-15 12:27:11', 'F-1551548', 0, 48, 1, 8),
(62, '2025-04-15 12:27:32', 'F-1544747', 0, 47, 1, 8),
(63, '2025-04-15 12:30:11', 'F-1532246', 0, 46, 1, 8),
(64, '2025-04-15 12:32:12', 'F-1545343', 0, 43, 1, 5),
(65, '2025-04-16 04:25:01', 'F-1689250', 2, 50, 4, 8),
(66, '2025-04-16 05:15:35', 'F-1649642', 0, 42, 4, 4),
(67, '2025-04-16 05:19:32', 'F-1635341', 0, 41, 4, 2),
(68, '2025-04-16 05:21:51', 'F-1662440', 0, 40, 4, 1),
(69, '2025-04-16 05:23:22', 'F-1621839', 0, 39, 4, 5),
(70, '2025-04-16 05:24:57', 'F-1660838', 0, 38, 4, 4),
(71, '2025-04-16 05:25:23', 'F-1654937', 0, 37, 4, 2),
(72, '2025-04-16 05:26:15', 'F-1621436', 0, 36, 4, 1),
(73, '2025-04-16 05:29:50', 'F-1656735', 0, 35, 4, 5),
(74, '2025-04-28 11:10:12', 'F-2813534', 0, 34, 4, 4),
(75, '2025-04-28 11:18:05', 'F-2878233', 0, 33, 4, 2),
(76, '2025-04-28 11:19:27', 'F-2899132', 0, 32, 4, 1),
(77, '2025-04-28 11:22:13', 'F-2886731', 0, 31, 4, 5),
(78, '2025-04-28 11:22:34', 'F-2888230', 0, 30, 4, 4),
(79, '2025-04-28 11:22:54', 'F-2891429', 0, 29, 4, 2);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
CREATE TABLE IF NOT EXISTS `notifications` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `message` text NOT NULL,
  `type` varchar(20) DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_user_id_admins` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `message`, `type`, `is_read`, `created_at`) VALUES
(16, 3, 'Professeur mis à jour avec succès.', 'admin', 1, '2025-04-15 15:47:35'),
(17, 3, 'Professeur ajouté avec succès.', 'admin', 1, '2025-04-15 15:49:43'),
(18, 3, 'Professeur mis à jour avec succès.', 'admin', 1, '2025-04-15 15:51:19'),
(19, 3, 'Nouveau salaire ajouté', 'admin', 1, '2025-04-15 16:00:00'),
(20, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:06:32'),
(21, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:07:07'),
(22, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:08:15'),
(23, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:08:49'),
(24, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:08:58'),
(25, 3, 'Catégorie mis à jour.', 'admin', 1, '2025-04-15 16:14:04'),
(26, 3, 'Catégorie mis à jour.', 'admin', 1, '2025-04-15 16:14:28'),
(27, 3, 'Catégorie ajouté avec succès.', 'admin', 1, '2025-04-15 16:14:56'),
(28, 3, 'Catégorie ajouté avec succès.', 'admin', 1, '2025-04-15 16:16:10'),
(29, 3, 'Ajout d\'une nouvelle taux.', 'admin', 1, '2025-04-15 16:22:07'),
(30, 3, 'Taux mis à jour avec succès.', 'admin', 1, '2025-04-15 16:22:26'),
(31, 3, 'Taux mis à jour avec succès.', 'admin', 1, '2025-04-15 16:22:42'),
(32, 3, 'Taux mis à jour avec succès.', 'admin', 1, '2025-04-15 16:24:58'),
(33, 3, 'Mis à jour du salaire', 'admin', 1, '2025-04-15 16:29:18'),
(34, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 07:25:01'),
(35, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:15:35'),
(36, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:19:32'),
(37, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:21:51'),
(38, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:23:22'),
(39, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:24:57'),
(40, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:25:23'),
(41, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:26:15'),
(42, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-16 08:29:50'),
(43, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:10:12'),
(44, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:18:05'),
(45, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:19:27'),
(46, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:22:14'),
(47, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:22:34'),
(48, 3, 'Un paiement a été effectué avec succès.', 'admin', 1, '2025-04-28 14:22:55'),
(49, 3, 'Ajout d\'une nouvelle taux.', 'admin', 1, '2025-04-28 14:23:35');

-- --------------------------------------------------------

--
-- Table structure for table `professeurs`
--

DROP TABLE IF EXISTS `professeurs`;
CREATE TABLE IF NOT EXISTS `professeurs` (
  `ID_P` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `MATRICULE` varchar(10) NOT NULL,
  `NOM` varchar(25) DEFAULT NULL,
  `PRENOM` varchar(30) DEFAULT NULL,
  `TEL` varchar(13) DEFAULT NULL,
  `EMAIL` varchar(25) DEFAULT NULL,
  `CIN` char(12) DEFAULT NULL,
  `ID_C` int UNSIGNED DEFAULT NULL,
  `DATEEMBAUCHE` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_P`),
  UNIQUE KEY `MATRICULE` (`MATRICULE`),
  KEY `FK_PROFESSEURS_CATEGORIES` (`ID_C`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `professeurs`
--

INSERT INTO `professeurs` (`ID_P`, `MATRICULE`, `NOM`, `PRENOM`, `TEL`, `EMAIL`, `CIN`, `ID_C`, `DATEEMBAUCHE`) VALUES
(24, '2001', 'RAKOTOMALALA', 'Valisoa', '033 11 222 33', 'rakotomalala.valisoa@gmai', '121231111111', 1, '2025-04-11 09:59:29'),
(25, '2002', 'RANDRIAMIHAMINA', 'Toavina', '034 22 333 44', 'toavina.randria@gmail.com', '131241111112', 3, '2025-04-11 09:59:29'),
(26, '2003', 'RAZAFIMAHATRATRA', 'Nomena', '032 33 444 55', 'nomena.razafi@gmail.com', '141251111113', 4, '2025-04-11 09:59:29'),
(27, '2004', 'RABEMANANJARA', 'Anjara', '033 44 555 66', 'anjara.rabe@gmail.com', '151261111114', 5, '2025-04-11 09:59:29'),
(28, '2005', 'RAKOTO', 'Feno', '034 55 666 77', 'feno.rakoto@gmail.com', '161271111115', 1, '2025-04-11 09:59:29'),
(29, '2006', 'ANDRIAMAMPIANINA', 'Kanto', '032 66 777 88', 'kanto.andria@gmail.com', '171281111116', 3, '2025-04-11 09:59:29'),
(30, '2007', 'RASOLO', 'Herisoa', '033 77 888 99', 'herisoa.rasolo@gmail.com', '181291111117', 4, '2025-04-11 09:59:29'),
(31, '2008', 'RAKOTONDRAMANANA', 'Ny Aina', '034 88 999 11', 'nyaina.rakoton@gmail.com', '191211111118', 5, '2025-04-11 09:59:29'),
(32, '2009', 'RAKOTOBE', 'Finaritra', '032 99 111 22', 'fina.rakotobe@gmail.com', '121231111119', 1, '2025-04-11 09:59:29'),
(33, '2010', 'RAMANANTSOA', 'Sitraka', '033 11 222 44', 'sitraka.rama@gmail.com', '131241111120', 3, '2025-04-11 09:59:29'),
(34, '2011', 'RAJAONARY', 'Miora', '034 22 333 55', 'miora.rajao@gmail.com', '141251111121', 4, '2025-04-11 09:59:29'),
(35, '2012', 'RAKOTOMANGA', 'Haingo', '032 33 444 66', 'haingo.rakotoma@gmail.com', '151261111122', 5, '2025-04-11 09:59:29'),
(36, '2013', 'RAKOTOARISOA', 'Aina', '033 44 555 77', 'aina.rakotoarisoa@gmail.c', '161271111123', 1, '2025-04-11 09:59:29'),
(37, '2014', 'RANDRIANARISOA', 'Malala', '034 55 666 88', 'malala.randria@gmail.com', '171281111124', 3, '2025-04-11 09:59:29'),
(38, '2015', 'RAKOTONIRINA', 'Fanilo', '032 66 777 99', 'fanilo.rakoton@gmail.com', '181291111125', 4, '2025-04-11 09:59:29'),
(39, '2016', 'RABARISON', 'Miangaly', '033 77 888 22', 'miangaly.raba@gmail.com', '191211111126', 5, '2025-04-11 09:59:29'),
(40, '2017', 'RASOAZANANY', 'Hery', '034 88 999 33', 'hery.raso@gmail.com', '121231111127', 1, '2025-04-11 09:59:29'),
(41, '2018', 'RAKOTONIAINA', 'Manitra', '032 99 111 44', 'manitra.rakoto@gmail.com', '131241111128', 3, '2025-04-11 09:59:29'),
(42, '2019', 'ANDRIAMASY', 'Soa', '033 11 222 55', 'soa.andria@gmail.com', '141251111129', 4, '2025-04-11 09:59:29'),
(43, '2020', 'RAKOTOBELINA', 'Tiana', '034 22 333 66', 'tiana.rakob@gmail.com', '151261111130', 5, '2025-04-11 09:59:29'),
(46, '2021', 'HERIMIHARISOA', 'Basilio', '033 22 555 55', 'basilioherimiharisoa@gmai', '10122115896', 8, '2025-04-11 12:11:54'),
(47, '2022', 'RAKOTOARISOA', 'Victor', '033 22 555 55', 'rakotoarisoa@gmail.com', '10122115896', 8, '2025-04-11 12:12:33'),
(48, '2023', 'AVOTRINIAINA', 'Tsiory', '033 25 777 88', 'tsiory@gmail.com', '10122115896', 8, '2025-04-13 14:13:38'),
(49, '2024', 'RAKOTONIAVO', 'Lovas', '033 55 888 99', 'lova@gmail.com', '101899666777', 5, '2025-04-15 04:20:27'),
(50, '2025', 'RANDRIAMALALA', 'Jean', '033 55 888 96', 'randriamalala@gmail.com', '10122115896', 8, '2025-04-15 12:49:43');

-- --------------------------------------------------------

--
-- Table structure for table `salaires`
--

DROP TABLE IF EXISTS `salaires`;
CREATE TABLE IF NOT EXISTS `salaires` (
  `ID_S` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `SBASE` float DEFAULT '250000',
  `ID_C` int UNSIGNED DEFAULT NULL,
  PRIMARY KEY (`ID_S`),
  KEY `FK_SALAIRES_CATEGORIES` (`ID_C`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `salaires`
--

INSERT INTO `salaires` (`ID_S`, `SBASE`, `ID_C`) VALUES
(1, 250000, 1),
(2, 300000, 3),
(4, 350000, 4),
(5, 400000, 5),
(7, 450000, 8),
(8, 5000, 8),
(9, 70007, 10);

-- --------------------------------------------------------

--
-- Table structure for table `tauxhoraires`
--

DROP TABLE IF EXISTS `tauxhoraires`;
CREATE TABLE IF NOT EXISTS `tauxhoraires` (
  `ID_T` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `TAUX` float DEFAULT '1000',
  `DATE` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_T`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tauxhoraires`
--

INSERT INTO `tauxhoraires` (`ID_T`, `TAUX`, `DATE`) VALUES
(1, 3000, '2025-04-10 11:17:14'),
(3, 4000, '2025-04-15 13:21:40'),
(4, 6000, '2025-04-15 13:22:07'),
(5, 7000, '2025-04-28 11:23:35');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fiches`
--
ALTER TABLE `fiches`
  ADD CONSTRAINT `FK_FICHES_PROFESSEURS` FOREIGN KEY (`ID_P`) REFERENCES `professeurs` (`ID_P`),
  ADD CONSTRAINT `FK_FICHES_SALAIRES` FOREIGN KEY (`ID_S`) REFERENCES `salaires` (`ID_S`),
  ADD CONSTRAINT `FK_FICHES_TAUXHORAIRES` FOREIGN KEY (`ID_T`) REFERENCES `tauxhoraires` (`ID_T`);

--
-- Constraints for table `professeurs`
--
ALTER TABLE `professeurs`
  ADD CONSTRAINT `FK_PROFESSEURS_CATEGORIES` FOREIGN KEY (`ID_C`) REFERENCES `categories` (`ID_C`);

--
-- Constraints for table `salaires`
--
ALTER TABLE `salaires`
  ADD CONSTRAINT `FK_SALAIRES_CATEGORIES` FOREIGN KEY (`ID_C`) REFERENCES `categories` (`ID_C`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
