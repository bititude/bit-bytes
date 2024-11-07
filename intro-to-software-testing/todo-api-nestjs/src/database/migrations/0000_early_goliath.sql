-- Custom SQL migration file, put you code below! --
 CREATE TABLE todo (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  title VARCHAR(200) NOT NULL,
  completed BOOLEAN NOT NULl DEFAULT false
 )