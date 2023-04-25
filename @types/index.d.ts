declare module 'ui' {
  export interface GalleryMenu {
    id: string
    name: string
  }

  export interface Photo {
    alt: string
    url: string
  }

  export interface LocalPhoto {
    alt: string
    url: any
  }

  export interface Language {
    locale: 'pt' | 'en'
    id: string
    name: string
  }

  export interface Page {
    name: string
    id: string
  }

  export interface Menu {
    id: string
    pages: Page[]
  }

  export interface Table4ColRow {
    col1: {
      value: any
      className?: string
    }
    col2: string | number
    col3: {
      value: number
      className?: string
    }
    col4: string | number
  }

  export interface Table6ColRow {
    col1: {
      value: any
      className?: string
    }
    col2: string | number
    col3: {
      value: number
      className?: string
    }
    col4: {
      value: number
      className?: string
    }
    col5: string | number
    col6: string | number
  }

  export interface Table3ColRow {
    col1: string | number
    col2: string | number
    col3: string | number
  }

  export interface Testimonial {
    id: string
    name: string
    image: string
    description: string
    eventType: string
  }
}
