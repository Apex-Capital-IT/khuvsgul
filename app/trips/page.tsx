"use client";

import { useState, useEffect } from "react";
import NewsletterForm from "@/components/newsletter-form";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  MapPin,
  Calendar,
  Heart,
  Filter,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  TripsGridSkeleton,
  FeaturedTripsSkeleton,
  SearchFiltersSkeleton,
  MainContentSkeleton,
} from "@/components/TripCardSkeleton";

type FeaturedTrip = {
  id: string;
  href: string;
  title: string;
  location: string;
  duration: string;
  price: number;
  featured: boolean;
  category: string;
  image: string;
  images: string[];
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

// Fetch featured trips from API
const useFeaturedTrips = () => {
  const [trips, setTrips] = useState<FeaturedTrip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API_URL}/travel?pageNumber=1&pageSize=100`);
        const data = await res.json();
        if (data.code === 0) {
          // pull the array out of data.response.docs
          const raw = Array.isArray(data.response.docs)
            ? data.response.docs
            : [];
          const formatted: FeaturedTrip[] = raw.map((trip: any) => ({
            id: trip._id,
            href: `/trips/${trip._id}`,
            title: trip.title,
            location: trip.destination?.location || "Location not specified",
            duration: `${trip.duration?.days || 0} өдөр, ${
              trip.duration?.nights || 0
            } шөнө`,
            price: trip.price,
            featured: trip.isSpecial,
            category:
              typeof trip.categories?.[0] === "string"
                ? (trip.categories?.[0] as string)
                : trip.categories?.[0]?.name || "other",
            image: trip.images?.[0] || "/cover.avif",
            images: trip.images || ["/cover.avif"],
          }));
          setTrips(formatted);
        } else {
          throw new Error(data.message || "Unexpected API response");
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return { trips, loading, error };
};

// Filter options
const filterOptions = [
  { label: "Бүгд", value: "all" },
  { label: "Үнэ: Бага - Өндөр", value: "price-asc" },
  { label: "Үнэ: Өндөр - Бага", value: "price-desc" },
  { label: "Хугацаа: Богино - Урт", value: "duration-asc" },
  { label: "Хугацаа: Урт - Богино", value: "duration-desc" },
];

// Image Carousel Component
const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length <= 1) {
    return (
      <div className="relative h-56">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="relative h-56 group">
      <Image
        src={images[currentImageIndex]}
        alt={`${title} - Image ${currentImageIndex + 1}`}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      
      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevImage();
        }}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextImage();
        }}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
      
      {/* Image Counter */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// Featured Image Carousel Component
const FeaturedImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length <= 1) {
    return (
      <div className="relative h-64">
        <Image
          src={images[0]}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div className="relative h-64 group">
      <Image
        src={images[currentImageIndex]}
        alt={`${title} - Image ${currentImageIndex + 1}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      
      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          prevImage();
        }}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          nextImage();
        }}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      
      {/* Image Counter */}
      <div className="absolute bottom-3 right-3 bg-black/50 text-white text-sm px-3 py-1 rounded">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default function TripsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortOrder, setSortOrder] = useState<string>("all");
  const itemsPerPage = 4;

  const {
    trips: featuredTrips,
    loading: featuredLoading,
    error: featuredError,
  } = useFeaturedTrips();

  // Filter & sort
  const filteredAndSortedTrips = featuredTrips
    .filter((trip) => {
      const matchesCategory =
        activeCategory === "all" || trip.category === activeCategory;
      const matchesSearch =
        !searchQuery ||
        trip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a: FeaturedTrip, b: FeaturedTrip) => {
      switch (sortOrder) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "duration-asc":
          return a.duration.localeCompare(b.duration);
        case "duration-desc":
          return b.duration.localeCompare(a.duration);
        default:
          return 0;
      }
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTrips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrips = filteredAndSortedTrips.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortOrder]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("trips-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSortChange = (value: string) => setSortOrder(value);

  // Show loading state for initial page load
  if (featuredLoading) {
    return (
      <>
        <section className="relative h-[400px] md:h-[500px] flex items-center">
          <Image
            src="/cover.avif"
            alt="Аялалын танилцуулга"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 relative z-10 text-white pt-16">
            <h1 className="text-4xl md:text-6xl font-medium mb-4">
              Аяллын <span className="italic">багцууд</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl opacity-90">
              Хамгийн сайхан дурсамжийг үүсгэх аяллын багцуудаас сонгоно уу
            </p>
          </div>
        </section>

        <SearchFiltersSkeleton />
        <MainContentSkeleton />
        <FeaturedTripsSkeleton />
        
        <NewsletterForm />
      </>
    );
  }

  // Show error state
  if (featuredError) {
    return (
      <>
        <section className="relative h-[400px] md:h-[500px] flex items-center">
          <Image
            src="/cover.avif"
            alt="Аялалын танилцуулга"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="container mx-auto px-4 relative z-10 text-white pt-16">
            <h1 className="text-4xl md:text-6xl font-medium mb-4">
              Аяллын <span className="italic">багцууд</span>
            </h1>
            <p className="text-lg md:text-xl max-w-2xl opacity-90">
              Хамгийн сайхан дурсамжийг үүсгэх аяллын багцуудаас сонгоно уу
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="text-center py-12">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Алдаа гарлаа
              </h3>
              <p className="text-gray-600 mb-4">
                Аяллын мэдээлэл ачаалахад алдаа гарлаа: {featuredError}
              </p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Дахин оролдох
              </Button>
            </div>
          </div>
        </div>

        <NewsletterForm />
      </>
    );
  }

  return (
    <>
      <section className="relative h-[400px] md:h-[500px] flex items-center">
        <Image
          src="/cover.avif"
          alt="Аялалын танилцуулга"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-6xl font-medium mb-4">
            Аяллын <span className="italic">багцууд</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90">
            Хамгийн сайхан дурсамжийг үүсгэх аяллын багцуудаас сонгоно уу
          </p>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="bg-white py-8 border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Аялал хайх..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Шүүлтүүр
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setActiveCategory("all")}>
                  Бүгд
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setActiveCategory("adventure")}
                >
                  Адал явдалт
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveCategory("beach")}>
                  Далайн эрэг
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveCategory("cultural")}>
                  Соёлын
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveCategory("cruise")}>
                  Усан онгоц
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {filterOptions.find((opt) => opt.value === sortOrder)
                    ?.label || "Үнэ: Бага - Өндөр"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {filterOptions.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => handleSortChange(opt.value)}
                  >
                    {opt.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </section>

      {/* Main Trips */}
      <section className="py-12" id="trips-section">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
            >
              <TabsList className="mb-6">
                <TabsTrigger value="all">Бүгд</TabsTrigger>
                <TabsTrigger value="adventure">Адал явдалт</TabsTrigger>
                <TabsTrigger value="beach">Далайн эрэг</TabsTrigger>
                <TabsTrigger value="cultural">Соёлын</TabsTrigger>
                <TabsTrigger value="cruise">Усан онгоц</TabsTrigger>
              </TabsList>
            </Tabs>

            <h2 className="text-2xl md:text-3xl font-medium mb-6">
              {activeCategory === "all"
                ? `Бүх аяллууд (${filteredAndSortedTrips.length})`
                : activeCategory === "adventure"
                ? "Адал явдалт аяллууд"
                : activeCategory === "beach"
                ? "Далайн эргийн аяллууд"
                : activeCategory === "cultural"
                ? "Соёлын аяллууд"
                : "Усан онгоцны аяллууд"}
            </h2>
          </div>

          {filteredAndSortedTrips.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Хайлтад тохирох аялал олдсонгүй
                </h3>
                <p className="text-gray-600 mb-4">
                  Өөр хайлтын үг эсвэл шүүлтүүр ашиглаж үзнэ үү.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                    setSortOrder("all");
                  }}
                >
                  Бүх аяллыг харах
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedTrips.map((trip) => (
                  <Link
                    key={trip.id}
                    href={trip.href}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-lg"
                  >
                    <div className="relative">
                      <ImageCarousel images={trip.images} title={trip.title} />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                        <Heart className="h-4 w-4 text-white" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-xs text-gray-600 mb-1">
                        <MapPin className="h-3 w-3 mr-1" />
                        {trip.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-600 mb-3">
                        <Calendar className="h-3 w-3 mr-1" />
                        {trip.duration}
                      </div>
                      <div className="mt-3 font-bold text-lg">
                        {trip.price ? `${trip.price.toLocaleString()}₮` : "-"}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className="h-9 w-9 rounded-full"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Featured ("Онцлох") Trips */}
      {featuredTrips.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-medium mb-8">
              Онцлох аяллууд
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTrips.map((trip) => (
                <Link
                  key={trip.id}
                  href={trip.href}
                  className="group bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
                >
                  <div className="relative">
                    <FeaturedImageCarousel images={trip.images} title={trip.title} />
                    <button className="absolute top-4 right-4 w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 z-10">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                    <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600 z-10">
                      Онцлох
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-xl mb-2">{trip.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-2" />
                      {trip.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {trip.duration}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="font-bold text-xl">{trip.price ? `${trip.price.toLocaleString()}₮` : "-"}</span>
                      <Button size="sm">Дэлгэрэнгүй</Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <NewsletterForm />
    </>
  );
}
