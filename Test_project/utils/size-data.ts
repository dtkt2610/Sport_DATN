
export interface SizeFilterTestCase {
  id: string;
  description: string;
  initialSelection: string[];
  unselectAfter?: boolean;
  reselect?: string[];
}

export const sizeFilterData: SizeFilterTestCase[] = [
  {
    id: 'SIZE01',
    description: 'Lọc sản phẩm với 1 size hợp lệ (S)',
    initialSelection: ['S'],

  },
  {
    id: 'SIZE02',
    description: 'Lọc sản phẩm với nhiều size hợp lệ (S, M)',
    initialSelection: ['S', 'M'],
  },
  {
    id: 'SIZE03',
    description: 'Chọn lại size khác',
    initialSelection: ['M'],
    unselectAfter: true,    // Có bỏ chọn sau đó chọn lại không
    reselect: ["L"]
  },
];
