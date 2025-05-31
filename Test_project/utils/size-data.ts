import { expect } from "playwright/test";

// Danh sách size hợp lệ trên UI
export const validSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL'];

export interface SizeFilterTestCase {
  id: string;
  description: string;
  productSizes: string | string[];
  expected: {
    minProductCount?: number;         // Số lượng sản phẩm tối thiểu (nếu có)
    productCount?: number;            // Số lượng sản phẩm chính xác (nếu biết)
    expectNoProduct?: boolean;        // true nếu mong đợi không có sản phẩm
    noProductMessage?: string;        // Nội dung thông báo không có sản phẩm
  };
}

export const sizeFilterData: SizeFilterTestCase[] = [
  {
    id: 'TC01',
    description: 'Lọc sản phẩm với 1 size hợp lệ (S)',
    productSizes: 'S',
    expected: {
      minProductCount: 1,
    },
  },
  {
    id: 'TC02',
    description: 'Lọc sản phẩm với nhiều size hợp lệ (S, M)',
    productSizes: ['S', 'M'],
    expected: {
      minProductCount: 1,
    },
  },
  {
    id: 'TC03',
    description: 'Lọc sản phẩm với size không tồn tại (XS)',
    productSizes: 'XS',
    expected: {
      expectNoProduct: true,
      noProductMessage: 'Không có sản phẩm phù hợp',
    },
  },
];
