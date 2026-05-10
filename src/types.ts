export type UserRole = 'admin' | 'user';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: any;
}

export interface Booking {
  id?: string;
  bookingId: string;
  userId: string;
  guestName: string;
  email: string;
  phone: string;
  roomType: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  specialRequest?: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: any;
}

export interface Room {
  id: string;
  name: string;
  type: 'Standard' | 'Family' | 'Executive';
  price: number;
  image: string;
  images?: string[]; // Adding support for multiple images if needed
  features: string[];
  description: string;
  status: 'available' | 'booked' | 'maintenance';
  isAvailable: boolean;
  capacity?: number;
}

export interface Branch {
  id: string;
  name: string;
  location: string;
  image: string;
  description: string;
  phone: string;
  address: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
  description: string;
}
