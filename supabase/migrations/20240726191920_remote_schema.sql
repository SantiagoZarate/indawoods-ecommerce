alter table "public"."imagen" drop constraint "imagen_item_fk";

alter table "public"."item_talle" drop constraint "item_talle_item_fk";

alter table "public"."imagen" add constraint "imagen_item_id_fkey" FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE not valid;

alter table "public"."imagen" validate constraint "imagen_item_id_fkey";

alter table "public"."item_talle" add constraint "item_talle_item_id_fkey" FOREIGN KEY (item_id) REFERENCES item(id) ON DELETE CASCADE not valid;

alter table "public"."item_talle" validate constraint "item_talle_item_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_item(_name text, _description text, _guia_de_talles text, _category text, _images jsonb, _talles text[])
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
DECLARE
  item_id public.item.id%type;
BEGIN
  -- Insert new item record and return its id
  INSERT INTO item (name, description, guia_de_talles, category)
  VALUES(_name, _description, _guia_de_talles, _category)
  RETURNING id INTO item_id;

  -- Insert images 
  INSERT INTO public.imagen (item_id, url, sort_position)
  SELECT item_id, 
         (image->>'publicUrl')::TEXT, 
         (image->>'sort_order')::INT
  FROM jsonb_array_elements(_images) AS image;

  -- Insert item_talles
  INSERT INTO public.item_talle (item_id, talle_medida)
  SELECT item_id, talle
  FROM unnest(_talles) AS talle;

  RETURN QUERY
  SELECT *
  FROM public.item AS i
  WHERE i.id = item_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.create_item(_name text, _description text, _guia_de_talles text, _category text, _price integer, _images jsonb, _talles text[])
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
DECLARE
  item_id public.item.id%type;
  position public.item.sort_position%type;
BEGIN
  SELECT COALESCE(MAX(sort_position), 0) + 1 INTO position FROM public.item;

  -- Insert new item record and return its id
  INSERT INTO item (name, description, guia_de_talles, category, price, sort_position)
  VALUES(_name, _description, _guia_de_talles, _category, _price, position)
  RETURNING id INTO item_id;

  -- Insert images 
  INSERT INTO public.imagen (item_id, url, sort_position)
  SELECT item_id, 
         (image->>'publicUrl')::TEXT, 
         (image->>'sort_order')::INT
  FROM jsonb_array_elements(_images) AS image;

  -- Insert item_talles
  INSERT INTO public.item_talle (item_id, talle_medida)
  SELECT item_id, talle
  FROM unnest(_talles) AS talle;

  RETURN QUERY
  SELECT *
  FROM public.item AS i
  WHERE i.id = item_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_item(_id integer)
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT *
    FROM public.item AS i
    WHERE i.id = _id;
    -- JOIN public.imagen AS im ON i.id = im.item_id
    -- ORDER BY im.sort_position;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No item with id %.', $1;
    END IF;

    RETURN;
 END; $function$
;

CREATE OR REPLACE FUNCTION public.get_item_ordered_images(_id integer)
 RETURNS TABLE(id integer, name character varying, description text, category character varying, created_at timestamp without time zone, visible boolean, guia_de_talles text)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT i.id, i.name, i.description, i.category, i.created_at, i.visible, i.guia_de_talles
    FROM public.item AS i
    WHERE i.id = _id;
    -- JOIN public.imagen AS im ON i.id = im.item_id
    -- ORDER BY im.sort_position;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No item with id %.', $1;
    END IF;

    RETURN;
 END; $function$
;

CREATE OR REPLACE FUNCTION public.get_item_with_images(_id integer)
 RETURNS TABLE(id integer, name character varying, description text, category character varying, created_at timestamp without time zone, visible boolean, guia_de_talles text, images jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT i.*,
        COALESCE(
            (
                SELECT jsonb_agg(img_data)
                FROM (
                    SELECT jsonb_build_object(
                        'imagen_id', im.id,
                        'sort_position', im.sort_position,
                        'url', im.url,
                        'created_at', im.created_at
                    ) AS img_data
                    FROM public.imagen AS im
                    WHERE im.item_id = i.id
                    ORDER BY im.sort_position
                ) AS ordered_images
            ),
            '[]'::jsonb
        ) AS images
    FROM public.item AS i
    WHERE i.id = _id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'No item with id %.', _id;
    END IF;

    RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_most_sold_items(_limit integer)
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT i.*
  FROM public.item AS i
  WHERE i.id IN (
    SELECT s.item_id
    FROM public.sale AS s
    WHERE s.created_at > current_timestamp - interval '30 days'
    GROUP BY s.item_id
    ORDER BY COUNT(*) DESC
    LIMIT _limit
  );
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_most_sold_items_by_category(_category text)
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT i.*
  FROM public.item AS i
  WHERE i.id IN (
    SELECT s.item_id
    FROM public.sale AS s
    JOIN public.item AS i ON s.item_id = i.id
    WHERE s.created_at > current_timestamp - interval '30 days'
    AND i.category = _category
    GROUP BY s.item_id
    ORDER BY COUNT(*) DESC
  );
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_most_sold_items_by_category(_category text, _limit integer)
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN QUERY
  SELECT i.*
  FROM public.item AS i
  WHERE i.id IN (
    SELECT s.item_id
    FROM public.sale AS s
    JOIN public.item AS i ON s.item_id = i.id
    WHERE s.created_at > current_timestamp - interval '30 days'
    AND i.category = _category
    GROUP BY s.item_id
    ORDER BY COUNT(*) DESC
    LIMIT _limit
  );
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_recommended_items(_item_id integer)
 RETURNS SETOF item
 LANGUAGE plpgsql
AS $function$
DECLARE
  _category public.item.category%type;
  _item public.item%rowtype;
  _items_found INT := 0;
BEGIN
  SELECT category INTO _category
  FROM public.item
  WHERE id = _item_id;

  FOR _item IN
    SELECT * FROM public.get_most_sold_items_by_category(_category, 4)
  LOOP
    IF _item.id <> _item_id THEN
      RETURN NEXT _item;
      _items_found := _items_found + 1;
    END IF;
  END LOOP;

  IF _items_found < 4 THEN
    FOR _item IN
      SELECT * FROM public.item
      WHERE id NOT IN (SELECT id FROM public.get_most_sold_items_by_category(_category, 4))
      AND id <> _item_id
      LIMIT 4 - _items_found
    LOOP
      RETURN NEXT _item;
    END LOOP;
  END IF;

  RETURN;
END; $function$
;

CREATE OR REPLACE FUNCTION public.get_recommended_items_v2(_item_id integer)
 RETURNS TABLE(id integer, name text, image text)
 LANGUAGE plpgsql
AS $function$
DECLARE
  _category public.item.category%type;
  _item public.item%rowtype;
  _items_found INT := 0;
BEGIN
  -- Get item category
  SELECT category INTO _category
  FROM public.item AS i
  WHERE i.id = _item_id;

  -- Fetch most sold items with the same category
  FOR id, name, image IN
    SELECT DISTINCT ON (i.id) i.id, i.name, im.url
    FROM public.get_most_sold_items_by_category(_category, 4) AS i
    JOIN public.imagen AS im ON im.item_id = i.id
    AND im.sort_position = 1
    AND i.visible = TRUE
    WHERE i.id <> _item_id
  LOOP
    RETURN NEXT;
    _items_found := _items_found + 1;
  END LOOP;

  -- If the amount of items fetched is less than 4, fetch some more items from item table
  IF _items_found < 4 THEN
    FOR id, name, image IN
      SELECT DISTINCT ON (i.id) i.id, i.name, im.url
      FROM public.item AS i
      JOIN public.imagen AS im ON im.item_id = i.id
      WHERE i.id NOT IN (SELECT q.id FROM public.get_most_sold_items_by_category(_category, 4) AS q)
      AND im.sort_position = 1
      AND i.id <> _item_id
      AND i.visible = TRUE
      LIMIT 4 - _items_found
    LOOP
      RETURN NEXT;
    END LOOP;
  END IF;

  RETURN;
END; $function$
;

CREATE OR REPLACE FUNCTION public.insert_sale_record(_item_id integer)
 RETURNS SETOF sale
 LANGUAGE plpgsql
AS $function$
DECLARE
  _amount public.item.price%type;
BEGIN
  SELECT price INTO _amount
  FROM public.item
  WHERE id = _item_id;

  RETURN QUERY
  INSERT INTO public.sale (item_id, amount)
  VALUES (_item_id, _amount)
  RETURNING *;
END; $function$
;

CREATE OR REPLACE FUNCTION public.update_item_position(_items jsonb)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$
DECLARE
  item_id INT;
  item_sort_position INT;
  item JSONB;
BEGIN
  --update items position
  -- UPDATE public.item
  -- SET sort_position = (i->>'sort_position')::INT
  -- FROM jsonb_array_elements(_items) AS i
  -- WHERE id = (i->>'id')::INT;

FOR item IN SELECT * FROM jsonb_array_elements(_items)
    LOOP
-- Get item id and sort position
    item_id :=(item->>'id')::INT;
    item_sort_position :=(item->>'sort_position')::INT;
-- Update item sort position
    UPDATE public.item
    SET sort_position = item_sort_position
    WHERE id = item_id;

    RAISE LOG 'item info = %',  item_sort_position;
END LOOP;

  RETURN true;
END; $function$
;

create policy "item_insert_policy"
on "public"."item"
as permissive
for insert
to public
with check (true);


create policy "item_select_policy"
on "public"."item"
as permissive
for select
to public
using (true);



