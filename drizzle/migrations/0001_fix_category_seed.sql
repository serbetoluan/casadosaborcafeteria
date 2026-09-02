TRUNCATE TABLE public.menu_items, public.menu_categories;

INSERT INTO public.menu_categories (slug, title, tagline, subtitle, notice, partner_name, sort_order) VALUES
('quitandinhas','Quitandinhas','Do forno, quentinhos',NULL,NULL,NULL,0),
('lanchinhos','Lanchinhos','Feitos na hora, feitos com amor',NULL,NULL,NULL,1),
('salgados','Salgados','Pra matar aquela fominha',NULL,NULL,NULL,2),
('casa-fit','Casa Fit','Leve, gostoso e do seu jeito',NULL,NULL,NULL,3),
('folhados','Folhados','Linha premium, massa amanteigada',NULL,NULL,NULL,4),
('geladeira','Da Nossa Geladeira','Sempre bem geladinhos',NULL,NULL,NULL,5),
('refrescar','Para Refrescar','Um respiro doce no meio do dia',NULL,NULL,NULL,6),
('quentinhas','Bebidas Quentinhas','Do café curtinho ao chocolate cremoso',NULL,NULL,NULL,7),
('golden-hour','Golden Hour','A hora dourada da Casa','Drinks alcóolicos','Bebidas alcoólicas — venda proibida para menores de 18 anos.',NULL,8),
('mocktail','Mocktail','Borbulhas sem álcool','Drinks não alcóolicos',NULL,NULL,9),
('gelatos','Gelatos','Crema e Gusto na Casa',NULL,NULL,'Gelateria Crema e Gusto',10),
('para-adocar','Para adoçar','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',11),
('brownies','Brownies','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',12),
('cupcakes','Cupcakes','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',13),
('cookies','Cookies','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',14),
('camadas','Camadas da felicidade','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',15),
('bolo-gelado','Bolo gelado','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',16),
('cones','Cones recheados','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',17),
('torta-pote','Torta no Pote','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',18),
('fatias','Fatias recheadas','Doçuras da Lê',NULL,NULL,'Doçuras da Lê',19);