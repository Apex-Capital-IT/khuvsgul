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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://taiga-9fde.onrender.com";

// Fetch featured trips from API
const useFeaturedTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch(`${API_URL}/travel?pageNumber=1&pageSize=4`);
        const data = await res.json();
        if (data.code === 0) {
          // pull the array out of data.response.docs
          const raw = Array.isArray(data.response.docs)
            ? data.response.docs
            : [];
          const formatted = raw.map((trip) => ({
            id: trip._id,
            href: `/trips/${trip._id}`,
            title: trip.title,
            location: trip.destination?.location || "Location not specified",
            duration: `${trip.duration?.days || 0} өдөр, ${
              trip.duration?.nights || 0
            } шөнө`,
            price: trip.price,
            featured: trip.isSpecial,
            category: trip.categories?.[0] || "other",
            image: trip.images?.[0] || "/cover.avif",
          }));
          setTrips(formatted);
        } else {
          throw new Error(data.message || "Unexpected API response");
        }
      } catch (err) {
        setError(err.message);
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

export default function TripsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("all");
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
    .sort((a, b) => {
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document
      .getElementById("trips-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSortChange = (value) => setSortOrder(value);

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
              <p className="text-lg text-gray-600">
                Хайлтад тохирох аялал олдсонгүй.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                  setSortOrder("all");
                }}
              >
                Бүх аяллыг харах
              </Button>
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
                    <div className="relative h-56">
                      <Image
                        src={trip.image}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button className="absolute top-3 right-3 w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
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
                        ${trip.price}
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

      {/* Featured (“Онцлох”) Trips */}
      {featuredLoading ? (
        <div>Loading...</div>
      ) : featuredError ? (
        <div>Error: {featuredError}</div>
      ) : featuredTrips.length > 0 ? (
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
                  <div className="relative h-64">
                    <Image
                      src={trip.image}
                      alt={trip.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-4 right-4 w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <Heart className="h-5 w-5 text-white" />
                    </button>
                    <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600">
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
                      <span className="font-bold text-xl">${trip.price}</span>
                      <Button size="sm">Дэлгэрэнгүй</Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <NewsletterForm />
    </>
  );
}
