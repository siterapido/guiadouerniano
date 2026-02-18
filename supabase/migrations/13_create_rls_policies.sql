-- ===== PROFILES =====
CREATE POLICY "Perfis públicos visíveis a todos"
  ON public.profiles FOR SELECT
  USING (is_active = TRUE AND deleted_at IS NULL);

CREATE POLICY "Usuário pode editar próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ===== CATEGORIES =====
CREATE POLICY "Categorias visíveis a todos"
  ON public.categories FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "Admin pode gerenciar categorias"
  ON public.categories FOR ALL
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ===== POSTS =====
CREATE POLICY "Posts publicados visíveis a todos"
  ON public.posts FOR SELECT
  USING (status = 'published' AND deleted_at IS NULL);

CREATE POLICY "Autor vê todos os seus posts"
  ON public.posts FOR SELECT
  USING (author_id = auth.uid());

CREATE POLICY "Editor pode criar posts"
  ON public.posts FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('editor', 'admin'))
  );

CREATE POLICY "Autor e admin podem editar post"
  ON public.posts FOR UPDATE
  USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ===== EVENTS =====
CREATE POLICY "Eventos públicos visíveis a todos"
  ON public.events FOR SELECT
  USING (is_public = TRUE AND deleted_at IS NULL);

CREATE POLICY "Editor pode criar eventos"
  ON public.events FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('editor', 'admin'))
  );

-- ===== COMMENTS =====
CREATE POLICY "Comentários aprovados visíveis"
  ON public.comments FOR SELECT
  USING (is_approved = TRUE AND deleted_at IS NULL);

CREATE POLICY "Usuário autenticado pode comentar"
  ON public.comments FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Autor e admin podem deletar comentário"
  ON public.comments FOR UPDATE
  USING (
    author_id = auth.uid() OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- ===== REACTIONS =====
CREATE POLICY "Reações visíveis a todos"
  ON public.post_reactions FOR SELECT
  USING (TRUE);

CREATE POLICY "Usuário autenticado pode reagir"
  ON public.post_reactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário pode remover própria reação"
  ON public.post_reactions FOR DELETE
  USING (auth.uid() = user_id);

-- ===== MATERIALS =====
CREATE POLICY "Materiais públicos visíveis a todos"
  ON public.materials FOR SELECT
  USING (is_public = TRUE AND deleted_at IS NULL);

CREATE POLICY "Membros veem todos os materiais"
  ON public.materials FOR SELECT
  USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('member', 'editor', 'admin'))
    AND deleted_at IS NULL
  );

CREATE POLICY "Admin e editor podem inserir materiais"
  ON public.materials FOR INSERT
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('editor', 'admin'))
  );

-- ===== NOTIFICATIONS =====
CREATE POLICY "Usuário vê próprias notificações"
  ON public.notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuário pode marcar notificação como lida"
  ON public.notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- ===== TAGS =====
CREATE POLICY "Tags visíveis a todos"
  ON public.tags FOR SELECT
  USING (TRUE);

CREATE POLICY "Post tags visíveis a todos"
  ON public.post_tags FOR SELECT
  USING (TRUE);

-- ===== REPORTS =====
CREATE POLICY "Usuário autenticado pode denunciar"
  ON public.post_reports FOR INSERT
  WITH CHECK (auth.uid() = reporter_id);
