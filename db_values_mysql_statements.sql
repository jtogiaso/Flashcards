DROP SCHEMA IF EXISTS `flashcard_decks`;

CREATE SCHEMA `flashcard_decks`;
USE `flashcard_decks`;

CREATE TABLE `Decks` (
	`id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `deck_name` VARCHAR(45) NOT NULL
);

INSERT INTO `Decks` (`deck_name`)
VALUES ('Golden State Warriors Roster by Jersey Number'),
		('San Francisco Roster by Jersey Number');

CREATE TABLE `Cards` (
	`id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
	`front_value` TEXT,
    `back_value` TEXT,
    `deck_id` INT,
    FOREIGN KEY (`deck_id`) REFERENCES `Decks` (`id`)
);

INSERT INTO `Cards` (`front_value` , `back_value` , `deck_id`)
VALUES ("Golden State Warriors #30" , "Stephen Curry" , 1),
		 ("Golden State Warriors #11" , "Klay Thompson" , 1), 
		 ("Golden State Warriors #23" , "Draymond Green" , 1),
		 ("Golden State Warriors #9" , "Andre Iguodala" , 1),
		 ("San Francisco Giants #40" , "Madison Bumgarner" , 2),
		 ("San Francisco Giants #28" , "Buster Posey" , 2),
		 ("San Francisco Giants #48" , "Pablo Sandoval" , 2),
		 ("San Francisco Giants #35" , "Brandon Crawford" , 2);
         
SELECT * FROM `Cards`;