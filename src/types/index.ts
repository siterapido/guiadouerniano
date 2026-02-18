// ===== ENUMS / UNION TYPES =====

export type UserRole = 'student' | 'member' | 'editor' | 'admin';

export type PostType = 'blog' | 'guide';

export type PostStatus = 'draft' | 'published' | 'archived';

export type EventType = 'encontro' | 'atividade' | 'palestra' | 'protesto' | 'assembleia' | 'outro';

export type EventStatus = 'upcoming' | 'ongoing' | 'past' | 'cancelled';

export type Campus =
  | 'mossoró'
  | 'natal'
  | 'caicó'
  | 'assú'
  | 'pau_dos_ferros'
  | 'patu'
  | 'alexandria'
  | 'macau'
  | 'apodi'
  | 'online';

export type ReactionType = 'like' | 'love' | 'fire' | 'clap';

export type MaterialType = 'pdf' | 'video' | 'link' | 'image' | 'doc';

// ===== INTERFACES PRINCIPAIS =====

export interface Profile {
  id: string;
  created_at: string;
  updated_at: string;
  name: string | null;
  email: string;
  bio: string | null;
  avatar_url: string | null;
  role: UserRole;
  campus: Campus | null;
  course: string | null;
  email_notifications: boolean;
  is_active: boolean;
  deleted_at: string | null;
}

export interface Category {
  id: string;
  created_at: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  order_index: number;
  is_active: boolean;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  created_at: string;
  updated_at: string;
  published_at: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image_url: string | null;
  author_id: string;
  category_id: string;
  type: PostType;
  status: PostStatus;
  featured: boolean;
  views_count: number;
  reading_time: number | null;
  meta_description: string | null;
  meta_keywords: string[] | null;
  deleted_at: string | null;
}

export interface Event {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  description: string | null;
  content: string | null;
  cover_image_url: string | null;
  starts_at: string;
  ends_at: string;
  location: string | null;
  location_url: string | null;
  campus: Campus | null;
  type: EventType;
  status: EventStatus;
  organizer_id: string;
  max_attendees: number | null;
  stream_url: string | null;
  is_public: boolean;
  meta_description: string | null;
  deleted_at: string | null;
}

export interface Comment {
  id: string;
  created_at: string;
  updated_at: string;
  post_id: string;
  author_id: string;
  parent_id: string | null;
  content: string;
  is_approved: boolean;
  deleted_at: string | null;
}

export interface Material {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string | null;
  file_url: string;
  file_type: MaterialType;
  file_size: number | null;
  category: string | null;
  uploaded_by: string;
  is_public: boolean;
  downloads_count: number;
  deleted_at: string | null;
}

export interface Notification {
  id: string;
  created_at: string;
  user_id: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
}

// ===== TIPOS COMPOSTOS =====

export interface PostWithAuthor extends Post {
  author: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
  category: Pick<Category, 'id' | 'name' | 'slug' | 'color'>;
  tags?: Tag[];
}

export interface EventWithOrganizer extends Event {
  organizer: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
}

export interface CommentWithAuthor extends Comment {
  author: Pick<Profile, 'id' | 'name' | 'avatar_url'>;
  replies?: CommentWithAuthor[];
}

// ===== TIPOS DE RESPOSTA API =====

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

// ===== TIPOS DE FORMULÁRIO =====

export interface SearchParams {
  q?: string;
  category?: string;
  campus?: Campus;
  page?: string;
  sort?: 'recent' | 'popular';
}
