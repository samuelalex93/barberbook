import { useState } from 'react';
import { X, User, Mail, Phone } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { Input, Button, IconButton } from './ui';

interface EditProfileModalProps {
  onClose: () => void;
  onSave: (name: string, email: string, phone: string) => void;
  initialData: {
    name: string;
    email: string;
    phone: string;
  };
}

export function EditProfileModal({ onClose, onSave, initialData }: EditProfileModalProps) {
  const [name, setName] = useState(initialData.name);
  const [email, setEmail] = useState(initialData.email);
  const [phone, setPhone] = useState(initialData.phone);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simular delay de requisição
    setTimeout(() => {
      onSave(name, email, phone);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end lg:items-center justify-center z-50">
      {/* Modal Container */}
      <div className="bg-white w-full lg:w-96 rounded-t-3xl lg:rounded-3xl p-6 lg:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: COLORS.text }}>Editar Perfil</h1>
          <IconButton
            onClick={onClose}
            icon={<X className="w-6 h-6" style={{ color: COLORS.textSecondary }} />}
            variant="ghost"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-6">
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-3xl"
              style={{
                background: 'linear-gradient(to bottom right, var(--color-brand-accent), #E67E0D)'
              }}
            >
              {name.charAt(0)}
            </div>
          </div>

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

          {/* Phone Input */}
          <Input
            type="tel"
            label="Telefone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+55 11 98765-4321"
            icon={<Phone className="w-5 h-5" style={{ color: COLORS.textTertiary }} />}
            required
          />

          {/* Save and Cancel Buttons */}
          <div className="flex gap-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              className="mt-6"
            >
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>

            <Button
              type="button"
              onClick={onClose}
              variant="tertiary"
              size="lg"
              fullWidth
              className="mt-6"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}