CREATE TABLE item_talle(
  item_id INT,
  talle_medida TEXT,
  isAvailable BOOLEAN DEFAULT false,
  PRIMARY KEY (item_id, talle_medida),
  CONSTRAINT item_talle_item_fk FOREIGN KEY (item_id) REFERENCES item (id),
  CONSTRAINT item_talle_talle_fk FOREIGN KEY (talle_medida) REFERENCES talle (medida)
);