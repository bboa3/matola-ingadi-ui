import spreadsheet001Img from '@assets/img/sheets/modelos-de-planilhas-inteligentes-001.png'
import spreadsheet002Img from '@assets/img/sheets/modelos-de-planilhas-inteligentes-002.png'
import spreadsheet003Img from '@assets/img/sheets/modelos-de-planilhas-inteligentes-003.png'
import { SheetCategory } from 'resources'

const getCategory = (locale: string): SheetCategory => {
  const categoryId = 'financas-e-contabilidade'

  return {
    id: categoryId,
    name: locale === 'pt' ? 'Finanças e contabilidade' : 'Finance & Accounting',
    sheets: [
      {
        categoryId,
        filename: 'Balanço patrimonial.xlsx',
        title: locale === 'pt' ? 'Balanço patrimonial' : 'Balance Sheet',
        coverImage: spreadsheet001Img
      },
      {
        categoryId,
        filename: 'Calendario Anual Por dia.xlsx',
        title: locale === 'pt' ? 'Calendário Anual Por dia' : 'Annual Calendar By day',
        coverImage: spreadsheet002Img
      },
      {
        categoryId,
        filename: 'Fluxo de Caixa.xlsx',
        title: locale === 'pt' ? 'Fluxo de Caixa' : 'Cash flow',
        coverImage: spreadsheet003Img
      }
    ]
  }
}

export default getCategory
