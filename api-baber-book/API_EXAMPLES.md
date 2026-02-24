# Barber Book API - Exemplos de Uso

## 🔐 Autenticação

### Registrar novo usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "CLIENT"
  }'
```

**Response:**
```json
{
  "id": "uuid-123",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "CLIENT",
  "accessToken": "eyJhbGc..."
}
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "senha123"
  }'
```

---

## 👥 Usuários

### Listar todos os usuários (paginado)
```bash
curl -X GET "http://localhost:3000/users?page=1&limit=10" \
  -H "Authorization: Bearer {token}"
```

### Buscar usuário por ID
```bash
curl -X GET http://localhost:3000/users/{user_id} \
  -H "Authorization: Bearer {token}"
```

### Listar usuários por role
```bash
curl -X GET http://localhost:3000/users/role/BARBER \
  -H "Authorization: Bearer {token}"
```

### Listar usuários de uma barbearia
```bash
curl -X GET http://localhost:3000/users/barbershop/{barbershop_id} \
  -H "Authorization: Bearer {token}"
```

### Criar novo usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {manager_token}" \
  -d '{
    "name": "Maria Barbeira",
    "email": "maria@example.com",
    "password": "senha123",
    "role": "BARBER",
    "barbershop_id": "barbershop-uuid"
  }'
```

### Atualizar usuário
```bash
curl -X PATCH http://localhost:3000/users/{user_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Novo Nome",
    "email": "novo@example.com"
  }'
```

### Deletar usuário
```bash
curl -X DELETE http://localhost:3000/users/{user_id} \
  -H "Authorization: Bearer {token}"
```

---

## 🏢 Barbearias

### Listar todas as barbearias
```bash
curl -X GET "http://localhost:3000/barbershops?page=1&limit=10"
```

### Buscar barbearia por ID
```bash
curl -X GET http://localhost:3000/barbershops/{barbershop_id}
```

### Buscar barbearias de um dono
```bash
curl -X GET http://localhost:3000/barbershops/owner/{owner_id}
```

### Criar nova barbearia
```bash
curl -X POST http://localhost:3000/barbershops \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {owner_token}" \
  -d '{
    "name": "Barbearia do João",
    "description": "Melhor barbearia da rua",
    "address": "Rua Principal, 123",
    "phone": "11999999999"
  }'
```

### Atualizar barbearia
```bash
curl -X PATCH http://localhost:3000/barbershops/{barbershop_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {owner_token}" \
  -d '{
    "name": "Novo Nome da Barbearia",
    "phone": "11988888888"
  }'
```

### Deletar barbearia
```bash
curl -X DELETE http://localhost:3000/barbershops/{barbershop_id} \
  -H "Authorization: Bearer {owner_token}"
```

---

## 💇 Serviços

### Listar todos os serviços
```bash
curl -X GET "http://localhost:3000/services?page=1&limit=10"
```

### Buscar serviço por ID
```bash
curl -X GET http://localhost:3000/services/{service_id}
```

### Listar serviços de uma barbearia
```bash
curl -X GET http://localhost:3000/services/barbershop/{barbershop_id}
```

### Criar novo serviço
```bash
curl -X POST http://localhost:3000/services/barbershop/{barbershop_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {owner_token}" \
  -d '{
    "name": "Cabelo + Barba",
    "description": "Corte completo de cabelo e barba",
    "price": 75.00,
    "duration_minutes": 45
  }'
```

### Atualizar serviço
```bash
curl -X PATCH http://localhost:3000/services/{service_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {owner_token}" \
  -d '{
    "price": 85.00,
    "duration_minutes": 50
  }'
```

### Deletar serviço
```bash
curl -X DELETE http://localhost:3000/services/{service_id} \
  -H "Authorization: Bearer {owner_token}"
```

---

## 📅 Agendamentos

### Listar todos os agendamentos
```bash
curl -X GET "http://localhost:3000/appointments?page=1&limit=10"
```

### Buscar agendamento por ID
```bash
curl -X GET http://localhost:3000/appointments/{appointment_id}
```

### Listar agendamentos de um barbeiro
```bash
curl -X GET http://localhost:3000/appointments/barber/{barber_id}
```

### Listar agendamentos de um cliente
```bash
curl -X GET http://localhost:3000/appointments/client/{client_id}
```

### Listar agendamentos de uma barbearia
```bash
curl -X GET http://localhost:3000/appointments/barbershop/{barbershop_id}
```

### Agendar um horário
```bash
curl -X POST http://localhost:3000/appointments/barber/{barber_id}/barbershop/{barbershop_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {client_token}" \
  -d '{
    "service_id": "service-uuid",
    "start_time": "2024-03-01T14:00:00Z",
    "end_time": "2024-03-01T14:45:00Z"
  }'
```

### Confirmar agendamento
```bash
curl -X PATCH http://localhost:3000/appointments/{appointment_id} \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer {barber_token}" \
  -d '{
    "status": "CONFIRMED"
  }'
```

### Cancelar agendamento
```bash
curl -X PATCH http://localhost:3000/appointments/{appointment_id}/cancel \
  -H "Authorization: Bearer {token}"
```

### Deletar agendamento
```bash
curl -X DELETE http://localhost:3000/appointments/{appointment_id} \
  -H "Authorization: Bearer {token}"
```

---

## 🛡️ Códigos de Status

| Status | Significado |
|--------|-------------|
| **200** | OK - Requisição bem-sucedida |
| **201** | Created - Recurso criado |
| **204** | No Content - Deletado com sucesso |
| **400** | Bad Request - Dados inválidos |
| **401** | Unauthorized - Token inválido/ausente |
| **403** | Forbidden - Acesso negado |
| **404** | Not Found - Recurso não encontrado |
| **409** | Conflict - Recurso já existe |
| **500** | Server Error - Erro interno |

---

## 🔑 Estrutura do JWT

```json
{
  "sub": "user-uuid",
  "role": "BARBER|OWNER|MANAGER|CLIENT",
  "email": "user@example.com",
  "iat": 1234567890,
  "exp": 1234571490
}
```

---

## ✅ Validações Automáticas

- Emails únicos
- Datas de agendamento válidas
- Sem conflitos de horário
- Barbeiro pertence à barbearia
- Cliente existe no sistema
- Serviço existe
- Autorização por proprietário

