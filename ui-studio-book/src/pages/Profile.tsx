import { useState, useEffect } from 'react';
import { ChevronLeft, Bell, Heart, HelpCircle, LogOut, Edit2 } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { LoginModal } from '../components/LoginModal';
import { SignupModal } from '../components/SignupModal';
import { EditProfileModal } from '../components/EditProfileModal';
import { Button, IconButton } from '../components/ui';
import { PageHeader } from '../components/PageHeader';

interface ProfileUser {
  name: string;
  email: string;
  phone: string;
  isLoggedIn: boolean;
}

export function Profile() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [user, setUser] = useState<ProfileUser>({
    name: 'SAMUEL AGUIAR',
    email: 'samuel@example.com',
    phone: '+55 11 98765-4321',
    isLoggedIn: true,
  });

  useEffect(() => {
    const isModalOpen = showLoginModal || showSignupModal || showEditModal;
    if (isModalOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-modal-open');
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.removeAttribute('data-modal-open');
    };
  }, [showLoginModal, showSignupModal, showEditModal]);

  const handleLogin = (email: string, _password: string) => {
    setUser({
      ...user,
      email,
      isLoggedIn: true,
    });
    setShowLoginModal(false);
  };

  const handleSignup = (email: string, _password: string, name: string) => {
    setUser({
      name,
      email,
      phone: '+55 11 99999-9999',
      isLoggedIn: true,
    });
    setShowSignupModal(false);
  };

  const handleLogout = () => {
    setUser({
      ...user,
      isLoggedIn: false,
    });
  };

  const handleEditProfile = (name: string, email: string, phone: string) => {
    setUser({
      ...user,
      name,
      email,
      phone,
    });
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: COLORS.light }}>
      {/* Header */}
      <PageHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-[#111827] flex-1 text-center">
            {user.name}
          </h1>
        </div>
      </PageHeader>

      {/* Profile Content */}
      <div className="p-4 lg:p-6 pb-32">
        <div className="max-w-7xl mx-auto space-y-4">
          {user.isLoggedIn ? (
            <>
              {/* User Info Card */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#F97316] to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-[#111827]">{user.name}</h2>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <IconButton
                    onClick={() => setShowEditModal(true)}
                    icon={<Edit2 className="w-5 h-5 text-[#F97316]" />}
                    variant="ghost"
                  />
                </div>

                <div className="space-y-3 border-t border-[#E5E5E5] pt-4">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">TELEFONE</p>
                    <p className="text-sm text-[#111827] font-semibold">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold mb-1">EMAIL</p>
                    <p className="text-sm text-[#111827] font-semibold">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6 space-y-3">
                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ative as notificações</span>
                  </div>
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                </div>
              </div>

              {/* Favorites Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Favoritos</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ajuda</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              <Button
                onClick={handleLogout}
                variant="danger-outline"
                size="lg"
                fullWidth
                className="gap-2"
              >
                <LogOut className="w-5 h-5" />
                Sair da Conta
              </Button>
            </>
          ) : (
            <>
              {/* Login/Signup CTA */}
              <div className="bg-white border-2 border-dashed border-[#E5E5E5] rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-xl font-bold text-[#111827] mb-2">Entre em sua Conta</h2>
                <p className="text-gray-600 mb-6">
                  Acesse sua conta ou crie uma nova para aproveitar todos os benefícios
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => setShowLoginModal(true)}
                    variant="primary"
                    size="lg"
                    fullWidth
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={() => setShowSignupModal(true)}
                    variant="tertiary"
                    size="lg"
                    fullWidth
                  >
                    Criar Conta
                  </Button>
                </div>
              </div>

              {/* Favorites Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <Heart className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Favoritos</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>

              {/* Help Section */}
              <div className="bg-white border border-[#E5E5E5] rounded-2xl p-4 lg:p-6">
                <button className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#F97316]" />
                    <span className="font-semibold text-[#111827]">Ajuda</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />
      )}

      {showSignupModal && (
        <SignupModal
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      )}

      {showEditModal && (
        <EditProfileModal
          onClose={() => setShowEditModal(false)}
          onSave={handleEditProfile}
          initialData={{
            name: user.name,
            email: user.email,
            phone: user.phone,
          }}
        />
      )}
    </div>
  );
}
