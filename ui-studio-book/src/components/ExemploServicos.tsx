// Exemplo de como usar os serviços em um componente React

import { useState, useEffect } from 'react';
import type { Barbershop, Appointment } from '../types';
import { barbershopService, appointmentService, authService } from '../services';

export function ExemploServicos() {
  const [barbershops, setBarbershops] = useState<Barbershop[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carregar barbearias ao montar o componente
  useEffect(() => {
    async function loadBarbershops() {
      try {
        setLoading(true);
        const response = await barbershopService.list(1, 10);
        setBarbershops(response.data);
        setError(null);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    loadBarbershops();
  }, []);

  // Carregar agendamentos do usuário autenticado
  const loadMyAppointments = async () => {
    try {
      setLoading(true);
      // Você precisará obter o userId do localStorage ou de um contexto
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        const appointments = await appointmentService.getByClient(user.id);
        setAppointments(appointments);
      }
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fazer login
  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      authService.saveToken(response.accessToken);
      localStorage.setItem('user', JSON.stringify(response));
      setError(null);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Exemplo de Uso dos Serviços</h1>

      {error && <div className="error">{error}</div>}

      <section>
        <h2>Barbearias ({barbershops.length})</h2>
        {loading && <p>Carregando...</p>}
        <ul>
          {barbershops.map((shop) => (
            <li key={shop.id}>
              <strong>{shop.name}</strong> - {shop.address}
              <p>{shop.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Meus Agendamentos</h2>
        <button onClick={loadMyAppointments}>Carregar Agendamentos</button>
        {appointments.length > 0 && (
          <ul>
            {appointments.map((apt) => (
              <li key={apt.id}>
                Status: {apt.status} - {apt.start_time}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Login</h2>
        <button
          onClick={() => handleLogin('joao@example.com', 'senha123')}
        >
          Fazer Login
        </button>
      </section>
    </div>
  );
}
