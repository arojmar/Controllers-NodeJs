DROP DATABASE blockbuster;
CREATE DATABASE blockbuster;
USE blockbuster;

CREATE TABLE customer(
	id_user INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(250) NOT NULL,
	last_name VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
	phone NUMERIC(11) NOT NULL,
	address VARCHAR(250) NOT NULL
);

CREATE TABLE movie(
	id_movie INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(250) NOT NULL UNIQUE,
	description VARCHAR(250) NOT NULL,
	release_date VARCHAR(250) NOT NULL,
	gender VARCHAR(250) NOT NULL
);

CREATE TABLE rent(
	id_rent INT AUTO_INCREMENT PRIMARY KEY,
    id_user INT NOT NULL,
    id_movie INT NOT NULL,
    CONSTRAINT fk_user_1 FOREIGN KEY (id_user)
	 REFERENCES customer(id_user) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT fk_movie_1 FOREIGN KEY (id_movie)
	 REFERENCES movie(id_movie) ON DELETE CASCADE ON UPDATE CASCADE     
);


INSERT INTO movie VALUES (1, 'Casablanca', 'Una propietaria de un casino en Casablanca, Marruecos, protege de los nazis en 1941 a su antiguo amante y marido, un guerrillero checo', '1954-07-16', 'Drama');
INSERT INTO movie VALUES (2, 'Lo que el viento se llevó', 'Una belleza sureña lucha con la devastación de la Guerra Civil y la Reconstrucción. Este clásica ganó ocho premios de la academia, incluyendo el de mejor película', '1952-10-15', 'Drama');
INSERT INTO movie VALUES (4, 'La semilla del mal', 'Una joven pareja se muda a un piso con unos peculiares vecinos. Cuando la mujer se queda misteriosamente embarazada, la paranoya sobre la seguridad de su hijo no nato empieza a controlar su vida', '1975-03-03', 'Horror');
INSERT INTO movie VALUES (5, 'Pulp Fiction', 'Las vidas de dos hombres de la mafia, un boxeador, la esposa de un gangster y un par de atracadores de restaurantes se entrelazan en cuatro relatos de violencia y redención', '1994-06-08', 'Thriller');
INSERT INTO movie VALUES (6, 'Taxi Driver', 'Las vidas de dos hombres de la mafia, un boxeador, la esposa de un gangster y un par de atracadores de restaurantes se entrelazan en cuatro relatos de violencia y redención', '1985-12-14', 'Action');
INSERT INTO movie VALUES (7, 'Psicosis', 'Una secretaria de Phoenix  desfalca 40.000 dólares de uno de los clientes de su jefe y se da a la fuga. Para a descansar en un remoto motel dirigido por Norman Bates, un joven hombre bajo la influencia de su madre', '1969-12-01', 'Horror');
INSERT INTO movie VALUES (8, 'Con la muerte en los talones', 'Un director de marketing de Nueva York es confundido con un agente del Gobierno por un grupo de espías extranjero y es perseguido por todo el país mientras busca la forma de sobrevivir', '1972-09-15', 'Thriller');
INSERT INTO movie VALUES (9, 'Cantando bajo la lluvia', 'Una productora de cine mudo hace una difícil transición al sonido', '1970-10-31', 'Comedy');
INSERT INTO movie VALUES (10, 'Dunkerque', 'Dunkerque trata sobre las cientos de miles de tropas británicas y aliadas que quedaron rodeadas por fuerzas del enemigo. Atrapadas en una playa con el mar cortando el paso, se enfrentan a una situación imposible mientras el enemigo se aproxima', '2018-03-09', 'Thriller');

INSERT INTO customer VALUES (1,	'Mel', 'Gibson', 'mel@email.com', '1234', '600123123', 'Calle de la alegria, 1');
INSERT INTO customer VALUES (2,	'Audrey', 'Hepburn', 'audrey@email.com', '12345', '600123123', 'Avenida de la esperanza, 1');
INSERT INTO customer VALUES (3,	'Marilyn', 'Monroe', 'marilyn@email.com', '123456', '600123456', 'Avenida Martin Rodriguez, 1');
INSERT INTO customer VALUES (5,	'Antonio', 'Banderas', 'antonio@email.com', '1234567',	'700123123', 'Calle del buen rollo, 2');
INSERT INTO customer VALUES (6,	'Clint', 'Eastwood', 'clint@email.com', '12345678',	'600321321', 'Calle de la armonia, 23');


SELECT * FROM customer;
SELECT * FROM movie;
SELECT * FROM rent;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';