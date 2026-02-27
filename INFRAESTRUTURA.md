# 🐳 Infraestrutura Docker - Configuração Criada

## 📁 Estrutura de Pastas

```
studio-book/
├── infra/
│   ├── docker-compose.yml     # Configuração dos serviços
│   ├── README.md              # Documentação detalhada
│   ├── Makefile               # Comandos úteis
│   ├── init.sql               # Script de inicialização do banco
│   └── .env.example           # Variáveis de ambiente
├── api-studio-book/
├── ui-studio-book/
```

## 🚀 Quick Start

### 1. Iniciar os serviços

```bash
cd infra
docker-compose up -d
```

### 2. Acessar o banco de dados

**Via psql:**
```bash
docker-compose exec postgres psql -U postgres -d studiobook
```

**Via PgAdmin (Interface Web):**
- URL: [http://localhost:5050](http://localhost:5050)
- Email: `admin@studiobook.com`
- Senha: `admin123`

## 🗄️ Serviços Criados

### PostgreSQL 15
- **Container**: `studiobook_postgres`
- **Host**: `localhost`
- **Porta**: `5432`
- **User**: `postgres`
- **Password**: `postgres123`
- **Database**: `studiobook`
- **Health Check**: Habilitado

### PgAdmin 4
- **Container**: `studiobook_pgadmin`
- **URL**: [http://localhost:5050](http://localhost:5050)
- **Email**: `admin@studiobook.com`
- **Password**: `admin123`

## 📝 Arquivos Criados

### `docker-compose.yml`
Configuração completa com:
- PostgreSQL 15 Alpine (imagem leve)
- PgAdmin para gerenciamento
- Volumes para persistência de dados
- Health checks
- Network customizada

### `README.md`
Documentação completa com:
- Como iniciar/parar serviços
- Credenciais e connection strings
- Como usar PgAdmin
- Comandos úteis
- Troubleshooting
- Variáveis de ambiente

### `init.sql`
Script SQL para inicializar o banco com:
- Tabelas: users, business, services, appointments
- Tipos ENUM: user_role, appointment_status
- Índices para performance
- Triggers para updated_at automático
- Constraints de integridade referencial

### `.env.example`
Variáveis de ambiente recomendadas para a API:
```
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/studiobook
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=studiobook
NODE_ENV=development
API_PORT=3000
JWT_SECRET=your_jwt_secret_key_here_change_in_production
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### `Makefile`
Comandos úteis:
```bash
make up              # Iniciar serviços
make down            # Parar serviços
make logs            # Ver logs
make ps              # Status dos containers
make exec-postgres   # Abrir shell do PostgreSQL
make backup          # Fazer backup do banco
make restore         # Restaurar backup
make clean           # Remover tudo
make help            # Ver ajuda
```

## 💻 Configurar API Node.js

Copie o arquivo `.env.example` para `.env` na pasta `api-baber-book`:

```bash
cp infra/.env.example api-baber-book/.env
```

## 🔗 Conexão da UI

A UI React em `ui-studio-book` já foi configurada com a variável:

```env
VITE_API_BASE_URL=http://localhost:3000
```

## ✅ Verificar Tudo

```bash
# 1. Iniciar infraestrutura
cd infra
docker-compose up -d

# 2. Verificar status
docker-compose ps

# 3. Verificar logs
docker-compose logs postgres

# 4. Conectar ao banco
docker-compose exec postgres psql -U postgres -d studiobook

# 5. Acessar PgAdmin
# Abra http://localhost:5050
```

## 📊 Estrutura do Banco de Dados

### Tabelas criadas automaticamente (via init.sql):
- `users` - Usuários do sistema
- `business` - Business
- `services` - Serviços oferecidos
- `appointments` - Agendamentos

### Tipos ENUM:
- `user_role`: CLIENT, BARBER, OWNER, MANAGER
- `appointment_status`: PENDING, CONFIRMED, CANCELLED, COMPLETED

## 🔐 Segurança para Produção

⚠️ **Importante**: As credenciais no docker-compose.yml são para desenvolvimento local.

Para produção:
1. Use variáveis de ambiente
2. Altere todas as senhas padrão
3. Configure volumes em locais seguros
4. Use networks isoladas
5. Configure backup automático
6. Use SSL/TLS para conexões

## 📚 Próximos Passos

1. Iniciar os serviços com `docker-compose up -d`
2. Configurar a API Node.js com as variáveis de ambiente
3. Executar migrations da API se necessário
4. Seed database com dados iniciais
5. Testar conexão da UI com a API

## 🆘 Ajuda

Para mais detalhes, consulte `infra/README.md`

```bash
cat infra/README.md
```
