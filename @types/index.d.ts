declare module 'ingadi' {
  export interface GalleryMenu {
    id: string
    name: string
  }

  export interface Photo {
    alt: string
    url: string
  }

  export interface Services {
    name: string
    description: string
    photos: Photo[]
  }

  export interface Pricing {
    id: string
    name: string
    pricingModel: string
    price: number
    services: Services[]
  }

  export interface Gallery {
    id: string
    name: string
    images: Photo[]
    description: string
    highlights: string[]
    details: string
  }

  export interface ReservedEventDate {
    id: string
    date: string
    billId: string
    createdAt: string
  }

  export interface EventReservation {
    eventDate: string
    guestsNumber: number,
    eventType: string,
    eventPricingId: string
  }

  export interface Address {
    address1: string
    streetAddress: string
    cityOrDistrict: string
    provinceOrState: string
    postalCode: string
    country: string
    updatedAt: string
  }

  export interface User {
    id: string
    email: string
    name?: string
    phoneNumber?: string
    image?: string
    emailVerified?: string
    admin?: boolean
    address?: Address
    updatedAt: string
  }
}
