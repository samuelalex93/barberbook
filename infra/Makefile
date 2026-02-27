.PHONY: help up down logs ps exec-postgres backup restore clean

help:
	@echo "StudioBook Infrastructure Commands"
	@echo ""
	@echo "Usage: make [command]"
	@echo ""
	@echo "Commands:"
	@echo "  up              Start all services"
	@echo "  down            Stop all services"
	@echo "  logs            View service logs"
	@echo "  ps              Show running containers"
	@echo "  exec-postgres   Open PostgreSQL shell"
	@echo "  backup          Backup the database"
	@echo "  restore         Restore database from backup"
	@echo "  clean           Remove all services and volumes"
	@echo "  help            Show this help message"

up:
	docker-compose up -d
	@echo ✓ Services started
	@echo "  PostgreSQL: localhost:5432"
	@echo "  PgAdmin: http://localhost:5050"

down:
	docker-compose down
	@echo ✓ Services stopped

logs:
	docker-compose logs -f

ps:
	docker-compose ps

exec-postgres:
	docker-compose exec postgres psql -U postgres -d studiobook

backup:
	@echo "Creating backup..."
	docker-compose exec postgres pg_dump -U postgres studiobook > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo ✓ Backup created

restore:
	@read -p "Enter backup file path: " backup_file; \
	docker-compose exec -T postgres psql -U postgres studiobook < $$backup_file
	@echo ✓ Database restored

clean:
	docker-compose down -v
	@echo ✓ All services and volumes removed
