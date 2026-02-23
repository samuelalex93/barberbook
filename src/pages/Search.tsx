import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  MapPin,
  Filter,
  Heart,
  Scissors,
  Droplet,
  Wind,
  Brush,
} from "lucide-react";
import { COLORS } from "../constants/colors";
import { Button, IconButton } from "../components/ui";
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
  isFavorite?: boolean;
}

const CATEGORIES = [
  "Tudo",
  "Barbearias",
  "Salões de Cabelo",
  "Salões de Unhas",
  "Skincare",
  "Estética",
];

const SERVICES = [
  { name: "Corte", icon: Scissors },
  { name: "Corte de Cabelo", icon: Scissors },
  { name: "Barbear", icon: Brush },
  { name: "Cobertura", icon: Wind },
  { name: "Aparador", icon: Scissors },
  { name: "Tratamento", icon: Droplet },
];

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

export function Search() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tudo");
  const [selectedService, setSelectedService] = useState("Corte");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("Recomendado");

  const toggleFavorite = (businessId: number) => {
    setFavorites((prev) =>
      prev.includes(businessId)
        ? prev.filter((id) => id !== businessId)
        : [...prev, businessId],
    );
  };

  const filteredBusinesses = MOCK_BUSINESSES.filter((business) => {
    const matchesCategory =
      selectedCategory === "Tudo" || business.category === selectedCategory;
    const matchesSearch =
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-screen pb-24 lg:pb-0"
      style={{ backgroundColor: COLORS.light }}
    >
      {/* Header Section */}
      <PageHeader className="space-y-5">
        {/* Location */}
        <div className="flex items-center gap-2 pb-2">
          <MapPin className="w-5 h-5 lg:w-6 lg:h-6" style={{ color: COLORS.accent }} />
          <span className="text-sm lg:text-base font-semibold" style={{ color: COLORS.text }}>São Paulo, SP</span>
        </div>
        
        {/* Search Bar */}
          <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl" style={{ backgroundColor: COLORS.light, borderColor: COLORS.mid, borderWidth: '1px' }}>

          <SearchIcon className="w-4 sm:w-5 h-4 sm:h-5 text-[#6B7280] flex-shrink-0" />
          <input
            type="text"
            placeholder="Procurar serviços ou negócios"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 outline-none text-sm"
            style={{ backgroundColor: 'transparent', color: COLORS.text }}
          />
        </div>
        
        {/* Categories */}
        <div className="overflow-x-auto flex gap-3 sm:gap-4 no-scrollbar -mx-4 lg:-mx-6 px-4 lg:px-6 pb-2 pt-2">
          {CATEGORIES.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "primary" : "secondary"}
              size="sm"
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </PageHeader>

      <div className="p-4 lg:p-6">
        <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
          {/* Popular Services Section */}
          <div className="mb-3">
          <h2 className="text-base sm:text-xl font-bold text-[#111827] mb-5 sm:mb-6">
            Serviços Populares
          </h2>
          <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-3 no-scrollbar -mx-4 lg:-mx-6 px-4 lg:px-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Button
                  key={service.name}
                  onClick={() => setSelectedService(service.name)}
                  variant={selectedService === service.name ? "primary" : "secondary"}
                  size="sm"
                  className="whitespace-nowrap"
                >
                  <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  {service.name}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Filter and Sort Controls */}
        <div className="mb-8 flex justify-center">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 w-full lg:w-1/2">
            <IconButton
              icon={<Filter className="w-3.5 sm:w-4 h-3.5 sm:h-4" />}
              variant="secondary"
              size="md"
              className="flex-1 sm:flex-none"
            >
              <span className="hidden sm:inline">Filtros</span>
              <span className="sm:hidden">Filtrar</span>
            </IconButton>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-[#F5F5F5] text-[#111827] rounded-lg hover:bg-[#E5E5E5] transition-colors font-medium text-xs sm:text-sm outline-none cursor-pointer appearance-none flex-1 sm:flex-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23111827' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 8px center",
                paddingRight: "28px",
              }}
            >
              <option>Recomendado</option>
              <option>Melhor Avaliado</option>
              <option>Mais Próximo</option>
              <option>Mais Avaliações</option>
            </select>
          </div>
        </div>

        {/* Results Header */}
        <div className="mb-8 sm:mb-10">
          <h3 className="text-base sm:text-lg font-bold text-[#111827]">
            Resultados ({filteredBusinesses.length})
          </h3>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-2">
            O que afeta os resultados da busca?
          </p>
        </div>

        {/* Business Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {filteredBusinesses.map((business) => (
            <div
              key={business.id}
              onClick={() => navigate(`/booking/${business.id}`)}
              className="bg-white border border-[#E5E5E5] rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col cursor-pointer"
            >
              {/* Main Image with Rating Badge */}
              <div className="relative w-full h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={business.mainImage}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-[#1F2937] text-white px-2 sm:px-3 py-1 rounded-lg flex items-center gap-1 text-xs sm:text-sm">
                  <span className="font-bold text-sm sm:text-base">
                    {business.rating}
                  </span>
                  <span className="text-xs hidden sm:inline">
                    {business.reviews} avaliações
                  </span>
                  <span className="text-xs sm:hidden">{business.reviews}</span>
                </div>
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-4 gap-1 p-2 sm:p-3 bg-[#F5F5F5] border-b border-[#E5E5E5]">
                {business.galleryImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`gallery-${idx}`}
                    className="w-full aspect-square object-cover rounded cursor-pointer hover:opacity-75 transition-opacity"
                  />
                ))}
              </div>

              {/* Business Info */}
              <div className="p-3 sm:p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#111827] truncate">
                      {business.name}
                    </h3>
                  </div>
                  <IconButton
                    onClick={() => toggleFavorite(business.id)}
                    icon={
                      <Heart
                        className={`w-4 sm:w-5 h-4 sm:h-5 ${
                          favorites.includes(business.id)
                            ? "fill-[#F97316] text-[#F97316]"
                            : "text-[#D4D4D4]"
                        }`}
                      />
                    }
                    variant="ghost"
                    size="md"
                  />
                </div>

                {/* Location */}
                <div className="flex gap-2 text-xs sm:text-sm text-[#6B7280] mb-2">
                  <MapPin className="w-3.5 sm:w-4 h-3.5 sm:h-4 flex-shrink-0 mt-0.5" />
                  <p className="line-clamp-2">{business.location}</p>
                </div>

                {/* Schedule */}
                <div className="text-xs text-[#9CA3AF] mb-3 p-2 bg-[#F5F5F5] rounded line-clamp-2 flex-grow">
                  {business.schedule}
                </div>

                {/* Recommended Badge (for Booksy Recommended) */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#E5E5E5]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-[#111827] truncate">
                      👍 Recomendado Booksy
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <SearchIcon className="w-12 sm:w-14 h-12 sm:h-14 text-[#D4D4D4] mx-auto mb-4 sm:mb-5" />
            <p className="text-[#6B7280] font-medium text-base sm:text-lg">
              Nenhum resultado encontrado
            </p>
            <p className="text-[#9CA3AF] text-sm sm:text-base mt-3">
              Tente ajustar sua busca
            </p>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
