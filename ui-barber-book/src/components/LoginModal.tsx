import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { Input, PasswordInput, Button, IconButton } from './ui';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
}

export function LoginModal({ onClose, onLogin, onSwitchToSignup }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular delay de requisição
    setTimeout(() => {
      onLogin(email, password);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>
            Entrar
          </h1>
          <IconButton
            onClick={onClose}
            icon={<X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />}
            variant="ghost"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <Input
            type="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            icon={<Mail className="w-5 h-5" style={{ color: COLORS.textTertiary }} />}
            required
          />

          {/* Password Input */}
          <PasswordInput
            label="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded" />
              <span className="text-sm" style={{ color: COLORS.textSecondary }}>
                Manter conectado
              </span>
            </label>
            <button
              type="button"
              className="text-sm font-semibold hover:transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Esqueci minha senha
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Não tem conta?{' '}
            <button
              onClick={onSwitchToSignup}
              className="font-bold hover:transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}