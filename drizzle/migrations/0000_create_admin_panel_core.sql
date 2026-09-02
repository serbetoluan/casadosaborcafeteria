-- ROLES ---------------------------------------------------------------
CREATE TYPE public.app_role AS ENUM ('admin', 'staff');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile select" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "own roles select" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "admins read roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data ->> 'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- MENU ----------------------------------------------------------------
CREATE TABLE public.menu_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  tagline TEXT,
  subtitle TEXT,
  notice TEXT,
  partner_name TEXT,
  partner_logo_url TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
GRANT SELECT ON public.menu_categories TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_categories TO authenticated;
GRANT ALL ON public.menu_categories TO service_role;
ALTER TABLE public.menu_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read categories" ON public.menu_categories FOR SELECT TO anon, authenticated USING (deleted_at IS NULL);
CREATE POLICY "admins write categories" ON public.menu_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER menu_categories_updated_at BEFORE UPDATE ON public.menu_categories
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.menu_categories(id) ON DELETE CASCADE,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  price_label TEXT NOT NULL,
  price_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  fit BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  options JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at TIMESTAMPTZ
);
CREATE INDEX menu_items_category_id_idx ON public.menu_items (category_id);
CREATE INDEX menu_items_active_idx ON public.menu_items (is_active) WHERE deleted_at IS NULL;
GRANT SELECT ON public.menu_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menu_items TO authenticated;
GRANT ALL ON public.menu_items TO service_role;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read items" ON public.menu_items FOR SELECT TO anon, authenticated USING (deleted_at IS NULL);
CREATE POLICY "admins write items" ON public.menu_items FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER menu_items_updated_at BEFORE UPDATE ON public.menu_items
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- CATEGORY SEED (conteúdo atual do cardápio) --------------------------
INSERT INTO public.menu_categories (slug, title, tagline, subtitle, notice, partner_name, sort_order) VALUES
('quitandinhas','Quitandinhas','Do forno, quentinhos',NULL,NULL,NULL,0),
('lanchinhos','Lanchinhos','Feitos na hora, feitos com amor',NULL,NULL,NULL,1),
('salgados','Salgados','Pra matar aquela fominha',NULL,NULL,NULL,2),
('folhados','Folhados','Massa folhada premium',NULL,NULL,NULL,3),
('fit','Opções Fit','Leveza sem perder o sabor',NULL,NULL,NULL,4),
('cafes','Cafés','Grãos especiais',NULL,NULL,NULL,5),
('bebidas-quentes','Bebidas Quentinhas','Para aquecer o coração',NULL,NULL,NULL,6),
('bebidas-geladas','Bebidas Geladas','Refrescância na medida',NULL,NULL,NULL,7),
('golden-hour','Golden Hour','O melhor fim de tarde','Drinks alcóolicos','Bebidas alcoólicas — venda proibida para menores de 18 anos.',NULL,8),
('mocktail','Mocktail','Sabor sem álcool','Drinks não alcóolicos',NULL,NULL,9),
('gelatos','Gelatos','Gelato artesanal italiano',NULL,NULL,'Gelateria Crema e Gusto',10),
('para-adocar','Para adoçar','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',11),
('brownies','Brownies','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',12),
('cupcakes','Cupcakes','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',13),
('cookies','Cookies','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',14),
('camadas','Camadas da felicidade','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',15),
('bolo-gelado','Bolo gelado','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',16),
('cones','Cones recheados','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',17),
('pote','Torta no Pote','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',18),
('fatias','Fatias recheadas','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',19)
ON CONFLICT (slug) DO NOTHING;