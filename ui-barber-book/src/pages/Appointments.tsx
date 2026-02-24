import { Calendar, Clock, Star, ChevronRight } from 'lucide-react';
import { COLORS } from '../constants/colors';
import { Button, IconButton } from '../components/ui';
import { PageHeader } from '../components/PageHeader';

export function Appointments() {
  const appointments = [
    {
      id: 1,
      barber: 'Marcus Johnson',
      service: 'Corte Premium',
      date: '04 de Fevereiro',
      time: '14:30',
      duration: '45 min',
      status: 'confirmed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1599819834519-c90903a59fd0?w=100&h=100&fit=crop',
    },
    {
      id: 2,
      barber: 'Bruno Silva',
      service: 'Barba + Corte',
      date: '05 de Fevereiro',
      time: '10:00',
      duration: '60 min',
      status: 'pending',
      rating: 4,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    },
    {
      id: 3,
      barber: 'Carlos Santos',
      service: 'Shampoo + Corte',
      date: '06 de Fevereiro',
      time: '16:00',
      duration: '50 min',
      status: 'confirmed',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    },
  ];

  const getStatusColor = (status: string) => {
    return status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  const getStatusText = (status: string) => {
    return status === 'confirmed' ? 'Confirmado' : 'Pendente';
  };

  return (
    <div style={{ backgroundColor: COLORS.light }}>
      {/* Header */}
      <PageHeader>
        <div className="text-center">
          <h1 className="text-2xl lg:text-4xl font-bold mb-1" style={{ color: COLORS.text }}>Meus Agendamentos</h1>
          <p className="text-sm lg:text-base" style={{ color: COLORS.textSecondary }}>
            Você tem{' '}
            <span style={{ color: COLORS.accent, fontWeight: 'bold', fontSize: '1.1em' }}>
              {appointments.length} agendamentos
            </span>
            {' '}próximos
          </p>
        </div>
      </PageHeader>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-4 lg:space-y-6">
        {/* Filter/Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 lg:gap-4">
          <Button 
            variant="primary"
            size="md"
            className="whitespace-nowrap text-sm lg:text-base"
          >
            Todos ({appointments.length})
          </Button>
          <Button 
            variant="secondary"
            size="md"
            className="whitespace-nowrap text-sm lg:text-base"
          >
            Confirmados
          </Button>
          <Button 
            variant="secondary"
            size="md"
            className="whitespace-nowrap text-sm lg:text-base"
          >
            Pendentes
          </Button>
        </div>

        {/* Appointments List - Grid responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
              style={{ borderColor: COLORS.mid, borderWidth: '1px' }}
            >
              {/* Header with image and status */}
              <div className="flex items-start justify-between mb-3 lg:mb-4">
                <div className="flex items-center gap-3 flex-1">
                  <img
                    src={appointment.image}
                    alt={appointment.barber}
                    className="w-12 h-12 lg:w-16 lg:h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm lg:text-base truncate" style={{ color: COLORS.text }}>
                      {appointment.barber}
                    </h3>
                    <p className="text-xs lg:text-sm" style={{ color: COLORS.textSecondary }}>{appointment.service}</p>
                  </div>
                </div>
                <span
                  className={`text-xs lg:text-sm font-semibold px-3 py-1 rounded-full whitespace-nowrap ml-2 ${getStatusColor(
                    appointment.status
                  )}`}
                >
                  {getStatusText(appointment.status)}
                </span>
              </div>

              {/* Divider */}
              <div className="border-t my-3 lg:my-4" style={{ borderColor: COLORS.mid }}></div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-3 lg:gap-4 mb-3 lg:mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" style={{ color: COLORS.accent }} />
                  <span className="text-xs lg:text-sm" style={{ color: COLORS.textSecondary }}>{appointment.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" style={{ color: COLORS.accent }} />
                  <span className="text-xs lg:text-sm" style={{ color: COLORS.textSecondary }}>{appointment.time}</span>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 mb-3 lg:mb-4 text-xs lg:text-sm" style={{ color: COLORS.textSecondary }}>
                <span>⏱️</span>
                <span>Duração: {appointment.duration}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 lg:pt-4" style={{ borderColor: COLORS.mid, borderTopWidth: '1px' }}>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3 h-3 lg:w-4 lg:h-4"
                      style={{
                        fill: i < appointment.rating ? COLORS.accent : 'transparent',
                        color: i < appointment.rating ? COLORS.accent : '#D1D5DB'
                      }}
                    />
                  ))}
                  <span className="text-xs lg:text-sm ml-1" style={{ color: COLORS.textSecondary }}>({appointment.rating})</span>
                </div>
                <IconButton
                  icon={<ChevronRight className="w-4 h-4 lg:w-5 lg:h-5" />}
                  variant="secondary"
                  size="md"
                />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-6 lg:mt-8">
          <Button
            variant="primary"
            size="lg"
            className="w-full lg:w-auto"
          >
            + Agendar Nova Consulta
          </Button>
        </div>

        {/* Upcoming Special Offer */}
        <div className="mt-8 lg:mt-12 rounded-2xl p-4 lg:p-8 text-white max-w-2xl mx-auto w-full" style={{ background: `linear-gradient(to right, ${COLORS.accent}, #ff9247)` }}>
          <h3 className="font-bold text-base lg:text-xl mb-1 lg:mb-2">Promoção Especial!</h3>
          <p className="text-sm lg:text-base mb-3 lg:mb-4">Ganhe 15% de desconto no seu próximo corte</p>
          <Button
            variant="secondary"
            size="md"
            className="w-full text-sm lg:text-base"
            style={{ backgroundColor: 'white', color: COLORS.accent }}
          >
            Ver Detalhes
          </Button>
        </div>
      </div>

      {/* Padding para mobile nav */}
      <div className="h-20 lg:h-24"></div>
    </div>
  );
}
