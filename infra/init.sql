-- StudioBook Database Initialization Script
-- This script creates the initial schema for the StudioBook application

-- Create ENUM types
CREATE TYPE user_role AS ENUM ('CLIENTE', 'FUNCIONARIO', 'PROPRIETARIO', 'GERENTE', 'MEGAZORD');
CREATE TYPE appointment_status AS ENUM ('PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO');
CREATE TYPE license_type AS ENUM ('MENSAL', 'TRIMESTRAL', 'ANUAL');
CREATE TYPE license_payment_status AS ENUM ('PENDENTE', 'PAGO', 'EXPIRADO', 'CANCELADO');
CREATE TYPE business_type AS ENUM ('BARBEARIA', 'PEDICURE', 'SALAO_CABELO', 'ESTUDIO_SOBRANCELHA', 'ESTUDIO_DEPILACAO', 'OUTRO');
CREATE TYPE day_of_week AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL,
  business_id UUID,
  cpf_cnpj VARCHAR(20),
  avatar_image VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business Types table (Barbershop, Pedicure, Hairstyler, etc)
CREATE TABLE business_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table (Barbershops, Pedicure Studios, Hair Salons, etc)
CREATE TABLE businesses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  cnpj VARCHAR(20),
  municipal_registration VARCHAR(50),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_type_id UUID NOT NULL REFERENCES business_types(id) ON DELETE RESTRICT,
  cover_image VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add foreign key constraint to users table
ALTER TABLE users 
ADD CONSTRAINT fk_users_business_id 
FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE SET NULL;

-- Business Addresses table
CREATE TABLE business_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  street VARCHAR(255) NOT NULL,
  number VARCHAR(20) NOT NULL,
  complement VARCHAR(255),
  city VARCHAR(255) NOT NULL,
  state VARCHAR(2) NOT NULL,
  postal_code VARCHAR(20),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_id)
);

-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business Portfolio Images table
CREATE TABLE business_portfolio_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  image_url VARCHAR(500) NOT NULL,
  title VARCHAR(255),
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Business Hours table
CREATE TABLE business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  day_of_week day_of_week NOT NULL,
  opening_time TIME NOT NULL,
  closing_time TIME NOT NULL,
  is_open BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(business_id, day_of_week)
);

-- Suggested Services table (Templates for barbers to use)
CREATE TABLE suggested_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  default_price DECIMAL(10, 2),
  default_duration_minutes INTEGER,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Owner Licenses table
CREATE TABLE owner_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  license_type license_type NOT NULL,
  payment_amount DECIMAL(10, 2) NOT NULL,
  payment_date TIMESTAMP,
  expiration_date TIMESTAMP NOT NULL,
  status license_payment_status DEFAULT 'PENDENTE',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
  owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status appointment_status DEFAULT 'PENDENTE',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews/Ratings table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID NOT NULL REFERENCES businesses(id) ON DELETE CASCADE,
  client_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_verified BOOLEAN DEFAULT false,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_business_id ON users(business_id);
CREATE INDEX idx_users_is_active ON users(is_active);
CREATE INDEX idx_business_types_is_active ON business_types(is_active);
CREATE INDEX idx_businesses_owner_id ON businesses(owner_id);
CREATE INDEX idx_businesses_business_type_id ON businesses(business_type_id);
CREATE INDEX idx_businesses_is_active ON businesses(is_active);
CREATE INDEX idx_business_addresses_business_id ON business_addresses(business_id);
CREATE INDEX idx_business_addresses_is_active ON business_addresses(is_active);
CREATE INDEX idx_categories_is_active ON categories(is_active);
CREATE INDEX idx_services_business_id ON services(business_id);
CREATE INDEX idx_services_category_id ON services(category_id);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_business_portfolio_images_business_id ON business_portfolio_images(business_id);
CREATE INDEX idx_business_portfolio_images_is_active ON business_portfolio_images(is_active);
CREATE INDEX idx_business_hours_business_id ON business_hours(business_id);
CREATE INDEX idx_business_hours_day_of_week ON business_hours(day_of_week);
CREATE INDEX idx_suggested_services_category_id ON suggested_services(category_id);
CREATE INDEX idx_suggested_services_is_active ON suggested_services(is_active);
CREATE INDEX idx_owner_licenses_owner_id ON owner_licenses(owner_id);
CREATE INDEX idx_owner_licenses_status ON owner_licenses(status);
CREATE INDEX idx_owner_licenses_expiration_date ON owner_licenses(expiration_date);
CREATE INDEX idx_appointments_owner_id ON appointments(owner_id);
CREATE INDEX idx_appointments_client_id ON appointments(client_id);
CREATE INDEX idx_appointments_business_id ON appointments(business_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_start_time ON appointments(start_time);
CREATE INDEX idx_reviews_business_id ON reviews(business_id);
CREATE INDEX idx_reviews_client_id ON reviews(client_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Create triggers for updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_timestamp BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_business_types_timestamp BEFORE UPDATE ON business_types
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_businesses_timestamp BEFORE UPDATE ON businesses
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_categories_timestamp BEFORE UPDATE ON categories
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_services_timestamp BEFORE UPDATE ON services
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_business_portfolio_images_timestamp BEFORE UPDATE ON business_portfolio_images
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_business_hours_timestamp BEFORE UPDATE ON business_hours
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_suggested_services_timestamp BEFORE UPDATE ON suggested_services
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_owner_licenses_timestamp BEFORE UPDATE ON owner_licenses
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_appointments_timestamp BEFORE UPDATE ON appointments
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_reviews_timestamp BEFORE UPDATE ON reviews
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_business_addresses_timestamp BEFORE UPDATE ON business_addresses
FOR EACH ROW EXECUTE FUNCTION update_timestamp();

-- Seed data (optional - comment out if not needed)
-- Insert business types
INSERT INTO business_types (name, description, is_active) VALUES
('BARBEARIA', 'Barbearia - Serviços de corte e cuidado capilar masculino', true),
('PEDICURE', 'Estúdio de Pedicure - Serviços de cuidado dos pés e unhas', true),
('SALAO_CABELO', 'Salão de Beleza - Serviços de corte, coloração e penteado', true),
('ESTUDIO_SOBRANCELHA', 'Estúdio de Sobrancelha - Serviços de design e modelagem de sobrancelhas', true),
('ESTUDIO_DEPILACAO', 'Estúdio de Depilação - Serviços de remoção de pelos', true),
('OUTRO', 'Outros serviços de beleza e cuidado pessoal', true);

-- Insert categories
INSERT INTO categories (name, description, is_active) VALUES
('Corte', 'Serviços de corte de cabelo', true),
('Barba', 'Serviços de barba e acabamento', true),
('Coloração', 'Serviços de coloração e tingimento', true),
('Tratamento', 'Tratamentos capilares', true),
('Manicure', 'Serviços de manicure', true),
('Pedicure', 'Serviços de pedicure', true);

-- Insert users - Barbearia owners and staff
INSERT INTO users (id, name, email, password, role, cpf_cnpj, is_active) VALUES
('11111111-1111-1111-1111-111111111111', 'Carlos Silva', 'carlos@barberbox.com', 'hashed_password_123', 'PROPRIETARIO', NULL, true),
('11111111-1111-1111-1111-111111111112', 'João Santos', 'joao@barberbox.com', 'hashed_password_456', 'FUNCIONARIO', NULL, true);

-- Insert users - Manicure owner
INSERT INTO users (id, name, email, password, role, cpf_cnpj, is_active) VALUES
('22222222-2222-2222-2222-222222222222', 'Marina Costa', 'marina@nailstudio.com', 'hashed_password_789', 'PROPRIETARIO', NULL, true);

-- Insert users - Clients
INSERT INTO users (id, name, email, password, role, is_active) VALUES
('99999999-9999-9999-9999-999999999991', 'Pedro Oliveira', 'pedro@email.com', 'hashed_password_client1', 'CLIENTE', true),
('99999999-9999-9999-9999-999999999992', 'Lucas Mendes', 'lucas@email.com', 'hashed_password_client2', 'CLIENTE', true),
('99999999-9999-9999-9999-999999999993', 'Ana Paula', 'ana@email.com', 'hashed_password_client3', 'CLIENTE', true),
('99999999-9999-9999-9999-999999999994', 'Fernanda Sousa', 'fernanda@email.com', 'hashed_password_client4', 'CLIENTE', true);

-- Insert Barbearia
INSERT INTO businesses (id, name, description, address, phone, cnpj, municipal_registration, owner_id, business_type_id, cover_image, is_active) VALUES
('33333333-3333-3333-3333-333333333333', 'Barber Box', 'A melhor barbearia da cidade com profissionais experientes', 'Rua Principal 123, Centro', '1133334444', NULL, NULL, '11111111-1111-1111-1111-111111111111', (SELECT id FROM business_types WHERE name = 'BARBEARIA'), 'https://example.com/barber-box-cover.jpg', true);

-- Insert Manicure
INSERT INTO businesses (id, name, description, address, phone, cnpj, municipal_registration, owner_id, business_type_id, cover_image, is_active) VALUES
('44444444-4444-4444-4444-444444444444', 'Nail Studio Premium', 'Estúdio especializado em manicure e pedicure de qualidade', 'Avenida Paulista 500, Bela Vista', '1144445555', NULL, NULL, '22222222-2222-2222-2222-222222222222', (SELECT id FROM business_types WHERE name = 'PEDICURE'), 'https://example.com/nail-studio-cover.jpg', true);

-- Update users with business_id
UPDATE users SET business_id = '33333333-3333-3333-3333-333333333333' WHERE id = '11111111-1111-1111-1111-111111111112';

-- Insert business addresses
INSERT INTO business_addresses (business_id, street, number, complement, city, state, postal_code, latitude, longitude, is_active) VALUES
('33333333-3333-3333-3333-333333333333', 'Rua Principal', '123', 'Centro', 'São Paulo', 'SP', '01310-100', -23.5505, -46.6333, true),
('44444444-4444-4444-4444-444444444444', 'Avenida Paulista', '500', 'Bela Vista', 'São Paulo', 'SP', '01311-100', -23.5615, -46.6560, true);

-- Insert services for Barbearia
INSERT INTO services (name, description, price, duration_minutes, business_id, category_id, is_active) VALUES
('Corte Clássico', 'Corte de cabelo clássico com máquina e tesoura', 50.00, 30, '33333333-3333-3333-3333-333333333333', (SELECT id FROM categories WHERE name = 'Corte'), true),
('Barba Completa', 'Barba completa com navalha e acabamento', 35.00, 25, '33333333-3333-3333-3333-333333333333', (SELECT id FROM categories WHERE name = 'Barba'), true),
('Corte + Barba', 'Corte de cabelo + serviço de barba', 75.00, 50, '33333333-3333-3333-3333-333333333333', (SELECT id FROM categories WHERE name = 'Corte'), true),
('Tratamento Capilar', 'Tratamento hidratante com produtos premium', 80.00, 40, '33333333-3333-3333-3333-333333333333', (SELECT id FROM categories WHERE name = 'Tratamento'), true);

-- Insert services for Nail Studio
INSERT INTO services (name, description, price, duration_minutes, business_id, category_id, is_active) VALUES
('Manicure Simples', 'Manicure básica com esmalte', 40.00, 30, '44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'Manicure'), true),
('Manicure com Gel', 'Manicure com esmalte em gel durável', 70.00, 45, '44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'Manicure'), true),
('Pedicure Simples', 'Pedicure básica com esmalte', 50.00, 35, '44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'Pedicure'), true),
('Pacote Manicure + Pedicure', 'Manicure e pedicure juntos com desconto', 100.00, 70, '44444444-4444-4444-4444-444444444444', (SELECT id FROM categories WHERE name = 'Manicure'), true);

-- Insert business hours for Barbearia
INSERT INTO business_hours (business_id, day_of_week, opening_time, closing_time, is_open) VALUES
('33333333-3333-3333-3333-333333333333', 'SEGUNDA', '09:00', '19:00', true),
('33333333-3333-3333-3333-333333333333', 'TERCA', '09:00', '19:00', true),
('33333333-3333-3333-3333-333333333333', 'QUARTA', '09:00', '19:00', true),
('33333333-3333-3333-3333-333333333333', 'QUINTA', '09:00', '19:00', true),
('33333333-3333-3333-3333-333333333333', 'SEXTA', '09:00', '20:00', true),
('33333333-3333-3333-3333-333333333333', 'SABADO', '10:00', '18:00', true),
('33333333-3333-3333-3333-333333333333', 'DOMINGO', '10:00', '14:00', false);

-- Insert business hours for Nail Studio
INSERT INTO business_hours (business_id, day_of_week, opening_time, closing_time, is_open) VALUES
('44444444-4444-4444-4444-444444444444', 'SEGUNDA', '10:00', '19:00', true),
('44444444-4444-4444-4444-444444444444', 'TERCA', '10:00', '19:00', true),
('44444444-4444-4444-4444-444444444444', 'QUARTA', '10:00', '19:00', true),
('44444444-4444-4444-4444-444444444444', 'QUINTA', '10:00', '19:00', true),
('44444444-4444-4444-4444-444444444444', 'SEXTA', '10:00', '20:00', true),
('44444444-4444-4444-4444-444444444444', 'SABADO', '10:00', '18:00', true),
('44444444-4444-4444-4444-444444444444', 'DOMINGO', '11:00', '17:00', true);

-- Insert reviews for Barbearia
INSERT INTO reviews (business_id, client_id, rating, comment, is_verified) VALUES
('33333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999991', 5, 'Excelente atendimento! Pr muito profissional.', true),
('33333333-3333-3333-3333-333333333333', '99999999-9999-9999-9999-999999999992', 4, 'Ótimo corte, local limpo e aconchegante.', true);

-- Insert reviews for Nail Studio
INSERT INTO reviews (business_id, client_id, rating, comment, is_verified) VALUES
('44444444-4444-4444-4444-444444444444', '99999999-9999-9999-9999-999999999993', 5, 'Ambiente muito lindo e profissionais competentes!', true),
('44444444-4444-4444-4444-444444444444', '99999999-9999-9999-9999-999999999994', 5, 'Adorei o resultado! Voltarei com certeza.', true);
