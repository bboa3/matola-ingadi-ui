import getAllCategories from '@common/Resources/sheets/all'
import getFinanceCategory from '@common/Resources/sheets/finance'
import { SheetCategory } from 'resources'

const getSheetsCategories = (locale: string): SheetCategory[] => {
  const financeCategory = getFinanceCategory(locale)

  const sheetCategories = [
    financeCategory
  ]
  const allCategories = getAllCategories(sheetCategories, locale)

  return [
    allCategories,
    ...sheetCategories
  ]
}

export default getSheetsCategories
