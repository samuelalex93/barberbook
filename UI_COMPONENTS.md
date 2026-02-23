# Componentes UI Padronizados

Este documento descreve os componentes UI reutilizáveis criados para padronizar botões e inputs em todo o projeto.

## 📁 Localização

Todos os componentes estão localizados em `src/components/ui/`:

- `Button.tsx` - Componente de botão
- `Input.tsx` - Componente de input de texto
- `PasswordInput.tsx` - Componente de input de senha
- `IconButton.tsx` - Componente de botão com ícone
- `index.ts` - Arquivo de exportação central

## 🎯 Como Importar

```tsx
import { Button, Input, PasswordInput, IconButton } from '../components/ui';
```

## 📝 Componentes

### Button

Botão versátil com suporte a diferentes variações e tamanhos.

```tsx
<Button 
  variant="primary" 
  size="md" 
  fullWidth 
  loading={false}
  onClick={() => {}}
>
  Clique aqui
</Button>
```

**Props:**
- `variant`: `'primary' | 'secondary' | 'tertiary' | 'danger'` (padrão: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `loading`: `boolean` (padrão: `false`)
- `fullWidth`: `boolean` (padrão: `false`)
- `disabled`: `boolean`

**Variações:**
- **primary** - Cor principal (laranja), para ações principais
- **secondary** - Cor secundária (cinza), para ações alternativas
- **tertiary** - Bordado/contorno, para ações terciárias
- **danger** - Vermelho, para ações destrutivas

---

### Input

Input de texto com suporte a ícone, label e validação.

```tsx
import { Mail } from 'lucide-react';
import { COLORS } from '../constants/colors';

<Input
  type="email"
  label="Email"
  placeholder="seu@email.com"
  icon={<Mail className="w-5 h-5" style={{ color: COLORS.textTertiary }} />}
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error="Email inválido"
  required
/>
```

**Props:**
- `label`: `string` - Rótulo do input
- `icon`: `React.ReactNode` - Ícone à esquerda do input
- `error`: `string` - Mensagem de erro
- `fullWidth`: `boolean` (padrão: `true`)
- `type`: `string` - Tipo do input (email, text, tel, etc)
- Suporta todos os atributos padrão do `<input>`

---

### PasswordInput

Input especializado para senhas com toggle de visibilidade.

```tsx
<PasswordInput
  label="Senha"
  placeholder="••••••••"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  error={errorMessage}
  required
/>
```

**Props:**
- `label`: `string` - Rótulo do input
- `error`: `string` - Mensagem de erro
- `fullWidth`: `boolean` (padrão: `true`)
- Suporta todos os atributos padrão do `<input>`

---

### IconButton

Botão com ícone centralizado, ideal para ações rápidas.

```tsx
import { X } from 'lucide-react';

<IconButton
  icon={<X className="w-6 h-6" />}
  variant="ghost"
  size="md"
  onClick={() => {}}
/>
```

**Props:**
- `icon`: `React.ReactNode` - Ícone a exibir
- `variant`: `'primary' | 'secondary' | 'ghost'` (padrão: `'ghost'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `disabled`: `boolean`

---

## 🎨 Exemplos de Uso

### Formulário de Login

```tsx
import { Mail } from 'lucide-react';
import { Button, Input, PasswordInput } from '../components/ui';
import { COLORS } from '../constants/colors';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className="space-y-4">
      <Input
        type="email"
        label="Email"
        placeholder="seu@email.com"
        icon={<Mail className="w-5 h-5" style={{ color: COLORS.textTertiary }} />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <PasswordInput
        label="Senha"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" variant="primary" fullWidth>
        Entrar
      </Button>
    </form>
  );
}
```

### Modal Header com Close

```tsx
import { X } from 'lucide-react';
import { IconButton } from '../components/ui';

export function ModalHeader({ onClose }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Título</h1>
      <IconButton 
        onClick={onClose}
        icon={<X className="w-6 h-6" />}
        variant="ghost"
      />
    </div>
  );
}
```

### Barra de Navegação com Botões

```tsx
import { Button, IconButton } from '../components/ui';
import { Bell, Menu } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center justify-between">
      <h1>Logo</h1>
      <div className="flex gap-2">
        <IconButton icon={<Bell className="w-5 h-5" />} variant="ghost" />
        <IconButton icon={<Menu className="w-5 h-5" />} variant="ghost" />
      </div>
    </div>
  );
}
```

---

## 🎨 Tema de Cores

Os componentes usam as cores definidas em `src/constants/colors.ts`:

```tsx
import { COLORS } from '../constants/colors';

// COLORS.accent - Cor principal (laranja)
// COLORS.accentDark - Cor principal escura
// COLORS.text - Texto principal
// COLORS.textSecondary - Texto secundário
// COLORS.textTertiary - Texto terciário
// COLORS.light - Fundo claro
// COLORS.mid - Cor intermediária (bordas)
// COLORS.danger - Cor de perigo (vermelho)
```

---

## 📁 Arquivos Refatorados

Os seguintes arquivos foram atualizados para usar os novos componentes:

- `src/components/LoginModal.tsx`
- `src/components/SignupModal.tsx`
- `src/components/EditProfileModal.tsx`
- `src/pages/Dashboard.tsx`
- `src/pages/Profile.tsx`
- `src/pages/Appointments.tsx`
- `src/pages/Search.tsx`

---

## ✨ Benefícios

✅ **Consistência** - Todos os botões e inputs seguem o mesmo padrão visual
✅ **Reutilização** - Reduza duplicação de código
✅ **Manutenção** - Mudanças em um só lugar afetam todo o projeto
✅ **Acessibilidade** - Estados de disabled e focus são tratados automaticamente
✅ **Responsividade** - Componentes adaptam-se naturalmente a diferentes tamanhos de tela
