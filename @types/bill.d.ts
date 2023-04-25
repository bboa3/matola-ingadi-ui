
declare module 'bill' {
  export interface Locales {
    pt: string
    en: string
  }

  export type InvoiceStatus = 'PENDING' | 'PAID' | 'FAILED'
  export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'
  export type BillStatus = 'ACTIVE' | 'DISABLED'
  export type EventDateStatus = 'PENDING' | 'RESERVED'
  export type TransactionType = 'date-reservation' | 'remaining-payment'
  export type ActivityId = 'matola-ingadi-events-hall'

  export interface EventDate {
    id: string
    date: string
    invoiceCode: string
    status: EventDateStatus
    updatedAt: string
    createdAt: string
  }

  export interface Activity {
    id: ActivityId
    name: string
  }

  export interface Service {
    id: string
    description: string
  }

  export interface Address {
    cityOrDistrict: string
    provinceOrState: string
    country: string
  }

  export interface Discount {
    other?: {
      id: string
      name: string
      percentage: number
    }
  }

  export interface Pricing {
    id: string
    name: string
    activity: Activity
    price: number
    baseGuestsNumber: number
    discount: Discount
    services: Service[]
  }

  export interface Commission {
    model: 'PERCENTAGE' | 'VALUE'
    value: number
  }

  export interface PaymentMethod {
    id: string
    name: string
    image: any
    commission: Commission
  }

  export interface BillPaymentMethod {
    id: string
    name: string
    commission: {
      model: string
      value: number
    },
    totalCommission: number
  }

  export interface Transaction {
    id: string
    transactionType: TransactionType
    status: TransactionStatus
    paymentMethod: string
    invoicePercentage: number
    subTotal: number
    total: number
    paymentGatewayFee: number
    confirmedBy?: string
    details?: string
    transactionDate?: string
    dueAt: string
    updatedAt: string
    createdAt: string
  }

  export interface Invoice {
    invoiceCode: string
    activity: Activity
    eventType: string
    pricingId: string
    guestsNumber: number
    subTotal: number
    discounted: number
    total: number
    invoiceStatus: InvoiceStatus
    transactions: Transaction[]
    services: string[]
    eventDate: string
    createdAt: string
    updatedAt: string
  }

  export interface Bill {
    id: string
    userId: string
    name: string
    email: string
    phoneNumber: string
    address: Address
    activity: Activity
    maxTeamMembers: number
    invoices: Invoice[]
    status: BillStatus
    nextInvoiceDate: string
    createdAt: string
    updatedAt: string
  }
}
