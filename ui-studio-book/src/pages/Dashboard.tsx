import { MapPin, Bell, Heart, MoreHorizontal } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { Button, IconButton } from '../components/ui';
import { PageHeader } from '../components/PageHeader';

export function Dashboard() {
  const specialOffers = [
    {
      id: 1,
      title: 'Especial da Manhã!',
      description: 'Ganhe 20% de Desconto',
      subtitle: 'em todos os Cortes entre 9am-5pm',
      image: 'https://images.unsplash.com/photo-1599819834519-c90903a59fd0?w=400&h=300&fit=crop',
      cta: 'Agendar Agora',
    },
    {
      id: 2,
      title: 'Promoção da Tarde',
      description: 'Ganhe 15% de Desconto',
      subtitle: 'em todos os Serviços após 5pm',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
      cta: 'Agendar Agora',
    },
  ];

  const offers = [
    {
      id: 1,
      image: 'https://6998ba1d3b28d3b181f7abb3.imgix.net/barber-696221.png?w=300&h=300&fit=crop',
      price: '$2.50',
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      price: '$3.00',
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      price: '$2.75',
    },
  ];

  return (
    <div style={{ backgroundColor: COLORS.light }}>
      {/* Header */}
      <PageHeader>
        {/* Location and Notification */}
        <div className="flex items-center justify-end mb-6">
          <IconButton
            icon={<Bell className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: COLORS.text }} />}
            variant="ghost"
            size="md"
            className="relative"
          >
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{ backgroundColor: COLORS.danger }}></span>
          </IconButton>
        </div>

        {/* Search Bar */}
        <div className="flex gap-3">
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: COLORS.light, borderColor: COLORS.mid, borderWidth: '1px' }}>
            <MapPin className="w-4 sm:w-5 h-4 sm:h-5 text-[#6B7280] flex-shrink-0" />
            <input
              type="text"
              placeholder="Onde?"
              className="flex-1 outline-none text-sm"
              style={{ backgroundColor: 'transparent', color: COLORS.text }}
            />
          </div>
          <IconButton
            icon={<MoreHorizontal className="w-5 h-5" style={{ color: COLORS.textSecondary }} />}
            variant="ghost"
            size="md"
          />
        </div>
      </PageHeader>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
          {/* Featured Promo Banner */}
          <div className="relative rounded-3xl overflow-hidden h-48 lg:h-64 shadow-lg" style={{ background: `linear-gradient(to right, ${COLORS.text}, #1F2937)` }}>
            <img
              src={specialOffers[0].image}
              alt="promo"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to right, ${COLORS.text}/90, transparent)` }}></div>
            <div className="relative h-full flex flex-col justify-between p-6 lg:p-8">
              <div>
                <p className="font-semibold text-sm mb-1" style={{ color: COLORS.accent }}>Especial da Manhã!</p>
                <h2 className="text-white text-3xl lg:text-4xl font-bold mb-2">Ganhe 20% de Desconto</h2>
                <p className="text-gray-300 text-sm lg:text-base">em todos os Cortes entre 9am-5pm</p>
              </div>
              <Button 
                variant="primary"
                size="md"
                className="w-fit"
              >
                Agendar Agora
              </Button>
            </div>
          </div>

          {/* Special Offers Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-bold" style={{ color: COLORS.text }}>Ofertas Especiais</h3>
              <Button 
                variant="tertiary"
                size="sm"
              >
                Ver Tudo
              </Button>
            </div>

            {/* Offers Grid - Responsive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="relative rounded-2xl overflow-hidden h-48 lg:h-56 group cursor-pointer"
                >
                  <img
                    src={offer.image}
                    alt="offer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to top, ${COLORS.text}/80, transparent)` }}></div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 text-white font-bold px-3 py-1 rounded-full text-sm" style={{ backgroundColor: COLORS.accent }}>
                    {offer.price}
                  </div>

                  {/* Favorite Button */}
                  <IconButton
                    icon={<Heart className="w-5 h-5 lg:w-6 lg:h-6 text-white hover:fill-white transition-all" />}
                    variant="ghost"
                    size="md"
                    className="absolute top-4 left-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Padding para mobile nav */}
      <div className="h-20 lg:h-24"></div>
    </div>
  );
}
