declare module 'ingadi' {
  export interface Photo {
  src: string
  alt: string
}

  export interface Event {
    id: string
    name: string
    price: string
    pricingModel: string
    images: Photo[]
    description: string
    highlights: string[]
    details: string
  }
}
