import { useState } from 'react';
import { X, Mail, User } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { Input, PasswordInput, Button, IconButton } from './ui';

interface SignupModalProps {
  onClose: () => void;
  onSignup: (email: string, password: string, name: string) => void;
  onSwitchToLogin: () => void;
}

export function SignupModal({ onClose, onSignup, onSwitchToLogin }: SignupModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    if (!agreedToTerms) {
      alert('Você precisa aceitar os termos e condições!');
      return;
    }

    setLoading(true);

    // Simular delay de requisição
    setTimeout(() => {
      onSignup(email, password, name);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>Cadastre-se</h1>
          <IconButton
            onClick={onClose}
            icon={<X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />}
            variant="ghost"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}
          <Input
            type="text"
            label="Nome Completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome completo"
            icon={<User className="w-5 h-5" style={{ color: COLORS.textTertiary }} />}
            required
          />

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

          {/* Confirm Password Input */}
          <PasswordInput
            label="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {/* Terms and Conditions */}
          <div className="flex items-start gap-3 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 mt-1 rounded cursor-pointer"
            />
            <label htmlFor="terms" className="text-xs lg:text-sm leading-relaxed" style={{ color: COLORS.textSecondary }}>
              Concordo com os{' '}
              <span className="font-semibold" style={{ color: COLORS.accent }}>
                Termos de Serviço
              </span>{' '}
              e{' '}
              <span className="font-semibold" style={{ color: COLORS.accent }}>
                Política de Privacidade
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
            className="mt-6"
            disabled={!agreedToTerms}
          >
            {loading ? 'Cadastrando...' : 'Criar Conta'}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Já tem conta?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-bold transition-colors"
              style={{ color: COLORS.accent }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accentDark;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = COLORS.accent;
              }}
            >
              Entre aqui
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
