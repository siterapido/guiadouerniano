-- ===== ENUMS =====
CREATE TYPE user_role AS ENUM ('student', 'member', 'editor', 'admin');
CREATE TYPE post_type AS ENUM ('blog', 'guide');
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE event_type AS ENUM ('encontro', 'atividade', 'palestra', 'protesto', 'assembleia', 'outro');
CREATE TYPE event_status AS ENUM ('upcoming', 'ongoing', 'past', 'cancelled');
CREATE TYPE campus_enum AS ENUM ('mossoró', 'natal', 'caicó', 'assú', 'pau_dos_ferros', 'patu', 'alexandria', 'macau', 'apodi', 'online');
CREATE TYPE reaction_type AS ENUM ('like', 'love', 'fire', 'clap');
CREATE TYPE material_type AS ENUM ('pdf', 'video', 'link', 'image', 'doc');
CREATE TYPE report_reason AS ENUM ('spam', 'inappropriate', 'misinformation', 'harassment', 'other');
