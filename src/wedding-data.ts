export const weddingData = {
  groom: {
    fullName: "Leo Alexander",
    nickname: "Ciputra",
    bio: "Seorang arsitek yang menemukan keindahan dalam struktur, namun menemukan kesempurnaan dalam dirimu.",
    // Rasio Portrait 2:3
    image: "https://picsum.photos/800/1200?random=groom",
    parents: "Putra dari Bpk. Alexander & Ibu Diana"
  },
  bride: {
    fullName: "Kaia Amara",
    nickname: "Azizah",
    bio: "Pelukis mimpi yang akhirnya menemukan warna terindahnya di dalam hatimu.",
    // Rasio Portrait 2:3
    image: "https://picsum.photos/800/1200?random=bride",
    parents: "Putri dari Bpk. Amara & Ibu Sofia"
  },
  event: {
    date: "2026-07-14",
    time: "17:00:00",
    displayTime: "05:00 PM",
    displayDate: "July 14, 2026",
    location: "Kyoto, Japan",
    venue: "Hyatt Regency Kyoto",
    countdownTarget: "2026-07-14T17:00:00",
    // Gambar Landscape Besar (Wallpaper)
    splashImage: "https://picsum.photos/1920/1080?random=splash",
    stardustPattern: "https://www.transparenttextures.com/patterns/stardust.png",
    heroVideo: "https://res.cloudinary.com/dyk3nghtf/video/upload/q_auto:best,f_auto,vc_auto/v1765995639/June_and_July_-_The_Pre_Wedding_fiaaix.mp4",
    quote: {
      text: "And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.",
      source: "Ar-Rum 30:21"
    }
  },
  schedule: [
    {
      title: "Akad Nikah",
      date: "14th July 2026",
      time: "08:00 AM - 10:00 AM",
      venue: "Hyatt Regency Kyoto Garden",
      dressCode: "Pakaian Adat / Tradisional",
      // Gambar Landscape
      image: "https://picsum.photos/800/600?random=akad"
    },
    {
      title: "The Reception",
      date: "14th July 2026",
      time: "05:00 PM - Late",
      venue: "Hyatt Regency Kyoto Ballroom",
      dressCode: "Black Tie Optional",
      // Gambar Landscape
      image: "https://picsum.photos/800/600?random=reception"
    }
  ],
  story: {
    videoUrl: "https://res.cloudinary.com/dyk3nghtf/video/upload/q_auto:best,f_auto,vc_auto/v1765995639/June_and_July_-_The_Pre_Wedding_fiaaix.mp4",
    quote: "We loved with a love that was more than love.",
    quoteAuthor: "Edgar Allan Poe",
    established: "2023",
    items: [
      {
        title: "Pertemuan Pertama",
        description: "Semua dimulai dengan pertemuan tidak sengaja di sebuah kedai kopi di Kyoto saat hujan deras turun."
      },
      {
        title: "Lamaran",
        description: "Tiga tahun kemudian, di bawah pohon sakura Maruyama Park, janji itu pun terucap."
      }
    ]
  },
  gallery: [
    // Block 1 (5 images)
    { src: 'https://picsum.photos/600/900?random=1' },  // Row1: Portrait left
    { src: 'https://picsum.photos/900/600?random=2' },  // Row1: Landscape right
    { src: 'https://picsum.photos/600/900?random=3' },  // Row2: Portrait left
    { src: 'https://picsum.photos/600/900?random=4' },  // Row2: Portrait right
    { src: 'https://picsum.photos/900/500?random=5' },  // Row3: Full landscape
    // Block 2 (5 images)
    { src: 'https://picsum.photos/600/900?random=6' },
    { src: 'https://picsum.photos/900/600?random=7' },
    { src: 'https://picsum.photos/600/900?random=8' },
    { src: 'https://picsum.photos/600/900?random=9' },
    { src: 'https://picsum.photos/900/500?random=10' },
    // Block 3 (5 images)
    { src: 'https://picsum.photos/600/900?random=11' },
    { src: 'https://picsum.photos/900/600?random=12' },
    { src: 'https://picsum.photos/600/900?random=13' },
    { src: 'https://picsum.photos/600/900?random=14' },
    { src: 'https://picsum.photos/900/500?random=15' },
  ],
  gifts: {
    accounts: [
      { bank: "BCA", number: "123 456 7890", owner: "Leo Alexander" },
      { bank: "MANDIRI", number: "098 765 4321", owner: "Kaia Amara" }
    ],
    address: "Jalan Bunga Sakura No. 88, Cluster Kyoto, Jakarta Selatan, DKI Jakarta 12345"
  },
  footer: {
    thankYouMessage: "Kehadiran dan doa restu Anda adalah kado terindah bagi kami. Sampai jumpa di hari bahagia kami.",
    closingGreeting: "Wassalamu’alaikum warahmatullahi wabarakatuh"
  },
  music: {
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    autoPlay: true
  }
};
