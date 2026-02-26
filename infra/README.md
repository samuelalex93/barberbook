# Infraestrutura BarberBook

Configuração de infraestrutura usando Docker Compose para desenvolvimento local.

## 📋 Pré-requisitos

- Docker: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- Docker Compose: [https://docs.docker.com/compose/install/](https://docs.docker.com/compose/install/)

## 🚀 Como Iniciar

### Iniciar os serviços

```bash
docker-compose up -d
```

Ou para ver os logs em tempo real:

```bash
docker-compose up
```

### Parar os serviços

```bash
docker-compose down
```

### Remover volumes (limpar dados)

```bash
docker-compose down -v
```

## 🗄️ Serviços

### PostgreSQL

- **Host**: `localhost`
- **Porta**: `5432`
- **Banco de dados**: `barberbook`
- **Usuário**: `postgres`
- **Senha**: `postgres123`

#### Connection String

```
postgresql://postgres:postgres123@localhost:5432/barberbook
```

#### Variáveis de Ambiente para API

```env
DATABASE_URL=postgresql://postgres:postgres123@localhost:5432/barberbook
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres123
DB_NAME=barberbook
```

### PgAdmin

Interface web para gerenciar o PostgreSQL.

- **URL**: [http://localhost:5050](http://localhost:5050)
- **Email**: `admin@barberbook.com`
- **Senha**: `admin123`

#### Conectar Servidor no PgAdmin

1. Acesse [http://localhost:5050](http://localhost:5050)
2. Faça login com as credenciais acima
3. Clique em "Add New Server"
4. Configure:
   - **Name**: `BarberBook Database`
   - **Host**: `postgres` (nome do serviço)
   - **Port**: `5432`
   - **Username**: `postgres`
   - **Password**: `postgres123`

## 📊 Verificar Status

```bash
# Ver todos os containers
docker-compose ps

# Ver logs de um serviço específico
docker-compose logs postgres
docker-compose logs pgadmin

# Ver logs em tempo real
docker-compose logs -f postgres
```

## 🔧 Comandos Úteis

### Acessar o PostgreSQL diretamente

```bash
docker-compose exec postgres psql -U postgres -d barberbook
```

### Fazer backup do banco

```bash
docker-compose exec postgres pg_dump -U postgres barberbook > backup.sql
```

### Restaurar um backup

```bash
docker-compose exec -T postgres psql -U postgres barberbook < backup.sql
```

## 📁 Volumes

Os dados são persistidos em volumes Docker:

- `postgres_data`: Dados do PostgreSQL
- `pgadmin_data`: Dados do PgAdmin

Para listar volumes:

```bash
docker volume ls
```

Para inspecionar um volume:

```bash
docker volume inspect barberbook_infra_postgres_data
```

## 🌐 Network

Os serviços se comunicam através da network `barberbook_network`.

Para conectar outro container à mesma network:

```bash
docker run --network barberbook_network ...
```

## ⚙️ Customização

Para alterar as credenciais padrão, edite o arquivo `docker-compose.yml`:

### Mudar senha do PostgreSQL

```yaml
environment:
  POSTGRES_PASSWORD: sua_nova_senha
```

### Mudar porta do PostgreSQL

```yaml
ports:
  - "5433:5432"  # Mapeia porta 5433 local para 5432 do container
```

### Mudar nome do banco de dados

```yaml
environment:
  POSTGRES_DB: novo_nome
```

## 🐛 Troubleshooting

### Porta já em uso

Se a porta 5432 ou 5050 já estão em uso:

```bash
# Altere as portas no docker-compose.yml
# Ou libere as portas:

# Linux/Mac
sudo lsof -i :5432
kill -9 <PID>

# Windows
netstat -ano | findstr :5432
taskkill /PID <PID> /F
```

### Container não inicia

```bash
# Verifique os logs
docker-compose logs postgres

# Recrie os containers
docker-compose down
docker-compose up --build
```

### Não consegue conectar ao banco

1. Verifique se o container está rodando: `docker-compose ps`
2. Verifique se está usando a porta correta (5432)
3. Verifique as credenciais
4. Tente acessar via: `docker-compose exec postgres psql -U postgres`

## 📚 Recursos

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PgAdmin Documentation](https://www.pgadmin.org/docs/)
