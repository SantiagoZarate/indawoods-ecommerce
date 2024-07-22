DROP TABLE IF EXISTS public.sale;

CREATE TABLE public.sale(
  id SERIAL PRIMARY KEY,
  created_at TIMESTAMP DEFAULT current_timestamp,
  item_id INT,
  amount MONEY NOT NULL
);

ALTER TABLE sale ADD CONSTRAINT sale_fk FOREIGN KEY (item_id) REFERENCES public.item (id) ON DELETE CASCADE ON UPDATE CASCADE;