CREATE DATABASE IF NOT EXISTS DB;
USE DB;


DROP TABLE IF EXISTS todos;
DROP TABLE IF EXISTS photos;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS users;


CREATE TABLE users (
  id INT auto_increment PRIMARY KEY,
  name varchar(255) ,
  username varchar(255) ,
  email varchar(255) ,
  phone varchar(255)
);

CREATE TABLE posts (
  userId   INT NOT NULL,
  id INT  auto_increment PRIMARY KEY ,
  title varchar(255) ,
  body varchar(255),
  FOREIGN KEY (userId) REFERENCES users (id)
);
CREATE TABLE todos (
  userId   INT NOT NULL,
  id INT auto_increment PRIMARY KEY,
  title varchar(255) ,
  completed bool,
  FOREIGN KEY (userId) REFERENCES users (id)
);
CREATE TABLE  albums (
  userId   INT NOT NULL,
  id INT  auto_increment PRIMARY KEY ,
  title varchar(255) ,
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE  photos (
  albumId   INT NOT NULL,
  id INT  auto_increment PRIMARY KEY ,
  title varchar(255) ,
  url varchar(255) ,
  thumbnailUrl varchar(255) ,
  FOREIGN KEY (albumId) REFERENCES albums (id)
);
CREATE TABLE  comments (
  postId   INT NOT NULL,
  id INT  auto_increment PRIMARY KEY ,
  name varchar(255) ,
 email varchar(255) ,
  body varchar(255) ,
  FOREIGN KEY (postId) REFERENCES posts (id)
);
CREATE TABLE  passwords (
  userId   INT NOT NULL PRIMARY KEY ,
  password varchar(100) ,
  FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE TABLE  addresses (
  id INT  auto_increment PRIMARY KEY ,
  userId   INT NOT NULL,
  street varchar(255) ,
  city varchar(255) NOT NULL,
  numBuilding INT,
  FOREIGN KEY (userId) REFERENCES users (id)
);

INSERT INTO users (name, username, email, phone) VALUES
('John Doe', 'johnny', 'john.doe@example.com', '555-1234'),
('Jane Smith', 'janesmith', 'jane.smith@example.com', '555-5678'),
('Michael Johnson', 'michaelj', 'michael.johnson@example.com', '555-9012'),
('Emily Davis', 'emilyd', 'emily.davis@example.com', '555-3456'),
('William Brown', 'willb', 'william.brown@example.com', '555-7890'),
('Olivia Wilson', 'oliviaw', 'olivia.wilson@example.com', '555-2345'),
('James Taylor', 'jamest', 'james.taylor@example.com', '555-6789'),
('Sophia Martinez', 'sophiam', 'sophia.martinez@example.com', '555-1234'),
('Benjamin Anderson', 'benjamina', 'benjamin.anderson@example.com', '555-5678'),
('Mia Thomas', 'miat', 'mia.thomas@example.com', '555-9012');

INSERT INTO posts (userId, title, body) VALUES
(1, 'First Post', 'This is the first post.'),
(2, 'Hello World', 'Hello, world! This is my first blog post.'),
(3, 'My Thoughts', 'Just some random thoughts...'),
(4, 'Reflections', 'Reflecting on life...'),
(5, 'Travel Diary', 'Documenting my travels.'),
(6, 'Daily Journal', 'Today, I did...'),
(7, 'New Adventures', 'Embarking on new adventures.'),
(8, 'Tech Talk', 'Let''s talk about technology.'),
(9, 'Foodie Finds', 'Exploring the culinary world.'),
(10, 'Fitness Journey', 'My journey to fitness.');

INSERT INTO todos (userId, title, completed) VALUES
(1, 'Complete assignment', FALSE),
(2, 'Buy groceries', FALSE),
(3, 'Call mom', TRUE),
(4, 'Finish report', TRUE),
(5, 'Book flight tickets', FALSE),
(6, 'Go for a run', TRUE),
(7, 'Study for exam', FALSE),
(8, 'Attend meeting', TRUE),
(9, 'Cook dinner', FALSE),
(10, 'Read book', FALSE);

INSERT INTO albums (userId, title) VALUES
(1, 'Vacation 2023'),
(2, 'Family Photos'),
(3, 'Hiking Adventures'),
(4, 'Cityscape Views'),
(5, 'Beach Memories'),
(6, 'Road Trip'),
(7, 'Nature Walks'),
(8, 'Tech Events'),
(9, 'Foodie Delights'),
(10, 'Fitness Goals');

INSERT INTO photos (albumId, title, url, thumbnailUrl) VALUES
(1, 'Beach Sunset', 'https://example.com/beach-sunset.jpg', 'https://example.com/beach-sunset-thumbnail.jpg'),
(2, 'Family Picnic', 'https://example.com/family-picnic.jpg', 'https://example.com/family-picnic-thumbnail.jpg'),
(3, 'Mountain Peak', 'https://example.com/mountain-peak.jpg', 'https://example.com/mountain-peak-thumbnail.jpg'),
(4, 'City Skyline', 'https://example.com/city-skyline.jpg', 'https://example.com/city-skyline-thumbnail.jpg'),
(5, 'Surfing Fun', 'https://example.com/surfing-fun.jpg', 'https://example.com/surfing-fun-thumbnail.jpg'),
(6, 'Scenic Drive', 'https://example.com/scenic-drive.jpg', 'https://example.com/scenic-drive-thumbnail.jpg'),
(7, 'Forest Trail', 'https://example.com/forest-trail.jpg', 'https://example.com/forest-trail-thumbnail.jpg'),
(8, 'Tech Conference', 'https://example.com/tech-conference.jpg', 'https://example.com/tech-conference-thumbnail.jpg'),
(9, 'Food Festival', 'https://example.com/food-festival.jpg', 'https://example.com/food-festival-thumbnail.jpg'),
(10, 'Gym Workout', 'https://example.com/gym-workout.jpg', 'https://example.com/gym-workout-thumbnail.jpg');

INSERT INTO comments (postId, name, email, body) VALUES
(1, 'Alice', 'alice@example.com', 'Great post!'),
(2, 'Bob', 'bob@example.com', 'Nice job!'),
(3, 'Charlie', 'charlie@example.com', 'Interesting thoughts.'),
(4, 'David', 'david@example.com', 'Deep reflections.'),
(5, 'Emma', 'emma@example.com', 'Amazing travels!'),
(6, 'Frank', 'frank@example.com', 'Keep it up!'),
(7, 'Grace', 'grace@example.com', 'Good luck with your exam!'),
(8, 'Hannah', 'hannah@example.com', 'Hope it goes well!'),
(9, 'Ian', 'ian@example.com', 'Looks delicious!'),
(10, 'Julia', 'julia@example.com', 'You got this!');

INSERT INTO passwords (userId, password) VALUES
(1, '12345678'),
(2, 'abcdefgh'),
(3, 'ijklmnop'),
(4, 'qrstuvwx'),
(5, 'yzabcdef'),
(6, 'ghijklmn'),
(7, 'opqrstuv'),
(8, 'wxyzabcd'),
(9, 'efghijkl'),
(10, 'mnopqrst');

INSERT INTO addresses (userId, street, city, numBuilding) VALUES
(1, '123 Oak St', 'New York', 101),
(2, '456 Maple St', 'Los Angeles', 202),
(3, '789 Pine St', 'Chicago', 303),
(4, '101 Elm St', 'San Francisco', 404),
(5, '111 Cedar St', 'Houston', 505),
(6, '222 Spruce St', 'Miami', 606),
(7, '333 Birch St', 'Seattle', 707),
(8, '444 Oak St', 'Boston', 808),
(9, '555 Maple St', 'Dallas', 909),
(10, '666 Pine St', 'Philadelphia', 1010);


