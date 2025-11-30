"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Locale = "en" | "mn";

type TranslationDictionary = Record<string, string | string[] | number>;

type Dictionaries = Record<Locale, TranslationDictionary>;

const dictionaries: Dictionaries = {
  en: {
    "brand.name": "Taiga",
    "nav.trips": "Trips",
    "nav.destination": "Destination",
    "nav.about": "About us",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.signup": "Sign up",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "footer.home": "Home",
    "footer.about": "About us",
    "footer.contact": "Contact",
    "footer.copyright": "All rights reserved.",
    "home.hero.imageAlt": "Hero background image",
    "home.hero.kicker": "The right place to plan your next adventure",
    "home.hero.title.part1": "Дэмч ир гүн",
    "home.hero.title.part2": "a place to go",
    "home.hero.title.part3": "real",
    "home.hero.title.part4": "journeys",
    "home.hero.title.part5": "with us",
    "home.hero.title.part6": "begin",
    "home.hero.description":
      "With us, unlock doors to many cultures through stunning photography and thrilling adventures.",
    "home.hero.cta": "Explore more",
    "home.mustTry.title.part1": "Must",
    "home.mustTry.title.part2": "try",
    "home.mustTry.title.part3": "packages",
    "home.mustTry.seeAll": "See all packages",
    "home.card1.imageAlt": "Tropical paradise",
    "home.card1.title": "Tropical paradise",
    "home.card1.location": "Bali, Indonesia",
    "home.card1.duration": "7 days, 6 nights",
    "home.card2.imageAlt": "Mountain odyssey",
    "home.card2.title": "Mountain odyssey",
    "home.card2.location": "Kathmandu, Nepal",
    "home.card2.duration": "10 days, 9 nights",
    "home.card3.imageAlt": "Touch history",
    "home.card3.title": "Touch history",
    "home.card3.location": "Cusco, Peru",
    "home.card3.duration": "5 days, 4 nights",
    "home.card4.imageAlt": "Urban adventure",
    "home.card4.title": "Urban adventure",
    "home.card4.location": "Tokyo, Japan",
    "home.card4.duration": "6 days, 5 nights",
    "home.gallery.imageAlt": "Gallery of travel moments",
    "home.gallery.title.part1": "Moments",
    "home.gallery.title.part2": "shared",
    "home.gallery.title.part3": "on Instagram",
    "benefits.title.part1": "Our true",
    "benefits.title.part2": "belief",
    "benefits.title.part3": "your",
    "benefits.title.part4": "benefit",
    "benefits.description":
      "Our beliefs are not just words, but the foundation of every trip we offer. By valuing sustainability, authenticity, and customer-centricity, every trip with us will be worthwhile for you.",
    "benefits.point1.title": "Customer-centric",
    "benefits.point1.description":
      "Your satisfaction is the compass that guides our travel services. We put your needs first.",
    "benefits.point2.title": "Sustainable travel",
    "benefits.point2.description":
      "We value sustainable, eco-friendly travel that respects the local environment and communities.",
    "benefits.point3.title": "Authentic experiences",
    "benefits.point3.description":
      "We believe travel should connect you with unforgettable, authentic local cultural experiences and places of interest.",
    "benefits.point4.title": "Quality guides",
    "benefits.point4.description":
      "Every trip is led by knowledgeable, passionate guides who enrich your travel experience.",
    "testimonials.title.part1": "Real",
    "testimonials.title.part2": "stories",
    "testimonials.title.part3": "from travelers",
    "testimonials.items.0.quote":
      "My travel dream has now come true, thanks to them. I visited places I never thought I'd go. From start to finish, everything went smoothly and wonderfully.",
    "testimonials.items.0.avatarAlt": "Portrait",
    "testimonials.items.0.name": "Priya Mehta",
    "testimonials.items.0.country": "India",
    "testimonials.items.1.quote":
      "They gave me an amazing adventure that I will never forget. The accommodations were lovely and it was the perfect blend of relaxation and excitement.",
    "testimonials.items.1.avatarAlt": "Portrait",
    "testimonials.items.1.name": "Javier Rodriguez",
    "testimonials.items.1.country": "Spain",
    "testimonials.items.2.quote":
      "The travel team was truly professional and friendly. I made new friends and left with unforgettable memories.",
    "testimonials.items.2.avatarAlt": "Portrait",
    "testimonials.items.2.name": "Saraa",
    "testimonials.items.2.country": "Mongolia",
    "newsletter.title.part1": "Ready",
    "newsletter.title.part2": "for a new journey",
    "newsletter.title.part3": "to set",
    "newsletter.title.part4": "off?",
    "newsletter.description":
      "Don’t let your dream vacation remain a dream. Take action now and let us help craft your next unforgettable adventure. Join us to turn your travel dreams into reality.",
    "newsletter.form.name": "Name",
    "newsletter.form.phone": "Phone number",
    "newsletter.form.email": "Email address",
    "newsletter.form.terms":
      "By subscribing to the newsletter, I agree to the Terms of Service",
    "newsletter.form.submit": "Subscribe now",
    "trips.hero.imageAlt": "Trips cover",
    "trips.hero.title.part1": "Travel",
    "trips.hero.title.part2": "packages",
    "trips.hero.subtitle":
      "Choose from trip packages that create your best memories",
    "trips.search.placeholder": "Search trips...",
    "trips.filters.filter": "Filter",
    "trips.filters.all": "All",
    "trips.filters.adventure": "Adventure",
    "trips.filters.beach": "Beach",
    "trips.filters.cultural": "Cultural",
    "trips.filters.cruise": "Cruise",
    "trips.sort.default": "Price: Low - High",
    "trips.heading.all": "All trips ({count})",
    "trips.heading.allBase": "All trips",
    "trips.heading.adventure": "Adventure trips",
    "trips.heading.beach": "Beach trips",
    "trips.heading.cultural": "Cultural trips",
    "trips.heading.cruise": "Cruise trips",
    "trips.empty": "No trips matched your search.",
    "trips.seeAll": "See all trips",
    "trips.featured.title": "Featured trips",
    "trips.featured.badge": "Featured",
    "trips.featured.cta": "Details",
    "about.hero.title": "About",
    "about.hero.title.italic": "us",
    "about.company.name": "DEMCH IR GUN LLC",
    "about.company.type": "TRAVEL & TOURISM",
    "about.vision.title": "Vision:",
    "about.vision.content":
      "We are a national network company for travel and tourism in Mongolia",
    "about.mission.title": "Our Mission:",
    "about.mission.content":
      "Our company operations are transparent, accountable, and accessible to every citizen",
    "about.values.title": "Our Values:",
    "about.values.list": [
      "Professional and experienced human resources",
      "Responsible partners",
      "Sustainable operations",
      "Openness and transparency",
    ],
    "about.goals.title": "Our Goals:",
    "about.goals.list": [
      "Take travelers to Mongolia's beautiful pristine wilderness.",
      "Provide real prices and discounts for each trip.",
      "Ensure safety in our work.",
      "Provide services that meet each traveler's expectations.",
      "Create a national network that serves regular travelers.",
    ],
    "about.learnMore": "Learn More",
    "about.introduction.title": "Introduction",
    "about.introduction.content":
      "DEMCH IR GUN LLC was established in 2019. We operate in travel and tourism, training and consulting services. We are a professional organization with special permits from the Ministry of Labor and Social Protection and the Occupational Health Center. We have a management team for organizing travel activities, as well as professional staff such as drivers, guides, translators, and cooks. We work with partner individuals and organizations such as hotels, guesthouses, restaurants, and tourist camps that serve travelers.",
    "about.team.title.part1": "Our",
    "about.team.title.part2": "team",
    "about.team.title.part3": "members",
    "about.team.description":
      "The management team and professional staff who play a crucial role in successfully carrying out the travel and tourism activities of DEMCH IR GUN LLC.",
    "about.team.management.title": "Management Team",
    "about.team.management.description": "Travel organizers",
    "about.team.professionals.title": "Professional Staff",
    "about.team.professionals.description":
      "Drivers, guides, translators, cooks",
    "about.team.partners.title": "Partner Organizations",
    "about.team.partners.description": "Hotels, guesthouses, restaurants",
    "about.video.play": "Play video",
    "about.video.close": "Close video",
    "about.introduction.professional.title": "Professional Organization",
    "about.introduction.professional.description":
      "We are a professional organization with special permits from the Ministry of Labor and Social Protection and the Occupational Health Center.",
    "about.introduction.team.title": "Expert Team",
    "about.introduction.team.description":
      "We have a management team for organizing travel activities, as well as professional staff such as drivers, guides, translators, and cooks.",
    "about.introduction.partnerships.title": "Global Partnerships",
    "about.introduction.partnerships.description":
      "We work with partner individuals and organizations such as hotels, guesthouses, restaurants, and tourist camps that serve travelers.",
    "about.introduction.stats.founded": "Founded",
    "about.introduction.stats.travelers": "Happy Travelers",
    "about.introduction.stats.support": "Support",
    "contact.title": "Contact Us",
    "contact.subtitle": "Get in Touch",
    "contact.description":
      "Do you have questions about our travel packages, or do you need help planning your dream vacation? Our team is ready to help you with every step of your program.",
    "contact.phone.title": "Phone",
    "contact.email.title": "Email",
    "contact.address.title": "Address",
    "contact.address.content":
      "46th Street, 13th District, 12th Building, Moron Sum 67138, Khuvsgul Province, Mongolia",
    "contact.form.title": "Send Message",
    "contact.form.name.placeholder": "Your name",
    "contact.form.email.placeholder": "Your email",
    "contact.form.subject.placeholder": "Subject",
    "contact.form.message.placeholder": "Your message",
    "contact.form.send": "Send Message",
  },
  mn: {
    "brand.name": "Тайга",
    "nav.trips": "Аялал",
    "nav.destination": "Чиглэл",
    "nav.about": "Бидний тухай",
    "nav.contact": "Холбоо барих",
    "nav.login": "Нэвтрэх",
    "nav.signup": "Бүртгүүлэх",
    "nav.profile": "Профайл",
    "nav.logout": "Гарах",
    "footer.home": "Нүүр хуудас",
    "footer.about": "Бидний тухай",
    "footer.contact": "Холбоо барих",
    "footer.copyright": "Бүх эрх хуулиар хамгаалагдсан.",
    "home.hero.imageAlt": "Нүүр зургийн ар дэвсгэр",
    "home.hero.kicker": "Дараагийн адал явдлаа төлөвлөх зөв газар",
    "home.hero.title.part1": "Дэмч ир гүн",
    "home.hero.title.part2": "очих газар биш",
    "home.hero.title.part3": "жинхэнэ",
    "home.hero.title.part4": "аялалд",
    "home.hero.title.part5": "бидэнтэй хамт",
    "home.hero.title.part6": "гараарай.",
    "home.hero.description":
      "Бидэнтэй хамт гайхалтай гэрэл зураг, сэтгэл хөдөлгөм адал явдлаар дамжуулан олон соёлын хаалгыг нээнэ.",
    "home.hero.cta": "Дэлгэрэнгүй",
    "home.mustTry.title.part1": "Заавал",
    "home.mustTry.title.part2": "туршиж үзэх",
    "home.mustTry.title.part3": "багцууд",
    "home.mustTry.seeAll": "Бүх багцыг харах",
    "home.card1.imageAlt": "Тропикийн диваажин",
    "home.card1.title": "Тропикийн диваажин",
    "home.card1.location": "Бали, Индонез",
    "home.card1.duration": "7 өдөр, 6 шөнө",
    "home.card2.imageAlt": "Уулын аялал",
    "home.card2.title": "Уулын аялал",
    "home.card2.location": "Катманду, Балба",
    "home.card2.duration": "10 өдөр, 9 шөнө",
    "home.card3.imageAlt": "Түүхэнд хүрэх",
    "home.card3.title": "Түүхэнд хүрэх",
    "home.card3.location": "Куско, Перу",
    "home.card3.duration": "5 өдөр, 4 шөнө",
    "home.card4.imageAlt": "Шийдэгдэх аялал",
    "home.card4.title": "Шийдэгдэх аялал",
    "home.card4.location": "Токио, Япон",
    "home.card4.duration": "6 өдөр, 5 шөнө",
    "home.gallery.imageAlt": "Аялалын зургийн агшинууд",
    "home.gallery.title.part1": "Instagram-д",
    "home.gallery.title.part2": "хуваалцсан",
    "home.gallery.title.part3": "агшинууд",
    "benefits.title.part1": "Бидний үнэн",
    "benefits.title.part2": "итгэл",
    "benefits.title.part3": "таны",
    "benefits.title.part4": "ашиг тусын төлөө",
    "benefits.description":
      "Бидний итгэл үнэмшил нь зүгээр л үг биш, харин бидний санал болгож буй аялал бүрийн үндэс юм. Тогтвортой байдал, жинхэнэ бодит байдал, хэрэглэгчид төвлөсөн байдлыг эрхэмлэснээр бидэнтэй хийх аялал бүр таны хувьд үнэ цэнэтэй байх болно.",
    "benefits.point1.title": "Хэрэглэгчид төвлөсөн",
    "benefits.point1.description":
      "Таны сэтгэл ханамж бол бидний аялалын үйлчилгээг чиглүүлэгч луужин юм. Бид таны хэрэгцээг эн тэргүүнд тавьж байна.",
    "benefits.point2.title": "Тогтвортой аялал",
    "benefits.point2.description":
      "Орон нутгийн байгаль орчин, нутгийн иргэдийг хүндэтгэсэн тогтвортой, байгальд ээлтэй аяллыг эрхэмлэдэг.",
    "benefits.point3.title": "Жинхэнэ туршлага",
    "benefits.point3.description":
      "Бид аялал нь таныг мартагдашгүй, жинхэнэ орон нутгийн соёлын туршлага, сонирхолтой газруудтай холбох ёстой гэдэгт итгэдэг.",
    "benefits.point4.title": "Чанартай хөтөч",
    "benefits.point4.description":
      "Аялал бүрийг мэдлэгтэй, хүсэл эрмэлзэлтэй хөтчид удирдан, таны аяллын туршлагыг улам баяжуулна.",
    "testimonials.title.part1": "Бодит",
    "testimonials.title.part2": "түүхүүд",
    "testimonials.title.part3": "аялагчдаас",
    "testimonials.items.0.quote":
      "Миний аялалын мөрөөдөл одоо биелэгдлээ, тэдэнд баярлалаа. Би хэзээ ч очихгүй гэж боддог байсан газруудаар аялсан. Аялал эхнээсээ дуусах хүртэл ямар ч асуудалгүй маш сайхан болсон.",
    "testimonials.items.0.avatarAlt": "Хөрөг",
    "testimonials.items.0.name": "Прия Мехта",
    "testimonials.items.0.country": "Энэтхэг",
    "testimonials.items.1.quote":
      "Тэд маш гайхалтай адал явдлыг надад бэлэглэсэн бөгөөд би үүнийг хэзээ ч мартахгүй. Байр сууц маш сайхан байсан бөгөөд амралт, сонирхолтой явдлуудын төгс хослол байлаа.",
    "testimonials.items.1.avatarAlt": "Хөрөг",
    "testimonials.items.1.name": "Хавьер Родригез",
    "testimonials.items.1.country": "Испани",
    "testimonials.items.2.quote":
      "Аяллын баг хамт олон үнэхээр мэргэжлийн, найрсаг байсан. Би шинэ найз нөхөдтэй болж, мартагдашгүй дурсамжтай үлдсэн.",
    "testimonials.items.2.avatarAlt": "Хөрөг",
    "testimonials.items.2.name": "Сараа",
    "testimonials.items.2.country": "Монгол",
    "newsletter.title.part1": "Шинэ",
    "newsletter.title.part2": "аялалд",
    "newsletter.title.part3": "гарахад",
    "newsletter.title.part4": "бэлэн үү?",
    "newsletter.description":
      "Мөрөөдлийн амралтаа цаашид мөрөөдөл хэвээр үлдээх хэрэггүй. Одоо үйлдэл хийж бидэнд дараагийн мартагдашгүй адал явдлаа бүтээлцэхийг зөвшөөрнө үү. Аялалын мөрөөдлөө мартагдашгүй бодит зүйл болгоход бидэнтэй нэгдээрэй.",
    "newsletter.form.name": "Нэр",
    "newsletter.form.phone": "Утасны дугаар",
    "newsletter.form.email": "И-мэйл хаяг",
    "newsletter.form.terms":
      "Мэдээллийн товхимолд бүртгүүлснээр би Үйлчилгээний нөхцөлийг зөвшөөрч байна",
    "newsletter.form.submit": "Одоо бүртгүүлэх",
    "trips.hero.imageAlt": "Аялалын танилцуулга",
    "trips.hero.title.part1": "Аяллын",
    "trips.hero.title.part2": "багцууд",
    "trips.hero.subtitle":
      "Хамгийн сайхан дурсамжийг үүсгэх аяллын багцуудаас сонгоно уу",
    "trips.search.placeholder": "Аялал хайх...",
    "trips.filters.filter": "Шүүлтүүр",
    "trips.filters.all": "Бүгд",
    "trips.filters.adventure": "Адал явдалт",
    "trips.filters.beach": "Далайн эрэг",
    "trips.filters.cultural": "Соёлын",
    "trips.filters.cruise": "Усан онгоц",
    "trips.sort.default": "Үнэ: Бага - Өндөр",
    "trips.heading.all": "Бүх аяллууд ({count})",
    "trips.heading.allBase": "Бүх аяллууд",
    "trips.heading.adventure": "Адал явдалт аяллууд",
    "trips.heading.beach": "Далайн эргийн аяллууд",
    "trips.heading.cultural": "Соёлын аяллууд",
    "trips.heading.cruise": "Усан онгоцны аяллууд",
    "trips.empty": "Хайлтад тохирох аялал олдсонгүй.",
    "trips.seeAll": "Бүх аяллыг харах",
    "trips.featured.title": "Онцлох аяллууд",
    "trips.featured.badge": "Онцлох",
    "trips.featured.cta": "Дэлгэрэнгүй",
    "about.hero.title": "Бидний",
    "about.hero.title.italic": "тухай",
    "about.company.name": "ДЭМЧ ИР ГҮН ХХК",
    "about.company.type": "АЯЛАЛ ЖУУЛЧЛАЛ",
    "about.vision.title": "Алсын хараа:",
    "about.vision.content":
      "Монгол дахь аялал жуулчлалын үндэсний сүлжээ компани байна",
    "about.mission.title": "Бидний эрхэм зорилго:",
    "about.mission.content":
      "Компанийн үйл ажиллагаа нь ил тод нээлттэй, хариуцлагатай, иргэн бүр оролцох боломжтой байна",
    "about.values.title": "Бидний үнэт зүйл:",
    "about.values.list": [
      "Мэргэшсэн туршлагатай боловсон хүчин",
      "Хариуцлагатай хамтрагчид",
      "Тогтвортой үйл ажиллагаа",
      "Нээлттэй ил тод байдал",
    ],
    "about.goals.title": "Бидний зорилт:",
    "about.goals.list": [
      "Аялагчдыг Монгол орны үзэсгэлэнт онгон дагшин зэрлэг байгалиар аялуулна.",
      "Аялал бүрд тохирсон бодит үнэ, хөнгөлөлт урамшуулал эдлүүлнэ.",
      "Аюулгүй байдлыг хангаж ажиллана.",
      "Аялагч бүрийн хүлээлтэд нийцсэн үйлчилгээ үзүүлнэ.",
      "Байнгын үйл ажиллагаатай жуулчдад үйлчилдэг үндэсний сүлжээг бий болгоно.",
    ],
    "about.learnMore": "Дэлгэрэнгүй",
    "about.introduction.title": "Танилцуулга",
    "about.introduction.content":
      "ДЭМЧ ИР ГҮН ХХК нь 2019 онд байгуулагдсан. Аялал жуулчлал, сургалт зөвлөх үйлчилгээний чиглэлээр үйл ажиллагаа явуулдаг. Хөдөлмөр нийгмийн хамгааллын яам, Хөдөлмөрийн эрүүл мэндийн төвөөс тусгай зөвшөөрөлтэй мэргэжлийн байгууллага юм. Аялал жуулчлалын үйл ажиллагааг зохион байгуулагч менежментийн баг болон жолооч, хөтөч, орчуулагч, тогооч гэх мэт мэргэжлийн ажиллагсадтай. Аялагч нарт үйлчилгээ үзүүлдэг зочид буудал гэр буудал, ресторан, жуулчны бааз гэх мэт хамтран ажиллагч хувь хүн, байгууллагуудтайгаар үйл ажиллагаагаа явуулж байна.",
    "about.team.title.part1": "Бидний",
    "about.team.title.part2": "баг",
    "about.team.title.part3": "хамт олон",
    "about.team.description":
      "ДЭМЧ ИР ГҮН ХХК-ийн аялал жуулчлалын үйл ажиллагааг амжилттай явуулахад чухал үүрэг гүйцэтгэж буй менежментийн баг болон мэргэжлийн ажиллагсад.",
    "about.team.management.title": "Менежментийн баг",
    "about.team.management.description": "Аялал зохион байгуулагчид",
    "about.team.professionals.title": "Мэргэжлийн ажилтнууд",
    "about.team.professionals.description": "Жолооч, хөтөч, орчуулагч, тогооч",
    "about.team.partners.title": "Хамтран ажиллагчид",
    "about.team.partners.description": "Зочид буудал, жуулчны бааз, ресторан",
    "about.video.play": "Видеог үзэх",
    "about.video.close": "Видео хаах",
    "about.introduction.professional.title": "Мэргэжлийн байгууллага",
    "about.introduction.professional.description":
      "Бид Хөдөлмөр нийгмийн хамгааллын яам, Хөдөлмөрийн эрүүл мэндийн төвөөс тусгай зөвшөөрөлтэй мэргэжлийн байгууллага юм.",
    "about.introduction.team.title": "Мэргэжлийн баг",
    "about.introduction.team.description":
      "Аялал жуулчлалын үйл ажиллагааг зохион байгуулагч менежментийн баг болон жолооч, хөтөч, орчуулагч, тогооч гэх мэт мэргэжлийн ажиллагсадтай.",
    "about.introduction.partnerships.title": "Дэлхийн хамтрагчид",
    "about.introduction.partnerships.description":
      "Аялагч нарт үйлчилгээ үзүүлдэг зочид буудал, гэр буудал, ресторан, жуулчны бааз гэх мэт хамтран ажиллагч хувь хүн, байгууллагуудтай ажилладаг.",
    "about.introduction.stats.founded": "Байгуулагдсан",
    "about.introduction.stats.travelers": "Сэтгэл ханамжтай аялагчид",
    "about.introduction.stats.support": "Дэмжлэг",
    "contact.title": "Холбоо барих",
    "contact.subtitle": "Бидэнтэй холбогдох",
    "contact.description":
      "Бидний аяллын багцуудын талаар асуулт байна уу, эсвэл мөрөөдлийн амралтаа төлөвлөхөд тусламж хэрэгтэй юү? Манай баг таны хөтөлбөрийн алхам бүрд туслахад бэлэн байна.",
    "contact.phone.title": "Утас",
    "contact.email.title": "И-мэйл",
    "contact.address.title": "Хаяг",
    "contact.address.content":
      "46- дугаар гудамж, 13-дугаар хороо, 12- тоот, Мөрөн сум 67138, Хөвсгөл аймаг, Монгол улс",
    "contact.form.title": "Мессеж илгээх",
    "contact.form.name.placeholder": "Таны нэр",
    "contact.form.email.placeholder": "Таны и-мэйл",
    "contact.form.subject.placeholder": "Гарчиг",
    "contact.form.message.placeholder": "Таны мессеж",
    "contact.form.send": "Мессеж илгээх",
  },
};

type InterpolationValues = Record<string, string | number | undefined>;

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  t: (key: string, vars?: InterpolationValues) => string;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("locale");
      if (stored === "en" || stored === "mn") {
        setLocaleState(stored);
      }
    } catch {}
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem("locale", next);
    } catch {}
  }, []);

  const t = useCallback(
    (key: string, vars?: InterpolationValues) => {
      const dict = dictionaries[locale] ?? dictionaries.en;
      const template = dict[key] ?? key;
      if (typeof template === "string" && vars) {
        let result = template;
        for (const [k, v] of Object.entries(vars)) {
          const pattern = new RegExp(`\\{${k}\\}`, "g");
          result = result.replace(pattern, String(v ?? ""));
        }
        return result;
      }
      return template;
    },
    [locale]
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");

  const getArray = useCallback(
    (key: string): string[] => {
      const value = ctx.t(key);
      if (Array.isArray(value)) {
        return value;
      }
      return [];
    },
    [ctx]
  );

  return { ...ctx, getArray };
}

export type { Locale };
