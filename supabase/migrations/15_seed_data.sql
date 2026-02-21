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

-- ===== PERFIL DE SEED (autor dos posts de exemplo) =====
-- Nota: este perfil é criado apenas para seed. Em produção, perfis são criados via auth.users.
INSERT INTO public.profiles (id, name, email, role, email_notifications, is_active)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'Redação Correnteza', 'redacao@correnteza.org', 'editor', true, true),
  ('00000000-0000-0000-0000-000000000002', 'Ana Beatriz Ferreira', 'ana@correnteza.org', 'editor', true, true),
  ('00000000-0000-0000-0000-000000000003', 'Joana Cavalcante', 'joana@correnteza.org', 'member', true, true)
ON CONFLICT (id) DO NOTHING;

-- ===== POSTS DE EXEMPLO =====
INSERT INTO public.posts (
  title, slug, excerpt, content, cover_image_url,
  author_id, category_id, type, status, featured,
  views_count, reading_time, published_at
)
SELECT
  'UERN anuncia ampliação de vagas no Restaurante Universitário para 2026',
  'uern-ampliacao-vagas-ru-2026',
  'A administração central da UERN confirmou o aumento de 40% na capacidade de atendimento do RU em todos os campi, beneficiando mais de 5 mil estudantes a partir do próximo semestre.',
  '<p>A Universidade do Estado do Rio Grande do Norte (UERN) anunciou nesta semana um investimento significativo na infraestrutura dos Restaurantes Universitários de todos os seus campi.</p><p>A medida, aguardada há anos pelo movimento estudantil, vai ampliar em 40% a capacidade diária de atendimento, passando de aproximadamente 3.500 para quase 5.000 refeições por dia.</p>',
  'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'blog',
  'published',
  true,
  1248,
  4,
  NOW() - INTERVAL '4 days'
FROM public.categories c WHERE c.slug = 'noticias' AND c.post_type = 'blog'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.posts (
  title, slug, excerpt, content, cover_image_url,
  author_id, category_id, type, status, featured,
  views_count, reading_time, published_at
)
SELECT
  'Como funciona o processo de matrícula na UERN: guia completo para calouros',
  'guia-matricula-uern-calouros',
  'Tudo que você precisa saber sobre prazos, documentos exigidos, sistemas de matrícula e o que fazer se houver problemas. Um guia passo a passo feito pelos estudantes para os estudantes.',
  '<p>Entrar na universidade é uma conquista enorme, mas o processo burocrático pode ser confuso. Este guia foi criado pelo Movimento Correnteza para ajudar os calouros a navegarem pelo sistema de matrícula da UERN sem estresse.</p>',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
  '00000000-0000-0000-0000-000000000002',
  c.id,
  'blog',
  'published',
  true,
  3710,
  8,
  NOW() - INTERVAL '7 days'
FROM public.categories c WHERE c.slug = 'tutorial' AND c.post_type = 'blog'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.posts (
  title, slug, excerpt, content, cover_image_url,
  author_id, category_id, type, status, featured,
  views_count, reading_time, published_at
)
SELECT
  'Assembleia estudantil aprova criação do novo Diretório Acadêmico de Direito',
  'assembleia-criacao-da-direito-uern',
  'Realizada com ampla participação dos estudantes do curso de Direito do campus de Mossoró, a assembleia aprovou por unanimidade a criação do novo DA e elegeu a chapa provisória.',
  '<p>Na última quinta-feira, o auditório do Centro de Ciências Sociais Aplicadas e Humanas (CCSAH) da UERN reuniu mais de 200 estudantes do curso de Direito para uma assembleia histórica.</p>',
  'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80',
  '00000000-0000-0000-0000-000000000001',
  c.id,
  'blog',
  'published',
  true,
  892,
  3,
  NOW() - INTERVAL '11 days'
FROM public.categories c WHERE c.slug = 'noticias' AND c.post_type = 'blog'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.posts (
  title, slug, excerpt, content, cover_image_url,
  author_id, category_id, type, status, featured,
  views_count, reading_time, published_at
)
SELECT
  'Bolsas de permanência: quem tem direito e como solicitar em 2026',
  'bolsas-permanencia-uern-2026',
  'O programa de assistência estudantil da UERN oferece auxílios para transporte, alimentação e moradia. Saiba os critérios, documentos necessários e os prazos de inscrição.',
  '<p>O programa de assistência estudantil da UERN representa um pilar fundamental para garantir que estudantes em situação de vulnerabilidade socioeconômica possam permanecer na universidade e concluir seus cursos.</p>',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80',
  '00000000-0000-0000-0000-000000000002',
  c.id,
  'blog',
  'published',
  false,
  2156,
  6,
  NOW() - INTERVAL '14 days'
FROM public.categories c WHERE c.slug = 'analise' AND c.post_type = 'blog'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.posts (
  title, slug, excerpt, content, cover_image_url,
  author_id, category_id, type, status, featured,
  views_count, reading_time, published_at
)
SELECT
  '"Ser o primeiro da família a entrar na universidade mudou tudo" — relato de uma UERNIANA',
  'relato-primeira-familia-universidade',
  'Joana, estudante de Enfermagem do campus de Caicó, compartilha sua trajetória desde a escola pública no interior até conquistar uma vaga na UERN e o que o movimento estudantil significou na sua adaptação.',
  '<p>Joana cresceu em Jardim do Seridó, uma cidade pequena do interior do Rio Grande do Norte. Filha de agricultores, ela foi a primeira da família a concluir o ensino médio — e agora é a primeira a cursar uma universidade pública.</p>',
  'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=1200&q=80',
  '00000000-0000-0000-0000-000000000003',
  c.id,
  'blog',
  'published',
  false,
  4320,
  7,
  NOW() - INTERVAL '18 days'
FROM public.categories c WHERE c.slug = 'relato' AND c.post_type = 'blog'
ON CONFLICT (slug) DO NOTHING;

-- ===== EVENTOS DE EXEMPLO =====
INSERT INTO public.events (
  title, slug, description, content, cover_image_url,
  starts_at, ends_at, location, campus, type, status,
  organizer_id, max_attendees, is_public
) VALUES
  (
    'Assembleia Geral dos Estudantes — Pauta: RU e Bolsas 2026',
    'assembleia-geral-ru-bolsas-2026',
    'Assembleia aberta a todos os estudantes da UERN Mossoró para deliberar sobre as demandas ao RU e o cronograma das bolsas de permanência do primeiro semestre de 2026.',
    '<p>A Assembleia Geral dos Estudantes é o espaço máximo de deliberação coletiva do movimento estudantil na UERN. Todos os estudantes têm direito à voz e voto.</p><p><strong>Pautas:</strong></p><ul><li>Ampliação de vagas no Restaurante Universitário</li><li>Cronograma e critérios das bolsas de permanência 2026/1</li><li>Eleições para o DCE</li></ul>',
    'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=1200&q=80',
    NOW() + INTERVAL '5 days',
    NOW() + INTERVAL '5 days' + INTERVAL '3 hours',
    'Auditório do CCSAH — Campus Central Mossoró',
    'mossoró',
    'assembleia',
    'upcoming',
    '00000000-0000-0000-0000-000000000001',
    400,
    true
  ),
  (
    'Palestra: Saúde Mental na Universidade — Como sobreviver (e florescer)',
    'palestra-saude-mental-universidade-2026',
    'Uma conversa aberta sobre ansiedade, pressão acadêmica e estratégias para cuidar da saúde mental durante a graduação, com psicóloga da UERN e depoimentos de estudantes.',
    '<p>A vida universitária traz desafios que vão muito além das provas e trabalhos. Ansiedade, síndrome do impostor e pressão por desempenho são realidades de muitos estudantes.</p><p>Nesta palestra, a psicóloga do NASPE vai abordar ferramentas práticas para lidar com o estresse acadêmico.</p>',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80',
    NOW() + INTERVAL '9 days',
    NOW() + INTERVAL '9 days' + INTERVAL '2 hours',
    'Auditório da FCS — Faculdade de Ciências da Saúde',
    'mossoró',
    'palestra',
    'upcoming',
    '00000000-0000-0000-0000-000000000002',
    120,
    true
  ),
  (
    'Ato em Defesa da Educação Pública — Contra os Cortes no MEC',
    'ato-defesa-educacao-publica-corte-mec',
    'Ato unificado dos estudantes da UERN em resposta aos cortes orçamentários federais na educação. Concentração na entrada da UERN às 14h.',
    '<p>Em resposta aos cortes anunciados pelo Ministério da Educação, o Movimento Correnteza convoca todos os estudantes para um ato de protesto nas ruas de Mossoró.</p><p><strong>Concentração:</strong> Entrada principal da UERN (campus central), às 14h. Educação não se corta!</p>',
    'https://images.unsplash.com/photo-1594392175511-30eca83d51c8?w=1200&q=80',
    NOW() + INTERVAL '12 days',
    NOW() + INTERVAL '12 days' + INTERVAL '4 hours',
    'Concentração na entrada da UERN — Campus Central',
    'mossoró',
    'protesto',
    'upcoming',
    '00000000-0000-0000-0000-000000000001',
    NULL,
    true
  ),
  (
    'Semana de Recepção de Calouros 2026/1 — Campus Caicó',
    'semana-recepcao-calouros-2026-caico',
    'Programação especial de boas-vindas para os novos estudantes do campus de Caicó, com visita guiada, roda de conversa com veteranos e festa de integração.',
    '<p>Seja bem-vindo(a) à UERN! A Semana de Recepção de Calouros 2026/1 do campus de Caicó é organizada pelo Diretório Acadêmico em parceria com a coordenação do campus.</p>',
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    NOW() + INTERVAL '18 days',
    NOW() + INTERVAL '23 days',
    'Campus de Caicó — CAMEAM',
    'caicó',
    'encontro',
    'upcoming',
    '00000000-0000-0000-0000-000000000002',
    200,
    true
  ),
  (
    'Encontro Regional de Estudantes do Semiárido — ERES 2026',
    'encontro-regional-estudantes-semiarido-2026',
    'O ERES reúne estudantes de universidades públicas do Nordeste para debater educação, políticas públicas e movimento estudantil. Edição 2026 sediada na UERN.',
    '<p>O Encontro Regional de Estudantes do Semiárido (ERES) é um evento histórico do movimento estudantil nordestino. Nesta edição, a UERN sedia o encontro, reunindo delegações de mais de 20 universidades públicas do Nordeste.</p>',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    NOW() + INTERVAL '32 days',
    NOW() + INTERVAL '35 days',
    'UERN — Campus Central Mossoró (múltiplos auditórios)',
    'mossoró',
    'encontro',
    'upcoming',
    '00000000-0000-0000-0000-000000000001',
    500,
    true
  )
ON CONFLICT (slug) DO NOTHING;
