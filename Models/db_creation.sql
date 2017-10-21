create table `Cards` (
	`id` int auto_increment not null primary key,
	`front_value` text,
    `back_value` text,
    `deck_id` int not null,
    foreign key (`deck_id`) references `Decks` (`deck_id`)
);