# API Service Documentation

Serviço de integração com a API StudioBook utilizando Axios.

## Configuração

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Se não configurado, a URL padrão é `http://localhost:3000`.

## Importação

Você pode importar todos os serviços:

```typescript
import { authService, userService, barbershopService, serviceService, appointmentService } from '@/services';
```

Ou importar serviços específicos:

```typescript
import { authService } from '@/services/auth.service';
import { userService } from '@/services/user.service';
```

## Exemplos de Uso

### Autenticação

```typescript
// Registrar novo usuário
const authResponse = await authService.register({
  name: 'João Silva',
  email: 'joao@example.com',
  password: 'senha123',
  role: 'CLIENT'
});

authService.saveToken(authResponse.accessToken);

// Login
const loginResponse = await authService.login({
  email: 'joao@example.com',
  password: 'senha123'
});

authService.saveToken(loginResponse.accessToken);

// Logout
authService.logout();

// Verificar autenticação
if (authService.isAuthenticated()) {
  console.log('Usuário autenticado');
}
```

### Usuários

```typescript
// Listar usuários
const users = await userService.list(1, 10);

// Buscar por ID
const user = await userService.getById('user-id');

// Listar por role
const barbers = await userService.getByRole('BARBER');

// Listar por barbearia
const shopUsers = await userService.getByBarbershop('barbershop-id');

// Criar usuário
const newUser = await userService.create({
  name: 'Maria',
  email: 'maria@example.com',
  password: 'senha123',
  role: 'BARBER',
  barbershop_id: 'shop-id'
});

// Atualizar usuário
const updated = await userService.update('user-id', {
  name: 'Novo Nome',
  email: 'novo@example.com'
});

// Deletar usuário
await userService.delete('user-id');
```

### Barbearias

```typescript
// Listar barbearias
const barbershops = await barbershopService.list(1, 10);

// Buscar por ID
const shop = await barbershopService.getById('shop-id');

// Listar por proprietário
const ownerShops = await barbershopService.getByOwner('owner-id');

// Criar barbearia
const newShop = await barbershopService.create({
  name: 'Barbearia do João',
  description: 'Melhor barbearia da rua',
  address: 'Rua Principal, 123',
  phone: '11999999999'
});

// Atualizar barbearia
const updated = await barbershopService.update('shop-id', {
  name: 'Novo Nome',
  phone: '11988888888'
});

// Deletar barbearia
await barbershopService.delete('shop-id');
```

### Serviços (Cortes, etc)

```typescript
// Listar serviços
const services = await serviceService.list(1, 10);

// Buscar por ID
const service = await serviceService.getById('service-id');

// Listar por barbearia
const shopServices = await serviceService.getByBarbershop('shop-id');

// Criar serviço
const newService = await serviceService.create('shop-id', {
  name: 'Cabelo + Barba',
  description: 'Corte completo de cabelo e barba',
  price: 75.00,
  duration_minutes: 45
});

// Atualizar serviço
const updated = await serviceService.update('service-id', {
  price: 85.00,
  duration_minutes: 50
});

// Deletar serviço
await serviceService.delete('service-id');
```

### Agendamentos

```typescript
// Listar agendamentos
const appointments = await appointmentService.list(1, 10);

// Buscar por ID
const appointment = await appointmentService.getById('appointment-id');

// Listar por barbeiro
const barberAppointments = await appointmentService.getByBarber('barber-id');

// Listar por cliente
const clientAppointments = await appointmentService.getByClient('client-id');

// Listar por barbearia
const shopAppointments = await appointmentService.getByBarbershop('shop-id');

// Agendar horário
const newAppointment = await appointmentService.create(
  'barber-id',
  'shop-id',
  {
    service_id: 'service-id',
    start_time: '2024-03-01T14:00:00Z',
    end_time: '2024-03-01T14:45:00Z'
  }
);

// Confirmar agendamento
const confirmed = await appointmentService.update('appointment-id', {
  status: 'CONFIRMED'
});

// Cancelar agendamento
const cancelled = await appointmentService.cancel('appointment-id');

// Deletar agendamento
await appointmentService.delete('appointment-id');
```

## Tratamento de Erros

Todos os serviços usam axios, você pode capturar erros assim:

```typescript
try {
  const user = await userService.getById('invalid-id');
} catch (error) {
  if (error.response?.status === 404) {
    console.error('Usuário não encontrado');
  } else if (error.response?.status === 401) {
    console.error('Não autenticado');
  } else {
    console.error('Erro:', error.message);
  }
}
```

## Interceptadores

O cliente axios está configurado com interceptadores automáticos:

1. **Request Interceptor**: Adiciona o token JWT no header `Authorization` automaticamente
2. **Response Interceptor**: Limpa o armazenamento local se o token expirou (401)

## Tipos

Todos os tipos estão definidos em `src/types/index.ts`:

- `User`
- `AuthResponse`
- `LoginRequest`
- `RegisterRequest`
- `Barbershop`
- `Service`
- `Appointment`
- `PaginatedResponse<T>`
- `ApiResponse<T>`

Importe-os conforme necessário:

```typescript
import { User, Barbershop, Appointment } from '@/types';
```
