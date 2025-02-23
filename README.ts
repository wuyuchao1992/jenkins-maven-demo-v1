import { Page } from '@playwright/test';

/**
 * REPRESENTATION OF CORE DOMAIN MODEL
 * 
 * FinancialData: Raw string values preserve original formatting
 * CategoryData: Hierarchical structure mirrors table organization
 * TableData: Complete dataset with top-level categories
 */
interface FinancialData {
  actual_2023: string;
  actual_2024: string;
  budget_2024: string;
  forecast_2024: string;
  forecast_2025: string;
}

interface CategoryData {
  [subCategory: string]: FinancialData;
}

interface TableData {
  [category: string]: CategoryData;
}

/**
 * CONFIGURATION MANAGEMENT
 * 
 * Default categories can be overridden without modifying core logic
 * 'as const' ensures type inference as readonly tuple
 */
const DEFAULT_MAIN_CATEGORIES = ['Total', 'GZ', 'SZ', 'BJ'] as const;

export class BudgetPage {
  /**
   * STATE ENCAPSULATION
   * 
   * - readonly modifiers enforce immutability
   * - locators centralized for single source of truth
   */
  private readonly page: Page;
  private readonly tableLocator = 'table';
  private mainCategories: readonly string[];

  /**
   * FLEXIBLE CONSTRUCTION
   * 
   * - Dependency injection for page instance
   * - Optional configuration override for categories
   */
  constructor(page: Page, mainCategories = DEFAULT_MAIN_CATEGORIES) {
    this.page = page;
    this.mainCategories = mainCategories;
  }

  /**
   * MAIN ENTRY POINT
   * 
   * - Single async operation for performance
   * - Clear separation between data fetch and parsing
   */
  async getTableData(): Promise<TableData> {
    const table = this.page.locator(this.tableLocator);
    const tableText = await table.locator('tr').allInnerTexts();
    
    return this.parseTableData(tableText);
  }

  /**
   * DATA TRANSFORMATION PIPELINE
   * 
   * - Pure function with input/output transparency
   * - Linear workflow with clear failure points
   * - State managed through local variables
   */
  private parseTableData(tableText: string[]): TableData {
    const result: TableData = {};
    let currentCategory = '';

    for (const row of tableText) {
      const cells = row.split('\t').map(c => this.cleanCellContent(c));
      if (cells.length === 0) continue;

      const firstCell = cells[0];
      
      if (this.isMainCategory(firstCell)) {
        currentCategory = firstCell;
        result[currentCategory] = {};
        continue;
      }

      if (this.isCategorySeparator(firstCell)) {
        currentCategory = '';
        continue;
      }

      if (currentCategory && this.isDataRow(cells)) {
        this.processDataRow(cells, result[currentCategory]);
      }
    }

    return result;
  }

  /**
   * DATA SANITIZATION
   * 
   * - Centralized cleaning logic
   * - Preserves data integrity while normalizing whitespace
   */
  private cleanCellContent(content: string): string {
    return content
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * PREDICATE FUNCTIONS
   * 
   * - Self-documenting condition checks
   * - Single responsibility for each check
   * - Enables easy modification of criteria
   */
  private isMainCategory(content: string): boolean {
    return this.mainCategories.includes(content);
  }

  private isCategorySeparator(content: string): boolean {
    return content === '' && !this.mainCategories.includes(content);
  }

  private isDataRow(cells: string[]): boolean {
    return cells.length === 6;
  }

  /**
   * DATA MAPPING
   * 
   * - Clear field assignment
   * - Defensive empty string fallbacks
   * - Structural consistency in output
   */
  private processDataRow(cells: string[], categoryData: CategoryData): void {
    const [subCategory, ...values] = cells;
    
    categoryData[subCategory] = {
      actual_2023: values[0] || '',
      actual_2024: values[1] || '',
      budget_2024: values[2] || '',
      forecast_2024: values[3] || '',
      forecast_2025: values[4] || ''
    };
  }
}
