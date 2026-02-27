# Serviço de API StudioBook - Implementação Completa

## 📦 Instalação

O axios foi instalado como dependência do projeto:

```bash
npm install axios
```

## 📁 Estrutura de Arquivos Criados

```
src/
├── services/
│   ├── api.ts                    # Configuração base do axios
│   ├── auth.service.ts           # Serviço de autenticação
│   ├── user.service.ts           # Serviço de usuários
│   ├── barbershop.service.ts     # Serviço de barbearias
│   ├── service.service.ts        # Serviço de serviços (cortes, etc)
│   ├── appointment.service.ts    # Serviço de agendamentos
│   ├── index.ts                  # Exportações centralizadas
│   └── README.md                 # Documentação dos serviços
├── types/
│   └── index.ts                  # Tipos e interfaces TypeScript
└── components/
    └── ExemploServicos.tsx       # Componente de exemplo de uso

.env.example                      # Arquivo de exemplo de variáveis
.env.local                        # Variáveis de ambiente locais
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto (já foi criado):

```env
VITE_API_BASE_URL=http://localhost:3000
```

## 📚 Serviços Implementados

### 1. **authService** - Autenticação
- `register()` - Registrar novo usuário
- `login()` - Fazer login
- `saveToken()` - Salvar token no localStorage
- `getToken()` - Obter token
- `logout()` - Fazer logout
- `isAuthenticated()` - Verificar autenticação

### 2. **userService** - Gerenciamento de Usuários
- `list()` - Listar usuários (paginado)
- `getById()` - Buscar por ID
- `getByRole()` - Listar por role (BARBER, CLIENT, OWNER, MANAGER)
- `getByBarbershop()` - Listar por barbearia
- `create()` - Criar novo usuário
- `update()` - Atualizar usuário
- `delete()` - Deletar usuário

### 3. **barbershopService** - Gerenciamento de Barbearias
- `list()` - Listar barbearias (paginado)
- `getById()` - Buscar por ID
- `getByOwner()` - Listar por proprietário
- `create()` - Criar barbearia
- `update()` - Atualizar barbearia
- `delete()` - Deletar barbearia

### 4. **serviceService** - Gerenciamento de Serviços
- `list()` - Listar serviços (paginado)
- `getById()` - Buscar por ID
- `getByBarbershop()` - Listar por barbearia
- `create()` - Criar serviço
- `update()` - Atualizar serviço
- `delete()` - Deletar serviço

### 5. **appointmentService** - Gerenciamento de Agendamentos
- `list()` - Listar agendamentos (paginado)
- `getById()` - Buscar por ID
- `getByBarber()` - Listar por barbeiro
- `getByClient()` - Listar por cliente
- `getByBarbershop()` - Listar por barbearia
- `create()` - Agendar horário
- `update()` - Atualizar agendamento
- `cancel()` - Cancelar agendamento
- `delete()` - Deletar agendamento

## 🎯 Como Usar

### Importação Simples

```typescript
import { authService, userService, barbershopService, serviceService, appointmentService } from '@/services';
import type { User, Barbershop, Appointment } from '@/types';
```

### Exemplo de Login

```typescript
const response = await authService.login({
  email: 'user@example.com',
  password: 'senha123'
});

authService.saveToken(response.accessToken);
localStorage.setItem('user', JSON.stringify(response));
```

### Exemplo de Listar Usuários

```typescript
try {
  const { data: users, total } = await userService.list(1, 10);
  console.log(`Total de usuários: ${total}`);
  console.log(users);
} catch (error) {
  console.error('Erro ao buscar usuários:', error);
}
```

### Exemplo de Criar Agendamento

```typescript
const appointment = await appointmentService.create(
  'barber-uuid',
  'barbershop-uuid',
  {
    service_id: 'service-uuid',
    start_time: '2024-03-01T14:00:00Z',
    end_time: '2024-03-01T14:45:00Z'
  }
);
```

## 🔐 Autenticação Automática

Os interceptadores do axios adicionam automaticamente o token JWT no header:

```
Authorization: Bearer {token}
```

O token é lido do `localStorage` a cada requisição.

## 🛡️ Tratamento de Erros

```typescript
try {
  const user = await userService.getById('invalid-id');
} catch (error: any) {
  if (error.response?.status === 404) {
    console.log('Usuário não encontrado');
  } else if (error.response?.status === 401) {
    console.log('Não autenticado - redirecionando para login');
  } else {
    console.error('Erro:', error.message);
  }
}
```

## 📝 Tipos Disponíveis

```typescript
// Usuários
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  barbershop_id?: string;
}

// Barbearias
interface Barbershop {
  id: string;
  name: string;
  description?: string;
  address: string;
  phone: string;
  owner_id: string;
}

// Serviços
interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration_minutes: number;
  barbershop_id: string;
}

// Agendamentos
interface Appointment {
  id: string;
  service_id: string;
  barber_id: string;
  client_id: string;
  barbershop_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
}

// Respostas paginadas
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
```

## ✅ Teste de Compilação

O projeto foi compilado e validado com sucesso:

```bash
✓ built in 2.24s
```

## 📖 Documentação Adicional

Consulte [src/services/README.md](./src/services/README.md) para exemplos mais detalhados.

## 🚀 Próximos Passos

1. Configure a URL da API no arquivo `.env.local`
2. Use os serviços em seus componentes React
3. Implemente tratamento de erros apropriado
4. Configure o contexto de autenticação (opcional)
5. Teste os serviços com a API rodando localmente

## 📦 Dependências Adicionadas

- **axios**: ^23.0.0 - HTTP client para fazer requisições à API
