CREATE TABLE IF NOT EXISTS `ingredients` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ingredient_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `ingredient_role` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `hazard_type` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `comedogenity` int DEFAULT NULL,
  `irritancy` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=377 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;