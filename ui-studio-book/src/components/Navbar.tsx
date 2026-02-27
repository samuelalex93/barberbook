import { useState, useEffect } from 'react';
import { Home, Search, Calendar, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Check if a modal is open
  useEffect(() => {
    const handleStorageChange = () => {
      setIsModalOpen(document.body.getAttribute('data-modal-open') === 'true');
    };
    
    // Check initial state
    handleStorageChange();
    
    // Monitor for changes
    const observer = new MutationObserver(handleStorageChange);
    observer.observe(document.body, { attributes: true, attributeFilter: ['data-modal-open'] });
    
    return () => observer.disconnect();
  }, []);

  if (isModalOpen) return null;

  const navItems = [
    { id: 1, name: 'Início', icon: Home, path: '/' },
    { id: 2, name: 'Buscar', icon: Search, path: '/search' },
    { id: 3, name: 'Agendamentos', icon: Calendar, path: '/appointments' },
    { id: 4, name: 'Perfil', icon: User, path: '/profile' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Bottom Navigation - Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-4 py-3 lg:hidden z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className="flex flex-col items-center gap-1 p-2 transition-colors"
              >
                <Icon
                  className={`w-6 h-6 ${
                    active
                      ? 'fill-[#F97316] text-[#F97316]'
                      : 'text-gray-400'
                  }`}
                />
                <span
                  className={`text-xs font-semibold ${
                    active ? 'text-[#F97316]' : 'text-gray-400'
                  }`}
                >
                  {item.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Navigation - Desktop */}
      <div className="hidden lg:flex fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E5E5] px-6 py-4 justify-center gap-12 z-50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 font-semibold transition-colors ${
                active
                  ? 'text-[#F97316]'
                  : 'text-gray-600 hover:text-[#F97316]'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'fill-[#F97316]' : ''}`} />
              {item.name}
            </button>
          );
        })}
      </div>

      {/* Padding para mobile nav */}
      <div className="h-20 lg:h-24"></div>
    </>
  );
}
