/* Мазмұнды осы файлдан жаңартамыз. Бағалар автоматты жаңармайды.
   instagramVideo: нақты ашық Reels URL-ін қосқан соң видео батырмасы шығады. */
const contentCheckedOn = '13.10.2026';
const locationMedia = {
  sherkala: {
    "photos": [
        {
            "src": "assets/sherkala-01.png",
            "alt": "Шерқала көрінісі"
        }
    ],
    "tiktokVideo": "https://www.tiktok.com/@mangystau__safari/video/7670819027215830292",
    "tiktokId": "7670819027215830292"
},
  torysh: {
    "photos": [
        {
            "src": "assets/torysh-01.png",
            "alt": "Торыш алқабы көрінісі"
        }
    ],
    "tiktokVideo": "https://www.tiktok.com/@zhaikpress/video/7581472705673776440",
    "tiktokId": "7581472705673776440"
},
  airakty: {
    "photos": [
        {
            "src": "assets/airakty-01.png",
            "alt": "Айрақты-Шоманай көрінісі"
        }
    ],
    "tiktokVideo": "https://www.tiktok.com/@janaozendiq/video/7493210266314771717",
    "tiktokId": "7493210266314771717"
},
  beket: {
    "photos": [
        {
            "src": "assets/beket-01.png",
            "alt": "Бекет ата көрінісі"
        }
    ],
    "tiktokVideo": "https://www.tiktok.com/@mangystau__safari/video/7651510174825336084",
    "tiktokId": "7651510174825336084"
},
  shakpak: {
    "photos": [
        {
            "src": "assets/shakpak-01.png",
            "alt": "Шақпақ ата көрінісі"
        }
    ],
    "tiktokVideo": "https://www.tiktok.com/@orynbasar1987/video/7666748924971060501",
    "tiktokId": "7666748924971060501"
},
  bozzhyra: {
    mapUrl: 'https://2gis.kz/aktau/geo/70030076161824264',
    mapLabel: 'Бозжыраның шолу алаңы',
    instagramVideo: null,
    instagram: null,
    tiktokVideo: 'https://www.tiktok.com/@beko360_/video/7460890968070425861',
    tiktokId: '7460890968070425861',
    photos: [{src:'assets/bozzhyra-01.png', alt:'Бозжыраның күн батардағы көрінісі'}],
    visit: 'Бозжырада бірнеше шолу алаңы бар. Таңдаған турдың қай панорамаларға апаратынын оператордан нақтылаңыз.',
    tourIds: ['bozzhyra-bus', 'bozzhyra-jeep']
  }
};
const tourOffers = [
  {id:'bozzhyra-bus', title:'Қызылқұп + Бозжыра', operator:'ТОО «Турист»', type:'Автобус экскурсиясы', duration:'16 сағат', price:14000, unit:'адамға', capacity:null,
   description:'Қызылқұп пен Бозжыраның жоғарғы шолу алаңдары. Оператордың жариялаған бағдарламасы.',
   includes:'Қызметтер құрамы мен сапар күнін оператордан нақтылаңыз.',
   source:'https://aktau-tourist.kz/kyzylkup-bozhyra', checked:contentCheckedOn},
  {id:'bozzhyra-jeep', title:'Бозжыраның жоғарғы панорамалары', operator:'Ves Mangystau', type:'Жеке джип туры', duration:'11–13 сағат', price:125000, unit:'көлікке', capacity:3,
   description:'Қарақияның шолу алаңы, Бозжыраның үш жоғарғы панорамасы және Қызылқұп.',
   includes:'Оператор бағдарламасында: жол талғамайтын көлік, жүргізуші-гид, түскі ас, сусындар және нысанға кіру төлемі көрсетілген.',
   source:'https://vesmangystau.kz/marshrutybozjira', checked:contentCheckedOn}
];
const restaurants = [
  {
    "id": "jeti",
    "name": "JETI",
    "address": "Ақтау, 30-шағынаудан, 181, «Інжу» ТК",
    "description": "Қазақ тағамдарын ұсынатын мейрамхана. Жарияланған мәзірінде қазақ еті мен қуырдақ бар.",
    "dishes": [
      "Қазақ еті",
      "Қуырдақ",
      "Наурыз көже"
    ],
    "instagram": "https://www.instagram.com/jeti.aktau/",
    "map": "https://yandex.kz/maps/ru/org/jeti/85923014181/",
    "menu": "https://wolt.com/kk/kaz/aktau/restaurant/jeti",
    "checked": "13.10.2026",
    "priceNote": "Wolt мәзіріндегі мысал: Наурыз көже — 4 290 ₸; Jeti қуырдақ — 6 710 ₸. Залдағы баға өзгеше болуы мүмкін."
  },
  {
    "id": "navat",
    "name": "Navat",
    "address": "Ақтау, 10-шағынаудан, 3, Saya Park СО, 1-қабат",
    "description": "Шайхана. Шай, кофе және ұлттық тағамдар ұсынатын орын; нақты мәзір мен тағам қолжетімділігін тапсырыс алдында нақтылаңыз.",
    "dishes": [
      "Шай",
      "Кофе",
      "Ұлттық тағамдар"
    ],
    "hours": "Күн сайын 10:00–24:00",
    "instagram": "https://www.instagram.com/navat_aktau_/",
    "map": "https://2gis.kz/aktau/search/Navat",
    "checked": "15.10.2026"
  },
  {
    "id": "qaimaq",
    "name": "Qaimaq / Kaimak",
    "address": "Ақтау, 9-шағынаудан, 30/3, Ardager СО, 1-қабат",
    "description": "Шығыс асханасы бар дәмхана. Қуырдақтың түрі мен қолжетімділігін тапсырыс алдында дәмханадан нақтылаңыз.",
    "dishes": [
      "Қуырдақты сұрау",
      "Шығыс асханасы"
    ],
    "hours": "Күн сайын 11:00–01:00",
    "phone": "+7 700 057 57 57",
    "whatsapp": "77000575757",
    "instagram": "https://www.instagram.com/kaimak_kafe_aktau/",
    "map": "https://2gis.kz/aktau/firm/70000001075291044",
    "menu": "https://taplink.cc/kaimak_kafe_aktau",
    "checked": "13.10.2026"
  },
  {
    "id": "bozjyra-restaurant",
    "name": "Бозжыра",
    "address": "Ақтау, 11А-шағынаудан, 1/4, 2-қабат",
    "description": "Отбасылық халал мейрамхана. Сорпаның түрі мен бүгінгі мәзірін мейрамханадан сұраңыз.",
    "dishes": [
      "Отбасылық дастарқан",
      "Халал асхана",
      "Сорпаны сұрау"
    ],
    "hours": "Күн сайын 11:00–00:00",
    "phone": "+7 778 472 55 55",
    "whatsapp": "77784725555",
    "instagram": "https://www.instagram.com/bozjyra.aktau/",
    "map": "https://2gis.kz/aktau/firm/70000001065058213",
    "menu": "https://2gis.kz/aktau/firm/70000001065058213/tab/menu",
    "checked": "13.10.2026"
  }
];
// Төмендегі рецептер — үйде дайындауға арналған нұсқалар, мейрамхана рецептері емес.
const recipes = [
  {id:'baursak',title:'Бауырсақ',subtitle:'Дастарқанның жылы дәмі',time:'Шамамен 1,5–2 сағат',servings:'4–6 адамға',
   description:'Майға пісірілетін жұмсақ қамыр тағамы. Қонақ күткенде шай дастарқанына ұсынылады.',
   ingredients:['Ұн — 500 г','Жылы сүт — 250 мл','Құрғақ ашытқы — 7 г','Қант — 1 ас қасық','Тұз — ½ шай қасық','Қамырға май — 2 ас қасық','Қуыруға жеткілікті өсімдік майы'],
   steps:['Жылы сүтке ашытқы мен қантты араластырып, 10 минут күтіңіз.','Тұз, май және ұн қосып, жұмсақ қамыр илеңіз. Үстін жауып, көлемі шамамен екі есе ұлғайғанша жылы жерге қойыңыз.','Қамырды шамамен 1 см қалыңдықта жайып, бөліктерге кесіңіз. Тағы 10–15 минут демалдырыңыз.','Қызған майға аз-аздан салып, аударып отырып, іші піскенше және сырты алтын түсті болғанша қуырыңыз. Майын сорғытып ұсыныңыз.'],
   restaurantIds:['navat'],note:'Бауырсақтың осы филиалда бар-жоғын және бағасын нақтылаңыз.'},
  {id:'kazakh-meat',title:'Қазақ еті',subtitle:'Ет, жайма және сорпа',time:'Шамамен 2,5–3,5 сағат',servings:'4 адамға',
   description:'Піскен ет, жайма және сорпада жұмсарған пияздан тұратын дәстүрлі тағамның үй нұсқасы.',
   ingredients:['Сүйекті ет — 1 кг','Ұн — 350 г','Жұмыртқа — 1 дана','Қамырға су — шамамен 120–150 мл','Пияз — 2 дана','Тұз және бұрыш — дәміне қарай','Етті жабатындай су'],
   steps:['Етті суға салып, қайнағанда көбігін алыңыз. Баяу отта ет әбден жұмсарып, толық піскенше қайнатыңыз.','Ұн, жұмыртқа, су және аздаған тұздан тығыздау қамыр илеңіз. 20–30 минут демалдырып, жұқалап жайыңыз да, бөліктерге кесіңіз.','Пиязды турап, ыстық сорпада жұмсартыңыз. Жайманы басқа бөлік сорпада толық піскенше пісіріңіз.','Табаққа жайма, туралған ет және пиязды орналастырыңыз. Сорпаны бөлек ұсыныңыз.'],
   restaurantIds:['jeti'],note:'JETI мәзірінде жылқы етінен қазақ еті көрсетілген. Үй рецепті мейрамхана рецептімен бірдей емес.'},
  {id:'kuyrdak',title:'Қуырдақ',subtitle:'Қазанда дайындалатын ет тағамы',time:'Шамамен 1–1,5 сағат',servings:'4 адамға',
   description:'Ет пен пияздан әзірленетін қуырдақтың қарапайым үй нұсқасы. Өңірге және отбасына қарай құрамы өзгереді.',
   ingredients:['Қой не сиыр еті — 700 г','Пияз — 2 дана','Май — 3 ас қасық','Су — қажетіне қарай','Тұз, бұрыш — дәміне қарай'],
   steps:['Етті шағын бөліктерге тураңыз. Қазанда майды қыздырып, етті аз-аздан салып қуырыңыз.','Туралған пиязды қосып, жұмсарғанша араластырыңыз.','Аздап су құйып, қақпағын жабыңыз. Баяу отта ет жұмсарып, толық піскенше бұқтырыңыз.','Тұз бен бұрыш қосып, ыстық күйінде ұсыныңыз.'],
   restaurantIds:['qaimaq'],note:'Қуырдақтың құрамы, бағасы және қолжетімділігі дәмханадан нақтыланады.'},
  {id:'sorpa',title:'Сорпа',subtitle:'Еттің нәрі, дастарқанның жылуы',time:'Шамамен 2–3 сағат',servings:'4 адамға',
   description:'Баяу қайнатылған ет сорпасының үйге арналған қарапайым нұсқасы.',
   ingredients:['Сүйекті сиыр не қой еті — 700 г','Су — 2–2,5 л','Пияз — 1 дана','Сәбіз — 1 дана','Тұз және бұрыш — дәміне қарай'],
   steps:['Етті суық суға салып, қайнағанда көбігін алыңыз.','Отты бәсеңдетіп, ет толық піскенше және жұмсарғанша қайнатыңыз.','Пияз бен сәбізді қосып, көкөністер піскенше пісіріңіз.','Тұз, бұрыш қосып, етпен бірге ыстық ұсыныңыз.'],
   restaurantIds:['bozjyra-restaurant'],note:'Сорпаның түрін және бағасын мейрамханадан нақтылаңыз.'}
];

// «Тірі мәдениет» бейнелері. videoId — YouTube сілтемесіндегі 11 таңбалы ID.
const culturalVideos = [
  {
    "key": "craft",
    "image": "craft",
    "title": "Қолөнер шеберханасы",
    "description": "Қолөнер туралы бейне.",
    "videoId": "Q0eBB_1ADIA",
    "short": false
  },
  {
    "key": "food",
    "image": "food",
    "title": "Ұлттық асхана",
    "description": "Ұлттық асхана туралы бейне.",
    "videoId": "9NE8LQRFIog",
    "short": false
  },
  {
    "key": "yurt",
    "image": "yurt-build",
    "title": "Киіз үй құпиясы",
    "description": "Киіз үй туралы бейне.",
    "videoId": "1jAebuZ9rdM",
    "short": false
  },
  {
    "key": "tradition",
    "image": "tradition",
    "title": "Салт-дәстүр шежіресі",
    "description": "Салт-дәстүр туралы қысқа бейне.",
    "videoId": "MV6QYZfy0_Q",
    "short": true
  },
  {
    "key": "games",
    "image": "games",
    "title": "Ұлттық ойындар",
    "description": "Ұлттық ойындар туралы бейне.",
    "videoId": "0dIFxFDkc1I",
    "short": false
  }
];

// Шеберлер каталогы. Фотоларды пайдаланушы ұсынды.
const artisanCatalog = [
  {
    "name": "Нұр Шах / NURSHAH",
    "desc": "Сән үйі. Ұлттық нақыштағы киімдер мен коллекциялар.",
    "image": "maker-nurshah-v2.png",
    "instagram": "https://www.instagram.com/nur_shah_kazakhstan/",
    "address": "Ақтау, 17-шағынаудан, «Дукат» ТК",
    "hours": "Дс–Жм 09:00–19:00 · Сб 10:00–18:00 · Жс демалыс",
    "phone": "+7 777 599 54 77",
    "site": "https://nurshah.kz/contact.html",
    "map": "https://go.2gis.com/l8tdp"
  },
  {
    "name": "Медина Сақтағанова",
    "desc": "Ұлттық нақыштағы авторлық киімдер. Қабылдау күнін алдын ала нақтылаңыз.",
    "image": "maker-medina.png",
    "instagram": "https://www.instagram.com/medina_saktaganova_atelier/",
    "source": "https://2gis.kz/aktau/firm/70000001078711786",
    "address": "Ақтау, 16-шағынаудан, 94, «Tomiris Towers» ТК, 1-қабат",
    "phone": "+7 701 227 10 77",
    "map": "https://2gis.kz/aktau/firm/70000001078711786",
    "hours": "2GIS: 09:00–19:00. Сапар күніндегі кестені нақтылаңыз."
  },
  {
    "name": "Меруерт Балманова",
    "desc": "Ұлттық нақыштағы киімдер ұсынатын сән үйі. Байланыс пен мекенжай — 2GIS каталогынан.",
    "address": "Ақтау, 19-шағынаудан, 33, «Beknur Deluxe» ТК",
    "phone": "+7 775 381 30 78",
    "map": "https://2gis.kz/aktau/firm/70000001068290964",
    "source": "https://2gis.kz/aktau/firm/70000001068290964",
    "whatsapp": [
      "77753813078",
      "77770586599",
      "77058659904"
    ],
    "image": "maker-meruert.png",
    "hours": "Күн сайын 09:00–19:00",
    "instagram": "https://www.instagram.com/meruert__balmanova_sanuyi/"
  },
  {
    "name": "Алия Туман",
    "desc": "Кешкі және авторлық киімдер тігетін сән үйі. Тапсырыс шарттарын Instagram арқылы нақтылаңыз.",
    "image": "maker-aliya.png",
    "instagram": "https://www.instagram.com/aliya_tuman_atelier/",
    "address": "Ақтау, 16-шағынаудан, 57, «Инара» ТК, 1-қабат",
    "hours": "Күн сайын 10:00–20:00 · 2GIS мәліметі",
    "map": "https://2gis.kz/aktau/firm/70000001028767001",
    "source": "https://2gis.kz/aktau/firm/70000001028767001"
  }
];
