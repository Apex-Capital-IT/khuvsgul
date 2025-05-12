import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TripDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <>
      <section className="relative h-[300px] flex items-center">
        <Image
          src="/cover.avif"
          alt="Tropical Paradise"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10 text-white pt-16">
          <h1 className="text-4xl md:text-5xl font-medium">
            Tropical <span className="italic">Paradise</span>
            <br />
            Recreation
          </h1>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Bali, Indonesia
                </div>
                <div className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  7 days, 6 nights
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Unveil the beauty of tropical bliss. From sun-kissed shores to
                vibrant cultural experiences, this journey promises you a
                sensory escape.
              </p>
              <p className="text-gray-600 mb-8">
                Introducing our Tropical Paradise Package where we have curated
                the best, finest elements of island living for an unforgettable
                experience. Dive into the turquoise waters, feel the gentle sea
                breeze, and immerse yourself in the magic of these tropical
                havens. This is your ticket to the ultimate dream getaway, where
                relaxation, adventure, and natural beauty converge for a
                vacation of a lifetime.
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Price</div>
                  <div className="text-xl font-bold">$999</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Quota</div>
                  <div className="text-xl font-bold">20 Available</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="font-medium">Schedule</div>
                  <div className="text-xl font-bold">10 - 17 November 2023</div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Accommodations in luxury beachfront resorts
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Daily breakfast, lunch, and dinner
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Travel insurance & airport transfers
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    English-speaking guided island tours
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Local cultural & adventure experiences with locals
                  </li>
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-medium mb-4">Excludes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Personal expenses (souvenirs, spa, etc.)
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    International tax & visa airfare
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-red-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Optional excursions
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-4">Travel Plans</h3>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 01</div>
                    <div className="text-gray-600">Arrival in Bali</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 02</div>
                    <div className="text-gray-600">Beach Exploration</div>
                    <ul className="text-sm text-gray-500 mt-2">
                      <li>• Sunrise yoga session</li>
                      <li>• Beach hopping and water sports</li>
                      <li>• Evening relaxation at the resort</li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 03</div>
                    <div className="text-gray-600">Cultural Encounter</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 04</div>
                    <div className="text-gray-600">Island Adventure</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 05</div>
                    <div className="text-gray-600">Island Hopping</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 06</div>
                    <div className="text-gray-600">Relaxation Day</div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <div className="font-medium mb-2">DAY 07</div>
                    <div className="text-gray-600">Departure from Bali</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-6 border rounded-lg sticky top-24">
                <div className="flex justify-between mb-6">
                  <div className="font-medium">Book Tour</div>
                  <div className="text-gray-500">Messages</div>
                </div>
                <form className="space-y-4">
                  <div>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Tour Package" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tropical">
                          Tropical Paradise Recreation
                        </SelectItem>
                        <SelectItem value="mountain">
                          Mountain Odyssey
                        </SelectItem>
                        <SelectItem value="cultural">
                          Cultural Immersion
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Starting Date" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nov10">10 November 2023</SelectItem>
                        <SelectItem value="nov17">17 November 2023</SelectItem>
                        <SelectItem value="nov24">24 November 2023</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Number of Guests" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Person</SelectItem>
                        <SelectItem value="2">2 People</SelectItem>
                        <SelectItem value="3">3 People</SelectItem>
                        <SelectItem value="4">4 People</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between mb-2">
                      <div>Price (1pax)</div>
                      <div className="font-medium">$999</div>
                    </div>
                    <div className="flex justify-between mb-2">
                      <div>Tax (10%)</div>
                      <div className="font-medium">$99.90</div>
                    </div>
                    <div className="flex justify-between font-bold">
                      <div>Total</div>
                      <div>$1,098.90</div>
                    </div>
                  </div>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    Book Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-medium mb-8">
            Real <span className="italic">stories</span>
            <br />
            from travelers
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border bg-white rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl text-gray-300 mr-2">"</div>
                <p className="text-sm">
                  My travel dreams finally came true, thanks to them. I explored
                  places I never thought I would. Everything was seamless from
                  start to finish during the trip.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/cover.avif"
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Priya Mehta</p>
                  <p className="text-xs text-gray-500">India</p>
                </div>
              </div>
            </div>
            <div className="border bg-white rounded-lg p-6">
              <div className="flex items-start mb-4">
                <div className="text-3xl text-gray-300 mr-2">"</div>
                <p className="text-sm">
                  They provided an amazing adventure that I'll never forget. The
                  accommodations were top-notch, and the diversity was a perfect
                  mix of relaxation and excitement.
                </p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 overflow-hidden">
                  <Image
                    src="/cover.avif"
                    alt="Avatar"
                    width={32}
                    height={32}
                  />
                </div>
                <div>
                  <p className="text-xs font-medium">Javier Rodriguez</p>
                  <p className="text-xs text-gray-500">Spain</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
