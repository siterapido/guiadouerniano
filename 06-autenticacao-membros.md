# 06 - Sistema de Autenticação e Membros

Guia completo de autenticação e sistema de membros para o "Guia do UERNIANO", utilizando **Supabase Auth + Next.js 14 App Router**.

---

## 1. Visão Geral do Sistema de Auth

### Fluxo Completo de Autenticação

```
┌─────────────────────────────────────────────────────────────────┐
│                   FLUXO DE AUTENTICAÇÃO                         │
└─────────────────────────────────────────────────────────────────┘

                            PÚBLICO
                              │
                         LoginForm
                         ou Register
                              │
                    ┌─────────┴─────────┐
                    │                   │
              Email+Password      Google OAuth
                    │                   │
                    └─────────┬─────────┘
                              │
                    Supabase Auth API
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
     ❌ ERRO           ✓ SUCESSO            └─ Redirect OAuth
        │                     │
    Toast Erro          Session Cookie
        │              (httpOnly, Secure)
        │                     │
        │            Middleware Validation
        │                     │
        │            ┌────────┴────────┐
        │            │                 │
        │        Profile       Role Verification
        │        Check              │
        │            │              │
        │            └────┬─────────┘
        │                 │
        │            ┌────┴────┐
        │            │          │
        │      Protected    Public
        │      Routes       Routes
        │            │          │
        └────────────┴──────────┘
                    │
            User Experience
```

### Matriz de Roles e Permissões

| Ação | Student | Member | Editor | Admin |
|------|---------|--------|--------|-------|
| Visualizar posts públicos | ✓ | ✓ | ✓ | ✓ |
| Visualizar conteúdo de membros | ✗ | ✓ | ✓ | ✓ |
| Criar posts | ✗ | ✗ | ✓ | ✓ |
| Editar posts próprios | ✗ | ✗ | ✓ | ✓ |
| Editar posts de outros | ✗ | ✗ | ✗ | ✓ |
| Deletar posts | ✗ | ✗ | ✗ | ✓ |
| Gerenciar categorias | ✗ | ✗ | ✗ | ✓ |
| Gerenciar eventos | ✗ | ✗ | ✗ | ✓ |
| Gerenciar usuários | ✗ | ✗ | ✗ | ✓ |
| Elevar role de usuários | ✗ | ✗ | ✗ | ✓ |
| Acessar /admin | ✗ | ✗ | ✗ | ✓ |
| Acessar /membros | ✗ | ✓ | ✓ | ✓ |

### Estratégia de Sessão

- **Tipo**: Cookie httpOnly (não acessível via JavaScript)
- **Duração**: 7 dias
- **Refresh**: Automático via middleware (a cada 15 min)
- **Segurança**: Secure flag (HTTPS only), SameSite=Lax
- **Storage**: Supabase auth.session table

---

## 2. Configuração do Supabase Auth

### Providers Habilitados

#### Email/Password
1. Acesse **Authentication → Providers** no Supabase Dashboard
2. Habilite "Email" provider
3. Desabilite "Confirm email" se quiser signup instantâneo, ou deixe habilitado para confirmar via link

#### Google OAuth
1. Vá para **Authentication → Providers → Google**
2. Copie o Redirect URL: `https://seu-dominio.com/auth/callback`
3. Configure no Google Cloud Console:
   - Criar OAuth 2.0 Client ID (Web application)
   - URLs autorizadas: `https://seu-dominio.com`
   - URLs redirecionamento: `https://seu-dominio.com/auth/callback`
4. Copie Client ID e Client Secret para Supabase

### Configurações de Email (Português)

Acesse **Authentication → Email Templates** no Supabase Dashboard:

**Template: Confirmação de Email**
```
Assunto: Confirme seu email - Guia do UERNIANO

Olá {{ .Email }},

Bem-vindo ao Guia do UERNIANO! Para começar, confirme seu endereço de email clicando no link abaixo:

{{ .ConfirmationURL }}

Este link expira em 24 horas.

Se você não se registrou, ignore este email.

Movimentação Correnteza
```

**Template: Reset de Senha**
```
Assunto: Redefinir sua senha - Guia do UERNIANO

Olá {{ .Email }},

Recebemos uma solicitação para redefinir sua senha. Clique no link abaixo:

{{ .RecoveryURL }}

Este link expira em 1 hora. Se você não solicitou isso, ignore este email.

Movimentação Correnteza
```

### Configurações de Segurança

**No Supabase Dashboard → Authentication → Providers:**

- **PKCE**: Habilitado (padrão para OAuth)
- **Habilitar email confirmação**: Sim
- **Auto confirm users**: Não
- **Double confirm changes**: Sim
- **Enable signup (via Email)**: Sim
- **Enable magic link**: Opcional
- **Disallow sign ups**: Não (deixar aberto para public signup)

**Rate Limiting:**
- Limite de 5 tentativas de login em 1 hora (configurado no Supabase automaticamente)
- Limite de 5 tentativas de resetar senha em 1 hora

### Variáveis de Ambiente

Crie `.env.local`:
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... # Apenas servidor

# URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000 # Produção: https://seu-dominio.com
```

### Configuração no Next.js

**`lib/supabase/server.ts` - Cliente Server (com Service Role)**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            )
          } catch {
            // Ignorar erros em certos contextos (ex: prerender)
          }
        },
      },
    }
  )
}

// Para operações admin (com SERVICE_ROLE_KEY)
export function createAdminSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            )
          } catch {}
        },
      },
    }
  )
}
```

**`lib/supabase/client.ts` - Cliente Browser**
```typescript
import { createBrowserClient } from '@supabase/ssr'

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  return supabaseClient
}
```

---

## 3. Middleware de Proteção de Rotas

### Matriz de Rotas

| Rota | Acesso | Comportamento |
|------|--------|---------------|
| `/` | Público | Qualquer um vê |
| `/blog` | Público | Qualquer um vê |
| `/guia/*` | Público | Qualquer um vê |
| `/eventos` | Público | Qualquer um vê |
| `/login` | Público | Se autenticado → `/membros` |
| `/register` | Público | Se autenticado → `/membros` |
| `/forgot-password` | Público | Se autenticado → `/membros` |
| `/auth/callback` | Sistema | Processa OAuth callback |
| `/membros` | Member+ | Se não autenticado → `/login` |
| `/membros/*` | Member+ | Se não autenticado → `/login` |
| `/editor` | Editor+ | Se role < editor → `/membros` |
| `/editor/*` | Editor+ | Se role < editor → `/membros` |
| `/admin` | Admin | Se role != admin → `/membros` |
| `/admin/*` | Admin | Se role != admin → `/membros` |
| `/api/auth/*` | Público | Server routes para auth |
| `/api/*` | Variável | Conforme necessário |

### `middleware.ts` Completo

```typescript
import { type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/blog', '/guia', '/eventos']
const memberOnlyRoutes = ['/membros', '/editor']
const adminOnlyRoutes = ['/admin']

export async function middleware(request: NextRequest) {
  let response = request.nextResponse.clone()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options as CookieOptions)
          })
        },
      },
    }
  )

  // Refresh da sessão (automático a cada requisição)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Se não autenticado
  if (!user) {
    // Tentando acessar rota protegida
    if (pathname.startsWith('/membros') || pathname.startsWith('/admin') || pathname.startsWith('/editor')) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    // Tentando acessar login/register já autenticado
    if (pathname === '/login' || pathname === '/register') {
      // Deixa passar (não redireciona)
    }
    return response
  }

  // Se autenticado
  // Tentando acessar login/register
  if (pathname === '/login' || pathname === '/register') {
    return NextResponse.redirect(new URL('/membros', request.url))
  }

  // Verificar role do usuário
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const userRole = profile?.role || 'student'

  // Proteção por role
  if (pathname.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/membros', request.url))
  }

  if (pathname.startsWith('/editor') && !['editor', 'admin'].includes(userRole)) {
    return NextResponse.redirect(new URL('/membros', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/public).*)',
  ],
}

import { NextResponse } from 'next/server'
```

---

## 4. Hooks e Providers

### `lib/auth-context.tsx` - AuthProvider

```typescript
'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { getSupabaseClient } from './supabase/client'

interface Profile {
  id: string
  full_name: string | null
  avatar_url: string | null
  role: 'student' | 'member' | 'editor' | 'admin'
  campus: string | null
  course: string | null
  created_at: string
}

interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  isAuthenticated: boolean
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    // Verificar usuário na montagem
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setUser(user)

        if (user) {
          const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          setProfile(data as Profile)
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Listener de auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)

      if (session?.user) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        setProfile(data as Profile)
      } else {
        setProfile(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        isAuthenticated: !!user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }
  return context
}
```

### `lib/hooks/useProfile.ts`

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'
import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'

export function useProfile() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [campus, setCampus] = useState<string | null>(null)
  const [course, setCourse] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = getSupabaseClient()

  useEffect(() => {
    if (!user) {
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        const { data } = await supabase
          .from('profiles')
          .select('full_name, avatar_url, campus, course')
          .eq('id', user.id)
          .single()

        if (data) {
          setFullName(data.full_name)
          setAvatarUrl(data.avatar_url)
          setCampus(data.campus)
          setCourse(data.course)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, supabase])

  return { fullName, avatarUrl, campus, course, loading }
}
```

### `lib/hooks/usePermissions.ts`

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'

export function usePermissions() {
  const { profile } = useAuth()

  const role = profile?.role || 'student'

  return {
    isMember: ['member', 'editor', 'admin'].includes(role),
    isEditor: ['editor', 'admin'].includes(role),
    isAdmin: role === 'admin',
    isStudent: role === 'student',
    canEdit: ['editor', 'admin'].includes(role),
    canAdmin: role === 'admin',
    canCreatePost: ['editor', 'admin'].includes(role),
    canAccessMembers: ['member', 'editor', 'admin'].includes(role),
    role,
  }
}
```

---

## 5. Componentes de Auth

### `components/auth/LoginForm.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        toast.error(error.message || 'Erro ao fazer login')
        return
      }

      toast.success('Login realizado com sucesso!')
      router.push('/membros')
      router.refresh()
    } catch (error) {
      toast.error('Erro inesperado ao fazer login')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
      })

      if (error) {
        toast.error(error.message || 'Erro ao fazer login com Google')
      }
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setGoogleLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={loading || googleLoading}
          required
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading || googleLoading}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading || googleLoading}>
        {loading ? 'Entrando...' : 'Entrar'}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">ou</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleSignIn}
        disabled={loading || googleLoading}
      >
        {googleLoading ? 'Conectando...' : 'Entrar com Google'}
      </Button>

      <div className="text-center text-sm text-gray-600">
        <p>
          Não tem conta?{' '}
          <a href="/register" className="font-medium text-blue-600 hover:underline">
            Cadastre-se
          </a>
        </p>
        <p>
          <a href="/forgot-password" className="font-medium text-blue-600 hover:underline">
            Esqueceu a senha?
          </a>
        </p>
      </div>
    </form>
  )
}
```

### `components/auth/RegisterForm.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { createAccount } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  fullName: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  course: z.string().min(1, 'Selecione um curso'),
  campus: z.string().min(1, 'Selecione um campus'),
})

const COURSES = [
  'Engenharia Civil',
  'Engenharia Elétrica',
  'Engenharia Mecânica',
  'Ciência da Computação',
  'Sistema de Informação',
  'Outro',
]

const CAMPUSES = [
  'Mossoró',
  'Caicó',
  'Assú',
  'Pau dos Ferros',
  'Currais Novos',
]

export function RegisterForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    course: '',
    campus: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    try {
      registerSchema.parse(formData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0]] = err.message
          }
        })
        setErrors(newErrors)
      }
      return
    }

    startTransition(async () => {
      try {
        const result = await createAccount(formData)

        if (result.error) {
          toast.error(result.error)
          return
        }

        toast.success('Conta criada! Verifique seu email para confirmar.')
        router.push('/login')
      } catch (error) {
        toast.error('Erro ao criar conta')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium">
          Nome Completo
        </label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          disabled={isPending}
          required
        />
        {errors.fullName && <p className="text-sm text-red-600 mt-1">{errors.fullName}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email (preferível @uern.br)
        </label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="seu@email.com"
          disabled={isPending}
          required
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Senha
        </label>
        <Input
          id="password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          placeholder="••••••••"
          disabled={isPending}
          required
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password}</p>}
      </div>

      <div>
        <label htmlFor="campus" className="block text-sm font-medium">
          Campus
        </label>
        <select
          id="campus"
          value={formData.campus}
          onChange={(e) => setFormData({ ...formData, campus: e.target.value })}
          disabled={isPending}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Selecione um campus</option>
          {CAMPUSES.map((campus) => (
            <option key={campus} value={campus}>
              {campus}
            </option>
          ))}
        </select>
        {errors.campus && <p className="text-sm text-red-600 mt-1">{errors.campus}</p>}
      </div>

      <div>
        <label htmlFor="course" className="block text-sm font-medium">
          Curso
        </label>
        <select
          id="course"
          value={formData.course}
          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
          disabled={isPending}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          required
        >
          <option value="">Selecione um curso</option>
          {COURSES.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
        </select>
        {errors.course && <p className="text-sm text-red-600 mt-1">{errors.course}</p>}
      </div>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? 'Criando conta...' : 'Criar Conta'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Já tem conta?{' '}
        <a href="/login" className="font-medium text-blue-600 hover:underline">
          Faça login
        </a>
      </p>
    </form>
  )
}
```

### `components/auth/ForgotPasswordForm.tsx`

```typescript
'use client'

import { useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const supabase = getSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      })

      if (error) {
        toast.error(error.message || 'Erro ao enviar email')
        return
      }

      setSent(true)
      toast.success('Email de recuperação enviado!')
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="w-full max-w-md text-center space-y-4">
        <p className="text-green-600 font-medium">
          Email de recuperação enviado! Verifique sua caixa de entrada.
        </p>
        <Button onClick={() => window.location.href = '/login'}>
          Voltar para Login
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Enviando...' : 'Enviar Link de Recuperação'}
      </Button>

      <p className="text-center text-sm text-gray-600">
        <a href="/login" className="font-medium text-blue-600 hover:underline">
          Voltar para Login
        </a>
      </p>
    </form>
  )
}
```

### `components/auth/ResetPasswordForm.tsx`

```typescript
'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export function ResetPasswordForm() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = getSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error('As senhas não correspondem')
      return
    }

    if (password.length < 8) {
      toast.error('Senha deve ter no mínimo 8 caracteres')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: password,
      })

      if (error) {
        toast.error(error.message || 'Erro ao redefinir senha')
        return
      }

      toast.success('Senha redefinida com sucesso!')
      router.push('/login')
    } catch (error) {
      toast.error('Erro inesperado')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Nova Senha
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium">
          Confirmar Senha
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          disabled={loading}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Redefinindo...' : 'Redefinir Senha'}
      </Button>
    </form>
  )
}
```

### `components/auth/ProtectedRoute.tsx`

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login')
    }
  }, [loading, isAuthenticated, router])

  if (loading) {
    return fallback || <div>Carregando...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
```

### `components/auth/RoleGate.tsx`

```typescript
'use client'

import { usePermissions } from '@/lib/hooks/usePermissions'
import { useAuth } from '@/lib/auth-context'

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: ('student' | 'member' | 'editor' | 'admin')[]
  fallback?: React.ReactNode
}

export function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { profile, loading } = useAuth()
  const { role } = usePermissions()

  if (loading) {
    return fallback || null
  }

  if (!allowedRoles.includes(role as any)) {
    return fallback || null
  }

  return <>{children}</>
}
```

---

## 6. Fluxos Completos

### Fluxo de Registro

```
┌─────────────────────────────────────────────────────────────┐
│                  FLUXO DE REGISTRO                          │
└─────────────────────────────────────────────────────────────┘

1. Usuário acessa /register
   ↓
2. Preenche RegisterForm:
   - Email
   - Senha
   - Nome completo
   - Campus
   - Curso
   ↓
3. Validação Zod (client-side)
   - Email válido
   - Senha min 8 chars
   - Nome min 3 chars
   ↓
4. Submit → Server Action: createAccount()
   ↓
5. Server-side (createAccount):
   a) Validação Zod novamente
   b) supabase.auth.admin.createUser()
      - Email
      - Senha (hasheada automaticamente)
      - Email confirmed = false
   c) Database trigger cria profile automaticamente
      ↓
      profiles table:
      {
        id: user.id,
        email: email,
        full_name: fullName,
        campus: campus,
        course: course,
        role: 'student', // default
        avatar_url: null,
        created_at: now()
      }
   ↓
6. Supabase envia email de confirmação
   - Template em português
   - Link com token de confirmação
   - Expira em 24 horas
   ↓
7. Usuário clica no email
   - Confirma email
   - Supabase marca: auth.users.email_confirmed_at = now()
   ↓
8. Cliente redireciona para /login
   ↓
9. Toast: "Email confirmado! Você já pode fazer login."
```

**`app/actions/auth.ts`:**
```typescript
'use server'

import { createAdminSupabaseClient } from '@/lib/supabase/server'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(3),
  course: z.string().min(1),
  campus: z.string().min(1),
})

export async function createAccount(data: unknown) {
  try {
    const validated = registerSchema.parse(data)

    const supabase = createAdminSupabaseClient()

    const { error: authError } = await supabase.auth.admin.createUser({
      email: validated.email,
      password: validated.password,
      email_confirm: false,
    })

    if (authError) {
      return { error: authError.message }
    }

    // Profile é criado automaticamente via trigger do Supabase
    // Mas podemos também fazer manualmente para garantir:
    const {
      data: { user },
    } = await supabase.auth.admin.getUserById(validated.email)

    if (user) {
      await supabase.from('profiles').insert({
        id: user.id,
        full_name: validated.fullName,
        campus: validated.campus,
        course: validated.course,
        role: 'student',
      })
    }

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: 'Dados inválidos' }
    }
    return { error: 'Erro ao criar conta' }
  }
}
```

### Fluxo de Login

```
┌─────────────────────────────────────────────────────────────┐
│                   FLUXO DE LOGIN                            │
└─────────────────────────────────────────────────────────────┘

1. Usuário acessa /login
   ↓
2. Preenche LoginForm:
   - Email
   - Senha
   ↓
3. Submit → supabase.auth.signInWithPassword()
   ↓
4. Supabase verifica:
   a) Usuário existe
   b) Email confirmado
   c) Senha correta
   d) Conta não desativada
   ↓
5. Se sucesso:
   - Retorna session (access_token + refresh_token)
   - Cookie httpOnly setado automaticamente
   ↓
6. Middleware valida em próximas requisições:
   - Verifica cookie
   - Refresh automático se necessário (a cada 15 min)
   - Recupera profile do usuário
   ↓
7. Usuário é redirecionado para /membros
   ↓
8. Toast: "Login realizado com sucesso!"
```

### Fluxo Google OAuth

```
┌─────────────────────────────────────────────────────────────┐
│              FLUXO GOOGLE OAUTH                             │
└─────────────────────────────────────────────────────────────┘

1. Usuário clica "Entrar com Google"
   ↓
2. supabase.auth.signInWithOAuth({provider: 'google'})
   ↓
3. Redireciona para Google Login
   ↓
4. Usuário faz login no Google / Aprova acesso
   ↓
5. Google redireciona para /auth/callback com code
   ↓
6. Route Handler em /auth/callback:
   a) Recebe code da URL
   b) exchangeCodeForSession(code)
   c) Supabase processa o code
   d) Cria ou atualiza usuário
   ↓
7. Se novo usuário:
   - Auth user criado
   - Profile criado automaticamente
   - Role = 'student' (default)
   ↓
8. Se usuário existente:
   - Session atualizada
   - Profile mantido
   ↓
9. Redireciona para /membros
   ↓
10. Toast: "Login realizado!"
```

**`app/auth/callback/route.ts`:**
```typescript
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as CookieOptions)
            )
          },
        },
      }
    )

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      return NextResponse.redirect(new URL('/membros', request.url))
    }
  }

  // Erro no callback
  return NextResponse.redirect(
    new URL('/login?error=Falha%20na%20autenticação', request.url)
  )
}
```

### Fluxo de Recuperação de Senha

```
1. Usuário acessa /forgot-password
2. Preenche email
3. Clica "Enviar Link de Recuperação"
4. Server envia resetPasswordForEmail(email)
   - Email com link (vário em 1 hora)
5. Usuário clica no link
   - Acessa /reset-password?token=...
6. Preenche nova senha
7. supabase.auth.updateUser({password: newPassword})
8. Redireciona para /login
```

### Fluxo de Elevação de Role

```
┌─────────────────────────────────────────────────────────────┐
│     FLUXO DE ELEVAÇÃO (student → member)                   │
└─────────────────────────────────────────────────────────────┘

1. Admin acessa /admin/users
   ↓
2. Clica em "Elevar para Membro" em um usuário student
   ↓
3. Server Action: promoteUserToMember(userId)
   - Verifica se admin
   - Atualiza profiles.role = 'member'
   - Log de auditoria
   ↓
4. Cliente refetch de profiles
   ↓
5. Usuário agora pode acessar /membros
   - Se estava logado, sessão atualizada em próxima requisição
```

---

## 7. Área de Membros

### O que é Exclusivo para Membros

| Funcionalidade | Público | Membros |
|---|---|---|
| Ver posts do blog | ✓ | ✓ |
| Ver guia | ✓ | ✓ |
| Ver eventos | ✓ | ✓ |
| Acessar /membros | ✗ | ✓ |
| Ver conteúdo exclusivo | ✗ | ✓ |
| Ver discussões do movimento | ✗ | ✓ |
| Acessar editor | ✗ | Só editors/admins |

### Proteção no Nível do Componente

```typescript
// Use RoleGate para ociltar conteúdo
<RoleGate allowedRoles={['member', 'editor', 'admin']}>
  <div className="bg-blue-100 p-4 rounded">
    Conteúdo exclusivo para membros!
  </div>
</RoleGate>
```

### Proteção no Nível do Servidor

```typescript
// app/membros/page.tsx - Server Component
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function MembersPage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!['member', 'editor', 'admin'].includes(profile?.role)) {
    redirect('/upgrade')
  }

  // Renderizar conteúdo seguro
  return <div>Conteúdo de membros</div>
}
```

### Página de "Upgrade para Membro"

```typescript
// app/upgrade/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { usePermissions } from '@/lib/hooks/usePermissions'

export default function UpgradePage() {
  const { isMember } = usePermissions()
  const router = useRouter()

  if (isMember) {
    router.push('/membros')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">Upgrade para Membro</h1>
      <p className="text-gray-600 mb-6">
        Você é um estudante da UERN! Você já pode acessar o conteúdo exclusivo do movimento.
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
        <h2 className="font-bold text-lg mb-2">Por que ser membro?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Acesso a conteúdo exclusivo do movimento</li>
          <li>Participar de discussões</li>
          <li>Receber atualizações do movimento</li>
        </ul>
      </div>

      <button
        onClick={() => router.push('/login')}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
      >
        Fazer Login
      </button>

      <p className="text-gray-600 mt-4">
        Não tem conta?{' '}
        <a href="/register" className="text-blue-600 hover:underline font-medium">
          Cadastre-se aqui
        </a>
      </p>
    </div>
  )
}
```

---

## 8. Gerenciamento de Sessão

### Verificar Sessão em Server Component

```typescript
// app/profile/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Aqui user está garantido
  return <div>Email: {user.email}</div>
}
```

### Verificar Sessão em Client Component

```typescript
'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'

export function UserGreeting() {
  const { user, loading } = useAuth()
  const router = useRouter()

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!user) {
    router.push('/login')
    return null
  }

  return <div>Olá, {user.email}!</div>
}
```

### Logout

```typescript
// Hook ou função
export async function handleLogout() {
  const supabase = getSupabaseClient()
  await supabase.auth.signOut()
  // AuthContext atualiza automaticamente
  // Redirecionar para home
  router.push('/')
}
```

### Sessões Simultâneas

Supabase permite uma sessão por dispositivo. Se usuário fizer login em outro dispositivo, a sessão anterior é invalidada automaticamente.

---

## 9. Segurança

### CSRF Protection

Next.js App Router protege automaticamente contra CSRF com:
- SameSite cookies
- Origin verification
- Preflight requests

Para Server Actions:
```typescript
// Automático no Next.js 13+
'use server'

export async function serverAction(formData: FormData) {
  // CSRF token verificado automaticamente
}
```

### Rate Limiting nas Server Actions

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'),
})

export async function loginUser(email: string, password: string) {
  const { success } = await ratelimit.limit(`login:${email}`)

  if (!success) {
    throw new Error('Muitas tentativas de login. Tente novamente em 1 hora.')
  }

  // Continuar com login
}
```

### Validação de Emails

- Supabase valida automaticamente formato
- Usuário deve confirmar email antes de usar certos recursos
- Re-envio de confirmação disponível

### Auditoria

```typescript
// Criar tabela de auditoria
/*
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users,
  action TEXT NOT NULL,
  details JSONB,
  ip_address INET,
  created_at TIMESTAMP DEFAULT NOW()
);
*/

export async function logAudit(
  userId: string,
  action: string,
  details?: Record<string, any>,
  ipAddress?: string
) {
  const supabase = createAdminSupabaseClient()

  await supabase.from('audit_logs').insert({
    user_id: userId,
    action,
    details,
    ip_address: ipAddress,
  })
}
```

---

## Resumo do Sistema

- **Auth**: Supabase Auth (Email/Password + Google OAuth)
- **Sessions**: HttpOnly cookies com refresh automático
- **Roles**: 4 níveis (student, member, editor, admin)
- **Proteção**: Middleware + RoleGate + Server-side checks
- **Segurança**: CSRF automático, Rate limiting, validação Zod, auditoria
- **UX**: Login rápido com Google, email confirmação, recuperação de senha

Este é um sistema production-ready e escalável.
