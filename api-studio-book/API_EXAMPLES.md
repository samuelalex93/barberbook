# Studio Book API - Exemplos de Uso

## 🔐 Autenticação

### Registrar novo usuário
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "senha123",
    "role": "CLIENTE"
  }'
```

**Response:**
```json
{
  "id": "uuid-123",
  "name": "João Silva",
  "email": "joao@example.com",
  "role": "CLIENTE",
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
curl -X GET http://localhost:3000/users/business/{business_id} \
  -H "Authorization: Bearer {token}"
```

### Criar novo usuário
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer {manager_token}" \
  -d '{
    "name": "Maria Barbeira",
    "email": "maria@example.com",
    "password": "senha123",
    "role": "FUNCIONARIO",
    "business_id": "business-uuid",
    "avatar_image": "@/caminho/para/avatar.jpg"
  }'
```

### Atualizar usuário
```bash
curl -X PATCH http://localhost:3000/users/{user_id} \
  -H "Content-Type: multipart/form-data" \
  -H "Authorization: Bearer {token}" \
  -d '{
    "name": "Novo Nome",
    "email": "novo@example.com",
    "avatar_image": "@/caminho/para/novo-avatar.png"
  }'
```

### Deletar usuário
```bash
curl -X DELETE http://localhost:3000/users/{user_id} \
  -H "Authorization: Bearer {token}"
```

---

## 🏢 Negócios (Businesses)

### Listar todos os negócios
```bash
curl -X GET "http://localhost:3000/businesses?page=1&limit=10"
```

### Buscar negócio por ID
```bash
curl -X GET http://localhost:3000/businesses/{business_id}
```

### Buscar detalhes completos (negócio + endereço + horários + portfólio + reviews)
```bash
curl -X GET http://localhost:3000/businesses/{business_id}/details
```

### Buscar negócios de um proprietário
```bash
curl -X GET http://localhost:3000/businesses/owner/{owner_id}
```

### Listar tipos de negócio
```bash
curl -X GET http://localhost:3000/businesses/types
```

### Criar novo negócio (com imagem de capa)
```bash
curl -X POST http://localhost:3000/businesses \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Barbearia do João" \
  -F "description=Melhor barbearia da rua" \
  -F "address=Rua Principal, 123" \
  -F "phone=11999999999" \
  -F "business_type_id={business_type_uuid}" \
  -F "cover_image=@/caminho/para/capa.jpg"
```

### Atualizar negócio (incluindo troca de capa)
```bash
curl -X PATCH http://localhost:3000/businesses/{business_id} \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: multipart/form-data" \
  -F "name=Novo Nome da Barbearia" \
  -F "phone=11988888888" \
  -F "cover_image=@/caminho/para/nova-capa.png"
```

> Ao enviar uma nova `cover_image`, a imagem antiga em `/public/uploads/businesses` é removida automaticamente.

### Gerenciar endereço do negócio
```bash
# Obter endereço
curl -X GET http://localhost:3000/businesses/{business_id}/address

# Criar/atualizar endereço
curl -X PUT http://localhost:3000/businesses/{business_id}/address \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "street": "Rua Principal",
    "number": "123",
    "city": "São Paulo",
    "state": "SP",
    "postal_code": "01310-100"
  }'
```

### Gerenciar horários de funcionamento
```bash
# Listar horários
curl -X GET http://localhost:3000/businesses/{business_id}/hours

# Criar/atualizar horário para um dia
curl -X PUT http://localhost:3000/businesses/{business_id}/hours/SEGUNDA \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: application/json" \
  -d '{
    "opening_time": "09:00",
    "closing_time": "19:00",
    "is_open": true
  }'
```

### Gerenciar portfólio de imagens
```bash
# Listar imagens
curl -X GET http://localhost:3000/businesses/{business_id}/portfolio

# Adicionar imagem ao portfólio
curl -X POST http://localhost:3000/businesses/{business_id}/portfolio \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: multipart/form-data" \
  -F "title=Corte degradê" \
  -F "description=Antes e depois do corte" \
  -F "display_order=1" \
  -F "image=@/caminho/para/portfolio.jpg"

# Atualizar imagem do portfólio (troca a imagem física e remove a antiga)
curl -X PATCH http://localhost:3000/businesses/{business_id}/portfolio/{image_id} \
  -H "Authorization: Bearer {owner_token}" \
  -H "Content-Type: multipart/form-data" \
  -F "title=Novo título" \
  -F "image=@/caminho/para/nova-imagem.png"
```

### Listar avaliações (reviews) de um negócio
```bash
curl -X GET http://localhost:3000/businesses/{business_id}/reviews
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
curl -X GET http://localhost:3000/services/business/{business_id}
```

### Criar novo serviço
```bash
curl -X POST http://localhost:3000/services/business/{business_id} \
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

### Listar agendamentos de um proprietario
```bash
curl -X GET http://localhost:3000/appointments/owner/{owner_id}
```

### Listar agendamentos de um cliente
```bash
curl -X GET http://localhost:3000/appointments/client/{client_id}
```

### Listar agendamentos de uma barbearia
```bash
curl -X GET http://localhost:3000/appointments/business/{business_id}
```

### Agendar um horário
```bash
curl -X POST http://localhost:3000/appointments/owner/{owner_id}/business/{business_id} \
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
  -H "Authorization: Bearer {owner_token}" \
  -d '{
    "status": "CONFIRMADO"
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
  "role": "CLIENTE|FUNCIONARIO|PROPRIETARIO|GERENTE|MEGAZORD",
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
- Pr pertence à barbearia
- Cliente existe no sistema
- Serviço existe
- Autorização por proprietário

