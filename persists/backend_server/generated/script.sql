-- AUTO-GENERATED FILE.

-- This file is an auto-generated file by Ballerina persistence layer for model.
-- Please verify the generated scripts and execute them against the target DB server.

DROP TABLE IF EXISTS `Order`;
DROP TABLE IF EXISTS `Cargo`;

CREATE TABLE `Cargo` (
	`id` VARCHAR(191) NOT NULL,
	`lat` VARCHAR(191) NOT NULL,
	`lon` VARCHAR(191) NOT NULL,
	`startFrom` VARCHAR(191) NOT NULL,
	`endFrom` VARCHAR(191) NOT NULL,
	`cargoType` ENUM('ShipEx', 'CargoWave', 'TradeLogix') NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `Order` (
	`id` VARCHAR(191) NOT NULL,
	`customerId` VARCHAR(191) NOT NULL,
	`date` VARCHAR(191) NOT NULL,
	`status` ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'RETURNED') NOT NULL,
	`quantity` INT NOT NULL,
	`item` VARCHAR(191) NOT NULL,
	`cargoId` VARCHAR(191) NOT NULL,
	FOREIGN KEY(`cargoId`) REFERENCES `Cargo`(`id`),
	PRIMARY KEY(`id`)
);
