
declare module 'bill' {
  export interface Locales {
    pt: string
    en: string
  }

  export type Period = 'month' | 'year'
  export type InvoiceStatus = 'PENDING' | 'PAID' | 'FAILED'
  export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'
  export type BillStatus = 'ACTIVE' | 'DISABLED'
  export type ActivityId = 'excel-and-docs-templates' | 'economic-and-financial-information'

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
    period: {
      id: Period
      name: string
      percentage: number
    }[],
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
    status: TransactionStatus
    paymentMethod: string
    paymentGatewayFee: number
    confirmedBy?: string
    details?: string
    transactionTime?: string
    updatedAt: string
    createdAt: string
  }

  export interface Invoice {
    invoiceCode: string
    activity: Activity
    plan: string
    pricingId: string
    maxTeamMembers: number
    subTotal: number
    discounted: number
    total: number
    period: Period
    invoiceStatus: InvoiceStatus
    transaction: Transaction
    services: string[]
    paidAt?: string
    dueAt: string
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
