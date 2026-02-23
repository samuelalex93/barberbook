import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { COLORS } from "../constants/colors";
import { IconButton } from "../components/ui";
import { PageHeader } from "../components/PageHeader";

interface Business {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  location: string;
  schedule: string;
  mainImage: string;
  galleryImages: string[];
  category: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  avatar: string;
}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: number;
  discount?: number;
}

const MOCK_BUSINESSES: Business[] = [
  {
    id: 1,
    name: "QUOTIDIANA",
    rating: 5.0,
    reviews: 836,
    location: "MAJOR SERTORIO 561 VL BUARQUE, 01222-001, São Paulo",
    schedule: "Ter 14-20h | Qua-Sex 10-20h | Sáb: 10-18h | Dom-Seg: fechado",
    mainImage:
      "https://d2zdpiztbgorvt.cloudfront.net/region1/br/215610/biz_photo/d2f3bc3b03f24673a7c5e7790f7745-la-barbearia-biz-photo-f5dabb18bccf423180567c7b495c91-booksy.jpeg",
    galleryImages: [
      "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    ],
    category: "Barbearias",
  },
  {
    id: 2,
    name: "Studio Elegância",
    rating: 4.8,
    reviews: 542,
    location: "Rua Augusta 1000, Centro, São Paulo",
    schedule: "Ter-Sáb 9h-19h | Dom 10h-17h",
    mainImage:
      "https://images.unsplash.com/photo-1522337660859-02fbefca6192?w=400&h=300&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1560066169-b8a46d2331c2?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1521746727202-7d86ffd84330?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=150&h=150&fit=crop",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=150&h=150&fit=crop",
    ],
    category: "Salões de Cabelo",
  },
];

const MOCK_SERVICES: Service[] = [
  { id: 1, name: "Corte Simples", price: 89.0, duration: 30, discount: 20 },
  { id: 2, name: "Corte + Barbear", price: 120.0, duration: 45 },
  { id: 3, name: "Corte + Desenho", price: 110.0, duration: 40 },
  { id: 4, name: "Tratamento Capilar", price: 75.0, duration: 25 },
];

const MOCK_REVIEWS: Review[] = [
  {
    id: 1,
    author: "Debit Smith",
    rating: 5,
    text: "Excelente atendimento e qualidade no corte. Muito satisfeito!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
  },
  {
    id: 2,
    author: "João Silva",
    rating: 5,
    text: "Profissional muito atencioso, recomendo!",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop",
  },
  {
    id: 3,
    author: "Carlos Santos",
    rating: 4,
    text: "Bom atendimento, voltarei com certeza.",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop",
  },
];

const AVAILABLE_TIMES = [
  "08:00 AM",
  "08:30 AM",
  "09:00 AM",
  "10:45 AM",
  "11:00 AM",
  "14:00 PM",
  "15:00 PM",
  "16:00 PM",
];

export function Booking() {
  const { businessId } = useParams<{ businessId: string }>();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<number>(1);
  const [selectedDate, setSelectedDate] = useState<number>(20); // Data atual
  const [selectedTime, setSelectedTime] = useState<string>("09:00 AM");
  const [isFavorite, setIsFavorite] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(1); // Fevereiro (0-11)
  const [calendarYear, setCalendarYear] = useState(2026);

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const business = MOCK_BUSINESSES.find((b) => b.id === Number(businessId));
  const service = MOCK_SERVICES.find((s) => s.id === selectedService);

  // Função para verificar se a data é válida (não anterior a hoje)
  const isDateValid = (day: number, month: number, year: number): boolean => {
    const checkDate = new Date(year, month, day);
    const todayDate = new Date(currentYear, currentMonth, currentDay);
    return checkDate >= todayDate;
  };

  // Função para obter dias do mês
  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Função para obter o primeiro dia da semana do mês
  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Funções de navegação do calendário
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = getDaysInMonth(calendarMonth, calendarYear);
  const firstDayOfMonth = getFirstDayOfMonth(calendarMonth, calendarYear);
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  if (!business) {
    return (
      <div className="min-h-screen p-4 lg:p-6" style={{ backgroundColor: COLORS.light }}>
        <div className="text-center py-12">
          <p className="text-[#6B7280]">Serviço não encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen pb-24 lg:pb-0"
      style={{ backgroundColor: COLORS.light }}
    >
      {/* Header */}
      <PageHeader className="bg-white">
        <div className="flex items-start gap-3 mb-4">
          <IconButton
            onClick={() => navigate(-1)}
            icon={<ArrowLeft className="w-5 h-5" />}
            variant="secondary"
            size="md"
            className="mt-1"
          />
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F97316] to-[#E67E0D] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            {business.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1
              className="text-base lg:text-lg font-bold"
              style={{ color: COLORS.text }}
            >
              {business.name}
            </h1>
            <p className="text-xs lg:text-sm text-[#6B7280] line-clamp-2">
              {business.location}
            </p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <IconButton
              onClick={() => setIsFavorite(!isFavorite)}
              icon={
                <Heart
                  className="w-5 h-5"
                  style={{
                    color: isFavorite ? COLORS.accent : "#D4D4D4",
                    fill: isFavorite ? COLORS.accent : "none",
                  }}
                />
              }
              variant="secondary"
              size="md"
            />
            <IconButton
              icon={<Share2 className="w-5 h-5" />}
              variant="secondary"
              size="md"
            />
          </div>
        </div>
      </PageHeader>

      {/* Content */}
      <div className="p-4 lg:p-6">
        <div className="max-w-2xl mx-auto space-y-4 lg:space-y-6">
          {/* Main Image */}
          <div className="relative w-full h-64 sm:h-80 rounded-lg overflow-hidden">
            <img
              src={business.mainImage}
              alt={business.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Business Info */}
          <div className="bg-white rounded-lg p-4 lg:p-6 border border-[#E5E5E5]">
            {/* Description */}
            <p className="text-sm text-[#6B7280] mb-6 leading-relaxed">
              Barbearia especializada em cortes e tratamentos capilares de alta qualidade. Nossos
              profissionais possuem anos de experiência e estão sempre atualizados com as
              tendências do mercado.{" "}
              <button
                className="font-semibold transition-colors hover:opacity-80"
                style={{ color: COLORS.accent }}
              >
                Leia Mais...
              </button>
            </p>

            {/* Service Selection */}
            <div>
              <h3
                className="text-base font-bold mb-3"
                style={{ color: COLORS.text }}
              >
                Selecione o Serviço
              </h3>
              <div className="space-y-2 mb-6">
                {MOCK_SERVICES.map((svc) => (
                  <button
                    key={svc.id}
                    onClick={() => setSelectedService(svc.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedService === svc.id
                        ? "border-[#F97316] bg-[#FFF7ED]"
                        : "border-[#E5E5E5] hover:border-[#D4D4D4]"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p
                          className="font-semibold text-sm sm:text-base"
                          style={{
                            color:
                              selectedService === svc.id
                                ? COLORS.accent
                                : COLORS.text,
                          }}
                        >
                          {svc.name}
                        </p>
                        <p className="text-xs text-[#9CA3AF] mt-1">
                          {svc.duration} min
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className="font-bold text-sm sm:text-base"
                          style={{ color: COLORS.text }}
                        >
                          R$ {svc.price.toFixed(2)}
                        </p>
                        {svc.discount && (
                          <p
                            className="text-xs font-semibold"
                            style={{ color: COLORS.accent }}
                          >
                            save up to {svc.discount}%
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Selection */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <h3
                className="text-base font-bold mb-4"
                style={{ color: COLORS.text }}
              >
                Escolha a Data
              </h3>
              
              {/* Calendar */}
              <div
                className="rounded-lg p-4 mb-6 border border-[#E5E5E5]"
                style={{ backgroundColor: COLORS.light }}
              >
                {/* Month Navigation */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" style={{ color: COLORS.text }} />
                  </button>
                  <h4 className="font-semibold text-sm" style={{ color: COLORS.text }}>
                    {monthNames[calendarMonth]} {calendarYear}
                  </h4>
                  <button
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" style={{ color: COLORS.text }} />
                  </button>
                </div>

                {/* Day Names */}
                <div className="grid grid-cols-7 gap-2 mb-2">
                  {dayNames.map((day) => (
                    <div
                      key={day}
                      className="text-center text-xs font-semibold py-2"
                      style={{ color: COLORS.text }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {/* Empty cells for days before month starts */}
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} />
                  ))}

                  {/* Days of the month */}
                  {daysArray.map((day) => {
                    const isValid = isDateValid(day, calendarMonth, calendarYear);
                    const isSelected = selectedDate === day;

                    return (
                      <button
                        key={day}
                        onClick={() => {
                          if (isValid) setSelectedDate(day);
                        }}
                        disabled={!isValid}
                        className={`p-2 rounded-lg text-sm font-semibold transition-colors ${
                          !isValid
                            ? "opacity-50 cursor-not-allowed"
                            : isSelected
                              ? "text-white"
                              : "hover:bg-gray-200 cursor-pointer"
                        }`}
                        style={{
                          backgroundColor:
                            isSelected && isValid ? COLORS.accent : "transparent",
                          color:
                            isSelected && isValid
                              ? "white"
                              : !isValid
                                ? "#D4D4D4"
                                : COLORS.text,
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Time Selection */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <h3
                className="text-base font-bold mb-3"
                style={{ color: COLORS.text }}
              >
                Escolha a Hora
              </h3>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {AVAILABLE_TIMES.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`p-2 rounded-lg transition-colors text-center ${
                      selectedTime === time
                        ? "bg-[#F97316]"
                        : "bg-[#F5F5F5] hover:bg-[#E5E5E5]"
                    }`}
                  >
                    <p
                      className={`text-xs font-semibold ${
                        selectedTime === time
                          ? "text-white"
                          : "text-[#111827]"
                      }`}
                    >
                      {time}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="border-t border-[#E5E5E5] pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-base font-bold"
                  style={{ color: COLORS.text }}
                >
                  Avaliações de Clientes
                </h3>
                <button
                  className="text-xs font-semibold"
                  style={{ color: COLORS.accent }}
                >
                  Ver Tudo
                </button>
              </div>
              <div className="space-y-3">
                {MOCK_REVIEWS.map((review) => (
                  <div key={review.id} className="flex gap-3">
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <p
                          className="font-semibold"
                          style={{ color: COLORS.text }}
                        >
                          {review.author}
                        </p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-3 h-3"
                              style={{
                                color:
                                  i < review.rating ? COLORS.accent : "#E5E5E5",
                                fill:
                                  i < review.rating ? COLORS.accent : "none",
                              }}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-[#6B7280] leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Button */}
          <button
            className="w-full py-4 rounded-xl font-bold text-white text-lg transition-colors"
            style={{
              backgroundColor: COLORS.accent,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.accentDark;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.accent;
            }}
          >
            Confirmar Agendamento
          </button>

          {/* Booking Summary */}
          <div className="bg-white rounded-lg p-4 lg:p-6 border border-[#E5E5E5]">
            <p className="text-xs text-[#6B7280] mb-3 uppercase font-semibold">
              Resumo da Reserva
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p style={{ color: COLORS.text }}>Serviço:</p>
                <p className="font-semibold" style={{ color: COLORS.text }}>
                  {service?.name}
                </p>
              </div>
              <div className="flex justify-between">
                <p style={{ color: COLORS.text }}>Data:</p>
                <p className="font-semibold" style={{ color: COLORS.text }}>
                  {String(selectedDate).padStart(2, "0")} de {monthNames[calendarMonth]}
                </p>
              </div>
              <div className="flex justify-between border-b border-[#E5E5E5] pb-2 mb-2">
                <p style={{ color: COLORS.text }}>Hora:</p>
                <p className="font-semibold" style={{ color: COLORS.text }}>
                  {selectedTime}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold" style={{ color: COLORS.text }}>
                  Total:
                </p>
                <p
                  className="font-bold text-base"
                  style={{ color: COLORS.accent }}
                >
                  R$ {service?.price.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
