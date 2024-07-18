CREATE TABLE imagen(
  id SERIAL NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  sort_position INT NOT NULL,
  item_id INT,
  PRIMARY KEY (id),
  CONSTRAINT imagen_item_fk FOREIGN KEY (item_id) REFERENCES item (id)
);
