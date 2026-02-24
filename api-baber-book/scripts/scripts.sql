CREATE TABLE users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK (
    role IN ('OWNER', 'MANAGER', 'BARBER', 'CLIENT')
  ),
  barbershop_id UUID REFERENCES barbershops(id),
  refresh_token TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE appointments (
  id UUID PRIMARY KEY,
  barber_id UUID REFERENCES users(id),
  client_id UUID REFERENCES users(id),
  barbershop_id UUID REFERENCES barbershops(id),
  service_id UUID REFERENCES services(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  price NUMERIC(10,2),
  status TEXT DEFAULT 'SCHEDULED',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE barbershops (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address TEXT NOT NULL,
  phone VARCHAR(20),
  owner_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE barber_services (
  barber_id UUID REFERENCES users(id),
  service_id UUID REFERENCES services(id),
  PRIMARY KEY (barber_id, service_id)
);

CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  barbershop_id UUID REFERENCES barbershops(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);