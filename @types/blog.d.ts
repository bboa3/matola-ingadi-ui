declare module 'blog' {
  export interface Page {
    name: string
    id: string
  }

  export interface Menu {
    id: string
    pages: Page[]
  }
}
