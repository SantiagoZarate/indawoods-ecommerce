-- Item
-- -- Nombre
-- -- Descripcion
-- -- Imagenes
-- -- Talles
-- -- Guia de talles
-- -- Categoria

CREATE TABLE item(
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  guia_de_talles TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE imagen(
  id SERIAL NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  sort_position INT NOT NULL,
  item_id INT,
  PRIMARY KEY (id),
  CONSTRAINT imagen_item_fk FOREIGN KEY (item_id) REFERENCES item (id)
);

CREATE TABLE talle(
  medida TEXT,
  PRIMARY KEY (medida)
);

CREATE TABLE item_talle(
  item_id INT,
  talle_medida TEXT,
  PRIMARY KEY (item_id, talle_medida),
  CONSTRAINT item_talle_item_fk FOREIGN KEY (item_id) REFERENCES item (id),
  CONSTRAINT item_talle_talle_fk FOREIGN KEY (talle_medida) REFERENCES talle (medida)
);
