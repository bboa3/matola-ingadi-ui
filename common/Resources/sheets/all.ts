import { Sheet, SheetCategory } from 'resources'

const getCategory = (sheetCategories: SheetCategory[], locale: string): SheetCategory => {
  const sheets: Sheet[] = []

  for (const category of sheetCategories) {
    for (const sheet of category.sheets) {
      sheets.push(sheet)
    }
  }

  return {
    id: 'all',
    name: locale === 'pt' ? 'Todas' : 'All',
    sheets
  }
}

export default getCategory
