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

// Sample trip data
const trips = [
  {
    id: 1,
    href: "/trips/tropical-paradise",
    title: "Тропикийн диваажин",
    location: "Бали, Индонез",
    duration: "7 өдөр, 6 шөнө",
    price: 999,
    featured: true,
    category: "beach",
    image: "/cover.avif",
  },
  {
    id: 2,
    href: "/trips/cruise-getaway",
    title: "Усан онгоцны аялал",
    location: "Карибын арлууд",
    duration: "7 өдөр, 6 шөнө",
    price: 1799,
    featured: true,
    category: "cruise",
    image: "/cover.avif",
  },
  {
    id: 3,
    href: "/trips/cultural-immersion",
    title: "Cultural Immersion",
    location: "Cusco, Peru",
    duration: "5 days, 4 nights",
    price: 1199,
    featured: false,
    category: "cultural",
    image: "/cover.avif",
  },
  {
    id: 4,
    href: "/trips/river-expedition",
    title: "River Expedition",
    location: "Thuringia, Germany",
    duration: "4 days, 3 nights",
    price: 899,
    featured: false,
    category: "adventure",
    image: "/cover.avif",
  },
  {
    id: 5,
    href: "/trips/mountain-odyssey",
    title: "Mountain Odyssey",
    location: "Kathmandu, Nepal",
    duration: "10 days, 9 nights",
    price: 1499,
    featured: false,
    category: "adventure",
    image: "/cover.avif",
  },
  {
    id: 6,
    href: "/trips/wildlife-safari",
    title: "Wildlife Safari",
    location: "Nairobi, Kenya",
    duration: "7 days, 6 nights",
    price: 1899,
    featured: true,
    category: "adventure",
    image: "/cover.avif",
  },
  {
    id: 7,
    href: "/trips/history-voyage",
    title: "History Voyage",
    location: "Paris, France",
    duration: "5 days, 4 nights",
    price: 999,
    featured: false,
    category: "cultural",
    image: "/cover.avif",
  },
  {
    id: 8,
    href: "/trips/city-adventure",
    title: "City Adventure",
    location: "Rome, Italy",
    duration: "5 days, 4 nights",
    price: 799,
    featured: false,
    category: "cultural",
    image: "/cover.avif",
  },
  {
    id: 9,
    href: "/trips/forest-expedition",
    title: "Forest Expedition",
    location: "Amazon, Brazil",
    duration: "8 days, 7 nights",
    price: 1799,
    featured: false,
    category: "adventure",
    image: "/cover.avif",
  },
];

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
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const itemsPerPage = 4;

  // Filter trips based on category and search query
  const filteredAndSortedTrips = trips
    .filter((trip) => {
      const matchesCategory =
        activeCategory === "all" || trip.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
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

  // Get featured trips
  const featuredTrips = trips.filter((trip) => trip.featured);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedTrips.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTrips = filteredAndSortedTrips.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, sortOrder]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to trips section
    document
      .getElementById("trips-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sort order change
  const handleSortChange = (value) => {
    setSortOrder(value);
  };

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
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-6xl font-medium mb-4">
            Аяллын <span className="italic">багцууд</span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl opacity-90">
            Хамгийн сайхан дурсамжийг үүсгэх аяллын багцуудаас сонгоно уу
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-8 border-b sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Аялал хайх..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
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
                  <DropdownMenuItem
                    onClick={() => setActiveCategory("cultural")}
                  >
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
                    {filterOptions.find((option) => option.value === sortOrder)
                      ?.label || "Үнэ: Бага - Өндөр"}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {filterOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Trips Section */}

      {/* Main Trips Section */}
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

              <TabsContent value="all" className="mt-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  Бүх аяллууд ({filteredAndSortedTrips.length})
                </h2>
              </TabsContent>
              <TabsContent value="adventure" className="mt-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  Адал явдалт аяллууд
                </h2>
              </TabsContent>
              <TabsContent value="beach" className="mt-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  Далайн эргийн аяллууд
                </h2>
              </TabsContent>
              <TabsContent value="cultural" className="mt-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  Соёлын аяллууд
                </h2>
              </TabsContent>
              <TabsContent value="cruise" className="mt-0">
                <h2 className="text-2xl md:text-3xl font-medium mb-6">
                  Усан онгоцны аяллууд
                </h2>
              </TabsContent>
            </Tabs>
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
                  <div
                    key={trip.id}
                    className="group bg-white rounded-lg overflow-hidden border border-gray-100 transition-all hover:shadow-lg"
                  >
                    <Link href={trip.href} className="block">
                      <div className="relative h-56">
                        <Image
                          src={trip.image || "/placeholder.svg"}
                          alt={trip.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-3 right-3">
                          <button className="w-8 h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <Heart className="h-4 w-4 text-white" />
                          </button>
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">
                          {trip.title}
                        </h3>
                        <div className="flex items-center text-xs text-gray-600 mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{trip.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mb-3">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>{trip.duration}</span>
                        </div>
                        <div className="mt-3 font-bold text-lg">
                          ${trip.price}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-12">
                  <div className="flex items-center space-x-2">
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
                </div>
              )}
            </>
          )}
        </div>
      </section>
      {featuredTrips.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-medium mb-8">
              Онцлох аяллууд
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredTrips.map((trip) => (
                <div
                  key={trip.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl"
                >
                  <Link href={trip.href} className="block">
                    <div className="relative h-64">
                      <Image
                        src={trip.image || "/placeholder.svg"}
                        alt={trip.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <button className="w-9 h-9 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                          <Heart className="h-5 w-5 text-white" />
                        </button>
                      </div>
                      <Badge className="absolute top-4 left-4 bg-yellow-500 hover:bg-yellow-600">
                        Онцлох
                      </Badge>
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold text-xl mb-2">
                        {trip.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{trip.location}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{trip.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="font-bold text-xl">${trip.price}</span>
                        <Button size="sm">Дэлгэрэнгүй</Button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      <NewsletterForm />
    </>
  );
}
