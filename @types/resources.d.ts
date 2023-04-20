declare module 'resources' {

  export interface Sheet {
    categoryId: string
    filename: string
    title: string
    coverImage: any
  }

  export interface SheetCategory {
    id: string
    name: string
    sheets: Sheet[]
  }

  export interface ResourcesUser {
    id: string
    userId: string
    downloads: number
    active: boolean
    createdAt: string
    updateAt: string
  }
}
