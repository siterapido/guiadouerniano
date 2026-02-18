-- ===== CATEGORIAS DO GUIA =====
INSERT INTO public.categories (name, slug, description, icon, color, post_type, order_index) VALUES
  ('Matrícula e Documentos', 'matricula', 'Tudo sobre matrícula, histórico e documentos acadêmicos', 'FileText', '#1A5FB4', 'guide', 1),
  ('Serviços Acadêmicos', 'servicos', 'Biblioteca, laboratórios e serviços disponíveis na UERN', 'GraduationCap', '#2870D4', 'guide', 2),
  ('Restaurante Universitário', 'ru', 'Cardápio, horários e funcionamento do RU', 'Utensils', '#1A7F37', 'guide', 3),
  ('Assistência Estudantil', 'assistencia', 'Bolsas, auxílios e programas de assistência', 'Heart', '#E63946', 'guide', 4),
  ('Órgãos Colegiados', 'orgaos', 'DCE, CAs, CONSEPE e outros órgãos estudantis', 'Users', '#9A6700', 'guide', 5),
  ('Campi e Endereços', 'campi', 'Localização e informações de todos os campi da UERN', 'MapPin', '#0969DA', 'guide', 6),
  ('Calendário Acadêmico', 'calendario', 'Datas importantes, prazos e período letivo', 'Calendar', '#F4732A', 'guide', 7),
  ('Movimento Estudantil', 'movimento-estudantil', 'DCE, grêmios e mobilização estudantil', 'Megaphone', '#003087', 'guide', 8);

-- ===== CATEGORIAS DO BLOG =====
INSERT INTO public.categories (name, slug, description, icon, color, post_type, order_index) VALUES
  ('Notícias', 'noticias', 'Novidades da UERN e do movimento estudantil', 'Newspaper', '#E63946', 'blog', 1),
  ('Análise', 'analise', 'Análises políticas e acadêmicas', 'BarChart', '#1A5FB4', 'blog', 2),
  ('Relato', 'relato', 'Relatos e experiências de estudantes', 'MessageSquare', '#1A7F37', 'blog', 3),
  ('Tutorial', 'tutorial', 'Guias práticos para estudantes', 'BookOpen', '#9A6700', 'blog', 4),
  ('Cultura', 'cultura', 'Arte, cultura e expressão estudantil', 'Palette', '#2870D4', 'blog', 5);

-- ===== TAGS INICIAIS =====
INSERT INTO public.tags (name, slug) VALUES
  ('UERN', 'uern'),
  ('Movimento Estudantil', 'movimento-estudantil'),
  ('Correnteza', 'correnteza'),
  ('DCE', 'dce'),
  ('Matrícula', 'matricula'),
  ('Bolsas', 'bolsas'),
  ('Greve', 'greve'),
  ('Assembleia', 'assembleia'),
  ('Mossoró', 'mossoro'),
  ('Nordeste', 'nordeste');
