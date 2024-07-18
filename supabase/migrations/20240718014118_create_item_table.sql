CREATE TABLE item(
  id SERIAL,
  name VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT current_timestamp NOT NULL,
  guia_de_talles TEXT,
  PRIMARY KEY (id)
);

