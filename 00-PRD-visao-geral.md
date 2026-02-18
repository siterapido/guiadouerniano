# PRD: Guia do UERNIANO — Portal Integrado para Estudantes da UERN

**Versão:** 1.0  
**Data:** Fevereiro 2025  
**Autor:** Movimento Correnteza  
**Status:** Aprovado para Desenvolvimento

---

## 1. Visão do Produto

### O que é?
O **Guia do UERNIANO** é um portal web integrado e intuitivo que centraliza informações essenciais para estudantes da Universidade do Estado do Rio Grande do Norte (UERN). Funciona como um guia digital prático que auxilia desde os calouros na sua jornada inicial na universidade até veteranos que desejam se aprofundar em questões acadêmicas, políticas e de movimento estudantil.

O projeto é criado e mantido pelo **Movimento Correnteza**, uma organização estudantil comprometida com a democratização do conhecimento e o fortalecimento do movimento estudantil na UERN.

### Para quem é?
- **Calouros**: Estudantes que acaban de ingressar na universidade e precisam de orientação
- **Veteranos**: Estudantes que desejam aprofundar conhecimentos e se engajar em atividades do movimento
- **Militantes**: Membros ativos do Movimento Correnteza que usam a plataforma como ferramenta de organização
- **Comunidade Externa**: Pessoas interessadas em conhecer o movimento estudantil da UERN

### Por que existe?
1. **Preencher lacuna de informação**: Estudantes frequentemente não sabem acessar informações básicas (calendário acadêmico, processos de inscrição, direitos estudantis)
2. **Fortalecer movimento estudantil**: Centralizar conteúdo político e de mobilização em um único local
3. **Democratizar conhecimento**: Tornar acessível informações que normalmente estão dispersas
4. **Criar comunidade**: Facilitar conexões entre estudantes e militantes
5. **Estabelecer marca**: Consolidar o Movimento Correnteza como referência de informação na UERN

---

## 2. Objetivos e Métricas de Sucesso (KPIs)

### Objetivos de Negócio (3 meses)
| Objetivo | Métrica | Meta | Responsável |
|----------|---------|------|-------------|
| Alcançar estudantes calouros | Downloads de app / Visitas únicas | 500+ usuários ativos | Liderança Correnteza |
| Estabelecer como referência de informação | Taxa de retorno | 40%+ de usuários voltam em 7 dias | Marketing/Conteúdo |
| Ampliar engajamento político | Conversões em inscrições para atividades | 50+ inscritos em eventos | Coordenação de Eventos |
| Garantir qualidade de conteúdo | Taxa de bounce | <50% | Tim de Conteúdo |
| Consolidar comunidade | Crescimento de membros cadastrados | 300+ membros no mês 3 | Community Manager |

### Objetivos de Produto (12 meses)
1. Ter 2.000+ usuários ativos mensalmente
2. 80% de satisfação dos usuários (NPS > 40)
3. Ser consultado por 60%+ dos calouros no primeiro mês
4. Reduzir tempo de busca de informação em 70%
5. Ter 100+ artigos/guias no blog
6. Integração com 5+ sistemas externos (calendário acadêmico, WhatsApp, Discord)

### KPIs de Engajamento
- **Tempo médio no site**: 3+ minutos
- **Taxa de scroll**: 60%+ do conteúdo visto
- **Compartilhamentos sociais**: 30+ por semana
- **Comentários e interações**: 50+ por semana
- **Busca interna**: 2+ buscas por usuário por sessão

### KPIs Técnicos
- **Performance**: Carregamento < 2 segundos (Lighthouse > 80)
- **Disponibilidade**: 99.5% uptime
- **SEO**: Aparecer em top 3 para "guia UERN", "informações UERN", etc.
- **Acessibilidade**: WCAG 2.1 AA minimum
- **Mobile**: 75%+ dos acessos via mobile (esperado)

---

## 3. Público-Alvo e Personas

### Persona 1: João — O Calouro Perdido

**Dados demográficos:**
- Idade: 18-19 anos
- Semestre: 1º
- Cursos: Engenharia, Pedagogia, Administração
- Nível técnico: Médio (usa redes sociais, WhatsApp)
- Localização: Mossoró (95% dos usuários esperados)

**Contexto e necessidades:**
- Acaba de ingressar na universidade e sente-se perdido
- Precisa entender como funcionam processos administrativos
- Deseja conhecer outros estudantes e fazer amigos
- Tem dúvidas sobre bolsas, auxílios e programas de assistência
- Quer saber sobre oportunidades de aprendizado fora da sala de aula
- Está intimidado por formalidades e quer informação descomplicada

**Pontos de dor:**
- Documentações são complicadas e não sabe onde encontrar
- Ninguém explica direito como é a vida universitária
- Tem medo de fazer perguntas "óbvias"
- Não sabe quem procurar para cada tipo de problema
- Sente-se isolado nos primeiros dias

**Comportamento:**
- Acessa principalmente pelo smartphone
- Ativa em redes sociais (Instagram, TikTok)
- Prefere conteúdo visual e resumido
- Compartilha informações úteis com colegas de turma
- Engaja bem com conteúdo leve e descontraído

**Oportunidades com o produto:**
- Reduzir ansiedade através de informação clara e acessível
- Conectar com comunidade estudantil desde o dia 1
- Oferecer "onboarding" estruturado para calouros
- Criar senso de pertencimento ao Movimento Correnteza

---

### Persona 2: Marina — A Veterana Militante

**Dados demográficos:**
- Idade: 22-24 anos
- Semestre: 5º-7º
- Cursos: Ciências Sociais, História, Letras
- Nível técnico: Alto (programação, design, ferramentas digitais)
- Localização: Mossoró (alguns de outros estados)

**Contexto e necessidades:**
- É membro ativo do Movimento Correnteza há 2+ anos
- Quer usar ferramentas para mobilizar e organizar estudantes
- Precisa disseminar conteúdo político e ideológico
- Deseja documentar lutas e memória do movimento
- Quer analisar dados de engajamento para melhorar estratégia
- Está buscando ampliar alcance da organização

**Pontos de dor:**
- Ferramentas atuais (WhatsApp, Google Drive) são desorganizadas
- Conteúdo fica disperso e é difícil de recuperar
- Difícil medir alcance e engajamento das ações
- Precisa da plataforma ser flexível e customizável
- Quer integrar com outras ferramentas que já usa

**Comportamento:**
- Acessa via desktop e mobile
- Exigente com qualidade e detalhe técnico
- Quer ser consultada em decisões de produto
- Engaja bem com dados e métricas
- Compartilha frequentemente em redes sociais e grupos

**Oportunidades com o produto:**
- Oferecer dashboard com métricas de engajamento
- Permitir agendamento de conteúdo
- Criar ferramentas para coordenação de campanhas
- Oferecer admin panel robusto com permissões granulares
- Integrar com WhatsApp e Discord para ampliar alcance

---

### Persona 3: Lucas — O Veterano Interessado em Aprender Mais

**Dados demográficos:**
- Idade: 20-21 anos
- Semestre: 4º-5º
- Cursos: Diversificado (não necessariamente na "vanguarda" política)
- Nível técnico: Médio-Alto (usa múltiplas plataformas)
- Localização: Mossoró

**Contexto e necessidades:**
- Está cursando disciplinas avançadas e quer complementar aprendizado
- Interessado em temas políticos e sociais, mas ainda em desenvolvimento
- Quer aprender sobre direitos estudantis e políticas educacionais
- Buscando aprofundar em temas específicos (reforma educacional, movimento estudantil mundial)
- Deseja documentar reflexões e participar de comunidade de debate

**Pontos de dor:**
- Conteúdo de qualidade acadêmica é difícil de encontrar
- Quer aprender mas não quer parecer ingênuo
- Prefere conteúdo bem escrito e bem argumentado
- Quer poder salvar e organizar artigos para leitura posterior
- Precisa de referências e links para aprofundar

**Comportamento:**
- Acessa principalmente via desktop e tablet
- Lê artigos longos se o tema interessar
- Engaja com comentários e discussões
- Compartilha conteúdo em redes profissionais também
- Busca por tópicos específicos usando busca interna

**Oportunidades com o produto:**
- Oferecer biblioteca de artigos bem curados
- Permitir coleções e saved articles
- Criar sistema de comentários e discussões
- Oferecer conteúdo em múltiplos formatos (artigos, vídeos, podcasts)
- Sugerir leitura complementar e referências

---

## 4. Funcionalidades do MVP vs Fase 2 vs Fase 3

### MVP (Mês 1-2) — Pronto para Lançamento
Funcionalidades essenciais para validar o conceito e atrair usuários iniciais.

| Funcionalidade | Descrição | Tempo estimado |
|---|---|---|
| **Guia de Informações** | Seções estáticas com informações sobre: calendário acadêmico, processos de inscrição, bolsas e auxílios, direitos estudantis, estrutura organizacional | 40h |
| **Blog/Artigos** | CMS simples para publicar e organizar artigos sobre: movimento estudantil, dicas de estudo, relatos de experiências | 30h |
| **Diretório de Membros** | Perfis básicos dos militantes com foto, nome, cargo, breve descrição | 20h |
| **Busca Interna** | Busca textual simples em guias e artigos | 15h |
| **Página de Eventos** | Listagem de eventos organizados pelo Correnteza com data, hora, local, descrição | 15h |
| **Landing Page + Design System** | Homepage atraente, design system Tailwind completo, layout responsivo | 35h |
| **Autenticação Básica** | Login/cadastro simples, perfil de usuário | 20h |
| **Deploy e Monitoramento** | Setup Vercel, monitoramento básico, CI/CD | 15h |

**Total MVP: ~190h (~5 semanas com time de 2 devs)**

---

### Fase 2 (Mês 3-4) — Construir Comunidade

Funcionalidades para aumentar engajamento e retenção.

| Funcionalidade | Descrição | Impacto |
|---|---|---|
| **Sistema de Comentários** | Usuários podem comentar em artigos e guias, militantes podem responder | Aumenta engajamento 40% |
| **Newsletter** | Signup de email, envio semanal de destaques via Resend | Aumenta retorno 30% |
| **Favoritos/Saved** | Usuários podem salvar artigos e guias para leitura posterior | Aumenta tempo de sessão |
| **Sistema de Permissões Avançado** | Admin, moderador, editor, membro; cada um com permissões específicas | Facilita escalabilidade |
| **Integração WhatsApp** | Notificações de eventos e conteúdo novo via WhatsApp (webhook) | Alcance 2x maior |
| **Analytics Dashboard** | Visualizar métricas de acesso, artigos mais lidos, usuários ativos | Inform decisões |
| **Mobile App (PWA)** | Versão instalável no celular com offline support | Aumento 50% em engagement |
| **Sistema de Tags e Categorias** | Melhor navegação por temas | Descoberta 25% melhor |
| **Integração Discord** | Bot para postar conteúdo novo no Discord | Comunidade online |

**Total Fase 2: ~150h (~4 semanas com time de 2 devs)**

---

### Fase 3 (Mês 5-6) — Expansão Avançada

Funcionalidades para solidificar como plataforma essencial.

| Funcionalidade | Descrição | Impacto |
|---|---|---|
| **Fórum de Discussão** | Espaço para discussões temáticas entre usuários | Comunidade mais engajada |
| **Integração com Google Calendar** | Sincronizar eventos com calendário acadêmico oficial da UERN | Economia de tempo |
| **Sistema de Cursos Online** | Mini-cursos sobre direitos, políticas, história do movimento | Educação 360° |
| **Podcast/Áudio** | Versão áudio de artigos populares | Alcance 15% maior |
| **Integração com Payment** | Doações e pagamentos de atividades (opcional) | Sustentabilidade |
| **API Pública** | Outros projetos podem consumir dados de eventos e artigos | Integração ecossistema |
| **Moderação AI-Assistida** | Flagging automático de conteúdo spam/inapropriado | Menos trabalho manual |
| **Quiz e Gamificação** | Mini-quizzes sobre informações do guia, badges de aprendizado | Engajamento 35% maior |
| **Integração com Estruturas de Base** | Conectar centros acadêmicos, diretórios de centros | Centralização de info |

**Total Fase 3: ~180h (~5 semanas com time de 2 devs)**

---

## 5. User Stories

### User Stories — Calouro (João)

**US-001:** Como calouro, quero encontrar informações sobre calendário acadêmico em um único lugar, para que eu não precise procurar em vários sites.

**Critérios de Aceitação:**
- Guia contém datas de inscrição, provas, recessos
- Datas estão em formato calendário visual
- Posso exportar para Google Calendar
- Envio de lembretes via email

---

**US-002:** Como calouro, quero entender como funcionam bolsas e auxílios, para que eu saiba se tenho direito e como solicitar.

**Critérios de Aceitação:**
- Guia explica cada tipo de bolsa
- Passo a passo claro do processo de inscrição
- Links diretos para formulários oficiais
- Contatos de pessoas para tirar dúvidas

---

**US-003:** Como calouro, quero conhecer as estruturas de representação estudantil, para que eu saiba como participar.

**Critérios de Aceitação:**
- Seção sobre centros acadêmicos
- Seção sobre diretório do Correnteza
- Descrição de cada núcleo/comissão
- Contatos de responsáveis

---

**US-004:** Como calouro, quero ler relatos de outros calouros, para que eu me sinta menos sozinho na minha experiência.

**Critérios de Aceitação:**
- Seção de "Histórias de Calouros"
- Pelo menos 5 relatos publicados
- Fotos dos autores
- Possibilidade de comentar e compartilhar

---

**US-005:** Como calouro, quero receber notificações sobre eventos do Correnteza, para que eu não perca nenhuma oportunidade.

**Critérios de Aceitação:**
- Posso me inscrever para receber notificações
- Notificações via email e/ou WhatsApp
- Lista de eventos com detalhes completos
- Mapa ou instruções para chegar

---

**US-006:** Como calouro, quero buscar por informações específicas rapidamente, para que eu não precise ler toda a página.

**Critérios de Aceitação:**
- Busca funciona em tempo real
- Resultados aparecem em <500ms
- Busca funciona em guias e artigos
- Sugestões de busca baseadas em termos populares

---

### User Stories — Veterana (Marina)

**US-101:** Como veterana militante, quero publicar artigos sobre temas políticos e educacionais, para que eu possa contribuir com análises do Correnteza.

**Critérios de Aceitação:**
- Editor WYSIWYG intuitivo
- Suporte a imagens, vídeos, links
- Agendamento de publicação
- Preview antes de publicar
- Versionamento e revisão de histórico

---

**US-102:** Como veterana militante, quero ver métricas de engajamento dos artigos, para que eu entenda o que está funcionando.

**Critérios de Aceitação:**
- Dashboard mostra: visualizações, compartilhamentos, comentários
- Gráficos de engajamento ao longo do tempo
- Comparação entre artigos
- Exportar relatórios em PDF

---

**US-103:** Como veterana militante, quero gerenciar permissões de outros militantes, para que cada um tenha acesso apropriado.

**Critérios de Aceitação:**
- Posso convidar novos usuários
- Posso atribuir roles: admin, editor, moderador, membro
- Cada role tem permissões específicas
- Posso revogar acesso quando necessário

---

**US-104:** Como veterana militante, quero organizar campanhas em torno de temas específicos, para que o Correnteza possa agir coordenadamente.

**Critérios de Aceitação:**
- Posso criar "campanhas" que agrupam conteúdo relacionado
- Posso agendar publicação sincronizada
- Posso marcar artigos como parte de uma campanha
- Dashboard mostra todas as ações de uma campanha

---

**US-105:** Como veterana militante, quero integrar com Discord e WhatsApp, para que o Correnteza esteja onde os estudantes estão.

**Critérios de Aceitação:**
- Novos artigos são postados automaticamente no Discord
- Eventos aparecem em canal específico do WhatsApp
- Links são clicáveis e fáceis de compartilhar
- Posso customizar o que é enviado onde

---

**US-106:** Como veterana militante, quero moderar comentários inadequados, para que o espaço permaneça acolhedor.

**Critérios de Aceitação:**
- Posso remover comentários
- Posso banir usuários que spam
- Posso fazer os comentários aparecerem apenas após aprovação
- Histórico de moderação é mantido

---

### User Stories — Veterano Aprendiz (Lucas)

**US-201:** Como veterano interessado, quero ler análises aprofundadas sobre políticas educacionais, para que eu entenda melhor o contexto do movimento estudantil.

**Critérios de Aceitação:**
- Seção de "Análises Políticas"
- Artigos bem documentados com referências
- Autor listado com credenciais
- Tags para organização por tema

---

**US-202:** Como veterano interessado, quero salvar artigos para leitura posterior, para que eu possa organizar meu aprendizado.

**Critérios de Aceitação:**
- Botão "Salvar" em cada artigo
- Lista de artigos salvos em meu perfil
- Posso criar coleções temáticas
- Sincroniza entre dispositivos

---

**US-203:** Como veterano interessado, quero ver recomendações de artigos relacionados, para que eu aprofunde em temas que me interessam.

**Critérios de Aceitação:**
- "Artigos relacionados" aparecem ao final
- Baseado em tags e temática
- Posso customizar tipos de recomendação
- Recomendações são relevantes

---

**US-204:** Como veterano interessado, quero participar de discussões sobre artigos em um fórum, para que eu compartilhe minha perspectiva.

**Critérios de Aceitação:**
- Seção de comentários em cada artigo
- Posso responder comentários de outros
- Notificações quando alguém responde meu comentário
- Moderação previne spam

---

**US-205:** Como veterano interessado, quero fazer mini-cursos sobre história do movimento estudantil, para que eu desenvolva análise mais completa.

**Critérios de Aceitação:**
- Estrutura de "cursos" com módulos
- Progresso é salvo
- Conteúdo em múltiplos formatos (texto, vídeo)
- Certificado ao final (opcional)

---

**US-206:** Como veterano interessado, quero receber sugestões de novos artigos na minha área de interesse, para que eu descubra conteúdo relevante.

**Critérios de Aceitação:**
- Newsletter personalizada
- Baseada em meus interesses selecionados
- 1x por semana ou customizável
- Posso desinscrever a qualquer momento

---

## 6. Requisitos Funcionais por Módulo

### 6.1 Módulo: Guia de Informações

**RF-G01:** O sistema deve exibir um guia estruturado com seções sobre:
- Calendário Acadêmico (datas de inscrição, provas, recessos)
- Como Ingressar na UERN (ENEM, inscrição, documentação)
- Processos Administrativos (trancamento, mudança de turno, transferência)
- Bolsas e Auxílios (descrição, como solicitar, contatos)
- Direitos Estudantis (representação, participação, segurança)
- Estrutura Organizacional (centros acadêmicos, núcleos do Correnteza)
- Câmpus e Instalações (mapa, salas, bibliotecas)

**RF-G02:** Cada seção do guia deve permitir:
- Upload de imagens e documentos PDF
- Links para recursos externos
- Histórico de versões
- Data de última atualização visível

**RF-G03:** O guia deve ser editável apenas por usuários com role "editor" ou superior.

**RF-G04:** Deve haver sistema de feedback onde usuários podem sugerir melhorias ou reportar informações desatualizadas.

---

### 6.2 Módulo: Blog/Artigos

**RF-B01:** Sistema de publicação de artigos com:
- Editor de texto rich (WYSIWYG)
- Upload de imagens inline
- Suporte a vídeos (embed YouTube, Vimeo)
- Suporte a blockquotes e código
- Markdown support (opcional)

**RF-B02:** Cada artigo deve ter:
- Título, subtítulo (opcional)
- Autor (com foto e bio)
- Categorias (múltiplas)
- Tags (múltiplas)
- Descrição/excerpt (para preview)
- Imagem de capa
- Tempo estimado de leitura
- Data de publicação e última edição

**RF-B03:** Artigos podem estar em estados:
- Draft (visível apenas para editor)
- Agendado (data de publicação futura)
- Publicado (visível para todos)
- Arquivo (ainda visível mas não destacado)

**RF-B04:** Sistema de busca em artigos com:
- Busca por texto
- Filtro por autor
- Filtro por categoria
- Filtro por data range
- Resultados ordenáveis (relevância, recente, antigo)

**RF-B05:** Cada artigo deve permitir:
- Compartilhamento em redes sociais (Twitter, Facebook, WhatsApp)
- Cópia do link de compartilhamento
- Impressão formatada
- Leitura offline (PWA)

---

### 6.3 Módulo: Membros/Diretório

**RF-M01:** Cada membro do Correnteza tem perfil com:
- Foto de perfil
- Nome, pronomes, email
- Cargo/função (ex: coordenador, editor, designer)
- Núcleo/comissão que participa
- Bio pessoal (opcional)
- Redes sociais (Instagram, Twitter, LinkedIn)
- Disponibilidade de contato

**RF-M02:** Membros podem:
- Editar seu próprio perfil
- Privatividade: exibir ou ocultar email
- Indicar "fora de ação" temporariamente

**RF-M03:** Diretório permitir filtro por:
- Núcleo/comissão
- Cargo
- Disponibilidade

**RF-M04:** Apenas membros autenticados podem ver informações completas de contato.

---

### 6.4 Módulo: Eventos

**RF-E01:** Cada evento tem:
- Título e descrição
- Data, hora de início e término
- Local (endereço, GPS)
- Categoria (encontro, atividade, protesto, etc.)
- Imagem de capa
- Responsáveis/contatos
- Limite de vagas (opcional)

**RF-E02:** Usuários podem:
- Inscrever-se em eventos (com confirmação de email)
- Ver lista de inscritos (apenas para organizadores)
- Receber lembretes (24h e 1h antes)
- Compartilhar evento em redes sociais

**RF-E03:** Eventos podem ser:
- Exportados para Google Calendar, Outlook, ICS
- Visualizados em calendário visual
- Filtrados por data, categoria, local

**RF-E04:** Eventos têm opcionalidade de:
- Transmissão ao vivo (link de vídeo)
- Código QR para check-in
- Formulário de feedback pós-evento

---

### 6.5 Módulo: Busca

**RF-S01:** Busca global em:
- Artigos
- Guias
- Eventos
- Membros
- Comentários

**RF-S02:** Busca deve:
- Retornar resultados em <500ms
- Suportar autocomplete
- Exibir context snippet (preview do resultado)
- Ordenar por relevância

**RF-S03:** Histórico de buscas populares deve:
- Ser exibido quando usuário ainda não digitou nada
- Ser atualizado semanalmente
- Ajudar descoberta de conteúdo

---

### 6.6 Módulo: Autenticação e Autorização

**RF-A01:** Sistema de autenticação com:
- Email/senha
- Google OAuth
- Suporte a 2FA (TOTP)

**RF-A02:** Roles e permissões:
- **Public**: Pode ler tudo, comentar, inscrever-se em eventos
- **Membro**: Tudo acima + pode editar seu perfil, salvar artigos, criar comentários curados
- **Editor**: Tudo acima + pode criar e editar artigos
- **Moderador**: Tudo acima + pode remover comentários, banir usuários
- **Admin**: Acesso total ao sistema

**RF-A03:** Cada ação sensível requer log de auditoria:
- Quem fez
- O que fez
- Quando
- De onde (IP)

---

### 6.7 Módulo: Comentários

**RF-C01:** Sistema de comentários em artigos com:
- Texto com suporte a markdown básico
- Menção de usuários (@usuario)
- Respostas aninhadas (threads)
- Edição de comentário próprio (até 5 minutos)
- Exclusão de comentário próprio

**RF-C02:** Moderadores podem:
- Ocultar comentários
- Remover comentários
- Avisar o usuário

**RF-C03:** Notificações automáticas quando:
- Alguém comenta no artigo que salvei
- Alguém responde meu comentário
- Alguém me menciona

---

### 6.8 Módulo: Newsletter

**RF-N01:** Sistema de newsletter com:
- Formulário de inscrição (nome, email, interesses)
- Confirmação de email (double opt-in)
- Frequência: semanal, quinzenal ou mensal

**RF-N02:** Conteúdo da newsletter:
- 3-5 artigos principais da semana
- 1-2 eventos destacados
- Notícias rápidas
- Call-to-action para atividades

**RF-N03:** Rastreamento:
- Taxa de abertura
- Taxa de click
- Desinscrições

---

### 6.9 Módulo: Integrações

**RF-I01 — WhatsApp:**
- Webhook para enviar notificações de novos artigos
- Envio de lembretes de eventos
- Respostas automáticas a mensagens comuns (chatbot básico)
- Número do Correnteza como contato de referência

**RF-I02 — Discord:**
- Bot que posta novos artigos em canal dedicado
- Posta eventos em canal #eventos
- Reações automáticas para navegação

**RF-I03 — Google Calendar:**
- Exportação de eventos para calendario público
- Sincronização bidirecional opcional

**RF-I04 — Email (Resend):**
- Envio de confirmações de cadastro
- Envio de newsletter
- Reminders de eventos

---

### 6.10 Módulo: Admin Dashboard

**RF-AD01:** Dashboard com overview de:
- Usuários ativos (dia, semana, mês)
- Artigos mais lidos
- Eventos com mais inscritos
- Comentários pendentes de moderação
- Erros recentes no sistema

**RF-AD02:** Gerenciamento de:
- Usuários (criar, editar, deletar, trocar role)
- Artigos (editar, publicar, arquivar)
- Eventos (editar, cancelar)
- Comentários (remover, ocultar)
- Integrações (configurar webhooks, tokens)

**RF-AD03:** Relatórios:
- Engajamento mensal
- Top 10 artigos
- Usuários novos por semana
- Taxa de retenção
- Exportar em CSV/PDF

---

## 7. Requisitos Não-Funcionais

### 7.1 Performance
- **Carregamento inicial**: < 2 segundos (First Contentful Paint)
- **Interatividade**: < 100ms (Time to Interactive)
- **Lighthouse Score**: >= 80 (Performance, Accessibility, Best Practices)
- **Mobile**: <= 4 segundos em conexão 4G
- **Busca**: Resultados em <= 500ms mesmo com 10.000+ artigos
- **Images**: Otimizadas com WebP, lazy loading automático

### 7.2 Escalabilidade
- **Usuários simultâneos**: Mínimo 500, escalável para 5.000+
- **Artigos**: Suportar 10.000+ artigos sem degradação
- **Banco de dados**: Auto-scaling do Supabase
- **CDN**: Uso de Vercel Edge Functions para queries de alta frequência
- **Cache**: Redis para queries frequentes (opcional em Fase 2)

### 7.3 Confiabilidade
- **Uptime**: 99.5% (máx 3h30 downtime/mês)
- **Backup**: Automático diário (mantido por Supabase)
- **Recovery Time Objective (RTO)**: < 1 hora
- **Recovery Point Objective (RPO)**: < 15 minutos
- **Disaster Recovery Plan**: Documentado, testado 1x/trimestre

### 7.4 Segurança
- **HTTPS**: Obrigatório em todas as conexões
- **CORS**: Configurado estritamente
- **SQL Injection**: Prevenido via parameterized queries (Supabase)
- **XSS**: Sanitização de inputs com DOMPurify
- **CSRF**: Tokens em formulários
- **Rate Limiting**: 100 requisições por minuto por IP
- **Autenticação**: JWT com expiração de 24h
- **Senhas**: Hashed com bcrypt (Supabase default)
- **2FA**: TOTP opcional para usuários admin
- **Data Privacy**: LGPD compliance (dados podem ser deletados)
- **Permissões**: Row-level security (RLS) no Supabase

### 7.5 Acessibilidade (WCAG 2.1 AA)
- **Contraste**: Mínimo 4.5:1 para texto
- **Fontes**: Mínimo 16px para corpo
- **Navegação**: Tabindex bem estruturado
- **Imagens**: Alt text em todas as imagens
- **Forms**: Labels associadas a inputs
- **Mobile**: Touch targets mínimo 48px
- **Leitores de tela**: Compatível com NVDA, JAWS, VoiceOver
- **Testing**: Axe/WAVE para verificação automática

### 7.6 SEO
- **Meta tags**: Title, description em cada página
- **Open Graph**: Para compartilhamento em redes
- **Sitemap.xml**: Atualizado dinamicamente
- **Robots.txt**: Configurado
- **Structured Data**: Schema.org para artigos
- **URLs**: Clean, descritivas, sem query params
- **Mobile-first**: Design responsivo
- **Page Speed**: Lighthouse >= 80
- **Keywords**: Pesquisa de keywords, integração natural

### 7.7 Offline Support (PWA)
- **Service Workers**: Instalável como app
- **Offline Pages**: Artigos recentes disponíveis offline
- **Sync**: Background sync para ações quando volta online
- **Icon**: App icon 192x192 e 512x512
- **Manifest**: Web app manifest.json configurado

### 7.8 Compatibilidade
- **Navegadores**: Chrome, Firefox, Safari, Edge (versões recentes)
- **Dispositivos**: Desktop, tablet, mobile
- **OS**: Windows, macOS, Linux, iOS, Android
- **Conexões**: Suportar 3G (não só 4G)

### 7.9 Manutenibilidade
- **Código**: Documentação inline, comentários em pontos críticos
- **Commits**: Mensagens descritivas (Conventional Commits)
- **Branches**: Gitflow simplificado (main, develop, feature/*, bugfix/*)
- **Testing**: 70%+ de cobertura de código
- **Logging**: Debug logs estruturados com Winston
- **Errors**: Sentry ou similar para monitoramento

### 7.10 Usabilidade
- **Design System**: Componentes reutilizáveis, tokens de design centralizados
- **Feedback**: Feedback visual para ações do usuário (toasts, skeletons)
- **Formulários**: Validação real-time, mensagens de erro clara
- **Busca**: Autocomplete, typo tolerance
- **Acessos frequentes**: Histórico recente, favoritos

---

## 8. Fora de Escopo

As seguintes funcionalidades **NÃO** serão implementadas no MVP/Fase 2:

1. **E-commerce**: Venda de produtos/merchandising (apenas doações voluntárias)
2. **Sistema de Cursos Completo**: LMS full-featured (será MVP simplificado)
3. **Integração com ERP da UERN**: Sincronização automática de dados acadêmicos
4. **Gamificação avançada**: Leaderboards, badges complexos
5. **Aplicativo nativo iOS/Android**: Apenas PWA (web-based) inicialmente
6. **Monetização por ads**: Sem publicidade
7. **Marketplace de tutoria**: Não será um platform de negócios
8. **Video streaming próprio**: Apenas embed de plataformas (YouTube, Vimeo)
9. **Moderação 100% automática**: Sempre com revisão humana
10. **Sincronização de Calendário Automática**: Integração é manual (export/import)

---

## 9. Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|--------|-----------|
| Falta de adoção by calouros | Alta | Crítico | Partnerships com CAs, marketing agressivo, onboarding estruturado |
| Dados acadêmicos desatualizados | Média | Alto | Estabelecer prazos de revisão, emails de confirmação a admin |
| Usuários virarem content creators inadequados | Média | Médio | Moderação clara de políticas, treinamento de editores |
| Performance degrada com crescimento | Baixa | Alto | Usar Supabase managed, CDN Vercel, otimizar queries cedo |
| Insegurança de dados estudantis | Baixa | Crítico | Auditoria de segurança mensal, 2FA para admin, logs de acesso |
| Time reduzido causa atraso | Média | Alto | Priorizar MVP, documentar bem, código limpo para onboarding |
| Supabase unavailable | Muito baixa | Crítico | Backup automático, disaster recovery plan testado |
| Concorrência (grupo rival cria similar) | Baixa | Médio | Estabelecer market leadership cedo, qualidade superior |

---

## 10. Roadmap de Entregas (Sprints)

### Sprint 1-2 (Semanas 1-2): Setup e Landing
**Objetivo**: Estabelecer infraestrutura e criar primeiro contato

- [ ] Setup do projeto Next.js, Supabase, Vercel
- [ ] Design System Tailwind completo
- [ ] Landing Page atrativa
- [ ] Autenticação básica (Google OAuth + email/senha)
- [ ] Deploy no Vercel
- [ ] CI/CD pipeline (GitHub Actions)

**Entregável**: Landing page ao vivo, deploy funcional

---

### Sprint 3 (Semana 3): MVP Core — Guia + Primeiros Artigos
**Objetivo**: Core do produto em produção

- [ ] Módulo de Guia (informações estruturadas)
- [ ] CMS básico para artigos
- [ ] Busca simples
- [ ] Sistema de comentários básico
- [ ] Design responsivo

**Entregável**: Guia e blog com 5+ artigos iniciais

---

### Sprint 4 (Semana 4): MVP Core — Eventos + Membros
**Objetivo**: Completar MVP

- [ ] Módulo de Eventos
- [ ] Diretório de Membros
- [ ] Sistema de inscrição em eventos
- [ ] Integrações básicas (email via Resend)
- [ ] Admin dashboard básico

**Entregável**: MVP completo, pronto para soft-launch

---

### Sprint 5-6 (Semanas 5-6): Launch Prep + Qualidade
**Objetivo**: Preparar para lançamento público

- [ ] Testes e QA (Vitest + Playwright)
- [ ] Otimização de performance (Lighthouse >= 80)
- [ ] SEO e Open Graph
- [ ] Documentação de usuário (guias de ajuda)
- [ ] Documentação técnica (para maintainers)
- [ ] Treinamento de editors/moderators

**Entregável**: MVP pronto para lançamento com documentação completa

---

### Sprint 7 (Semana 7): Soft Launch + Validação
**Objetivo**: Testar com grupo pequeno, coletar feedback

- [ ] Lançamento para grupo closed (100-200 usuários)
- [ ] Monitoramento ativo (Sentry, analytics)
- [ ] Bug fixes rápidos
- [ ] Coleta de feedback

**Entregável**: Insights para melhorias em Fase 2

---

### Sprint 8-10 (Semanas 8-10): Public Launch
**Objetivo**: Lançar para toda comunidade UERN

- [ ] Campanha de marketing (Instagram, WhatsApp, CAs)
- [ ] Lançamento oficial
- [ ] Suporte ativo aos usuários iniciais
- [ ] Monitoramento de métricas
- [ ] Iterações rápidas

**Entregável**: Guia do UERNIANO oficialmente ao vivo

---

### Fase 2 (Mês 3-4): Engajamento
**Sprint 11-14**: Implementar funcionalidades de comunidade

- [ ] Newsletter (Resend integration)
- [ ] Integração Discord
- [ ] Integração WhatsApp
- [ ] Sistema de favoritos
- [ ] PWA (offline support)
- [ ] Analytics dashboard avançado

**Entregável**: Plataforma com comunidade ativa

---

### Fase 3 (Mês 5-6): Expansão
**Sprint 15-18**: Lançar funcionalidades avançadas

- [ ] Fórum de discussão
- [ ] Mini-cursos
- [ ] API pública
- [ ] Integração Google Calendar
- [ ] Gamificação

**Entregável**: Plataforma madura e referência

---

## 11. Critérios de Sucesso do Projeto

Ao final de 6 meses, considera-se o projeto um sucesso se:

1. **Adoção**: 1.000+ usuários ativos mensalmente
2. **Engajamento**: 40%+ taxa de retorno em 7 dias
3. **Conteúdo**: 50+ artigos publicados
4. **Comunidade**: 300+ membros cadastrados no Correnteza
5. **Técnico**: 99.5% uptime, Lighthouse >= 80
6. **Satisfação**: NPS >= 40
7. **Sustentabilidade**: Time treinado para manutenção
8. **Market**: Ser referência para "informação UERN" no Google

---

## Apêndice: Glossário

| Termo | Definição |
|-------|-----------|
| **Calouro** | Estudante que ingressou há menos de 1 semestre na universidade |
| **Veterano** | Estudante que está há 2+ semestres na universidade |
| **UERN** | Universidade do Estado do Rio Grande do Norte |
| **Correnteza** | Movimento estudantil autônomo e atuante na UERN |
| **Centro Acadêmico (CA)** | Representação estudantil por cursos |
| **MVP** | Minimum Viable Product (produto mínimo viável) |
| **KPI** | Key Performance Indicator (métrica de sucesso) |
| **PWA** | Progressive Web App (app web instalável) |
| **RLS** | Row-Level Security (segurança em nível de linha no BD) |
| **2FA** | Two-Factor Authentication (autenticação de dois fatores) |
| **LGPD** | Lei Geral de Proteção de Dados (privacidade no Brasil) |

---

**Documento finalizado em Fevereiro de 2025**
**Próxima revisão: Maio de 2025 (pós-Fase 2)**

