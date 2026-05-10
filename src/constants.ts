import { Room, Branch, Testimonial, Amenity } from './types';

export const WHATSAPP_NUMBER = "923004896616";
export const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_LINK = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent("Hi, I'd like to book a room at Family Palace Guest House.")}`;

export const ROOMS: Room[] = [
  {
    id: '1',
    name: 'Standard Sanctuary',
    type: 'Standard',
    price: 4000,
    image: '/images/room1.png',
    features: ['Queen Bed', 'Free Wi-Fi', 'Smart TV', 'Air Conditioning'],
    description: 'A cozy and clean space perfect for budget-conscious families looking for comfort and privacy.',
    status: 'available',
    isAvailable: true,
    capacity: 2
  },
  {
    id: '2',
    name: 'Luxury Family Haven',
    type: 'Family',
    price: 7000,
    image: '/images/room2.png',
    features: ['2 Double Beds', 'Attached Bath', 'Room Service', 'Security'],
    description: 'Spacious and welcoming, our Family Rooms are designed to make your group feel right at home with premium amenities.',
    status: 'available',
    isAvailable: true,
    capacity: 4
  },
  {
    id: '3',
    name: 'Executive Royal Suite',
    type: 'Executive',
    price: 9000,
    image: '/images/room3.png',
    features: ['King Bed', 'Private Lounge', 'Work Desk', 'Premium Décor'],
    description: 'Our most prestigious offering, featuring elegant interiors and sophisticated comfort for the discerning traveler.',
    status: 'available',
    isAvailable: true,
    capacity: 2
  }
];

export const BRANCHES: Branch[] = [
  {
    id: '1',
    name: 'Family Palace G-13',
    location: 'G-13/1, Islamabad',
    image: '/images/hero.png',
    description: 'Providing premium comfort and unmatched security for families in a peaceful neighborhood.',
    phone: '0300 4896616',
    address: 'House 9 Street 87 G-13/1, Islamabad'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed',
    role: 'Verified Guest',
    comment: 'I recently had the pleasure of staying at Family Palace Guest House during my visit to Islamabad. Overall, it was a delightful experience. The rooms were clean, well-maintained, and very comfortable—perfect after a long day of exploring. The staff were exceptionally friendly and attentive, making my stay completely stress-free. Highly recommended!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=ahmed'
  },
  {
    id: '2',
    name: 'Usamah Khan',
    role: 'Verified Guest',
    comment: 'I had an absolutely wonderful stay at Family Palace Guest House. From the moment I arrived, the warm hospitality made me feel right at home. The rooms were spotless, beautifully furnished, and extremely comfortable. I especially appreciated the peaceful atmosphere and high standards of cleanliness. The staff were professional, friendly, and always ready to help.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=usamah'
  },
  {
    id: '3',
    name: 'Maimoon Siddiqui',
    role: 'Verified Guest',
    comment: 'It was my first time staying at a guest house in Islamabad, and I had the best experience at Family Palace Guest House. I was traveling with my mother, and the place felt extremely safe and welcoming. The staff went above and beyond to ensure our comfort and were always available to assist us. Highly recommended for anyone looking for a safe and comfortable stay!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=maimoon'
  },
  {
    id: '4',
    name: 'Muhammad Qasim Khan',
    role: 'Verified Guest',
    comment: 'I recently stayed at Family Palace Guest House, and it was a very pleasant experience. The property is well-maintained, and all basic facilities are available, making the stay comfortable. The environment was calm, safe, and suitable for both business and family visits. It offers a great balance between comfort and professionalism.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=qasim'
  },
  {
    id: '5',
    name: 'Asad Ahmad',
    role: 'Verified Guest',
    comment: 'I had a wonderful stay at Family Palace Guest House. The rooms were clean, the ambiance was peaceful, and the staff was incredibly hospitable. Highly recommended for anyone looking for a comfortable and budget-friendly stay!',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=asad'
  }
];

export const AMENITIES: Amenity[] = [
  { id: '1', name: 'High-Speed Wi-Fi', icon: 'Wifi', description: 'Stay connected with our complimentary high-speed fiber internet.' },
  { id: '2', name: 'Premium Parking', icon: 'Car', description: 'Secure, on-site parking available for all guests.' },
  { id: '3', name: 'Climate Control', icon: 'Thermometer', description: 'Individual AC and heating in every room for your comfort.' },
  { id: '4', name: 'In-Room Dining', icon: 'Coffee', description: 'Delicious meals delivered straight to your door.' },
  { id: '5', name: 'Concierge 24/7', icon: 'UserCheck', description: 'Our dedicated team is here to help you anytime via WhatsApp.' },
  { id: '6', name: 'Laundry Service', icon: 'Wind', description: 'Professional laundry and dry cleaning services available.' }
];

export const GALLERY_IMAGES = [
  '/images/hero.png',
  '/images/room1.png',
  '/images/room2.png',
  '/images/room3.png',
  '/images/gallery2.jpeg',
  '/images/gallery3.jpeg',
  '/images/gallery4.jpeg',
  '/images/gallery8.jpeg',
  '/images/gallery9.jpeg',
  '/images/gallery10.jpeg',
  '/images/gallery11.jpeg',
  '/images/gallery12.jpeg',
  '/images/gallery14.jpeg',
];
