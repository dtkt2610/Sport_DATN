interface PriceRange {
  min: number;
  max: number;
  expectEmpty?: boolean;  // Nếu true thì mong đợi không có sản phẩm
  expectedEmptyText?: string;  // Text hiển thị khi không có sản phẩm
}

export interface PriceRangeTestCase {
  id: string;
  description: string;
  ranges: PriceRange[];

}

export const priceRangeData: PriceRangeTestCase[] = [
  {
    id: 'PRICE01',
    description: 'Lọc sản phẩm trong khoảng giá hợp lệ',
    ranges: [{ min: 900000, max: 1550000, expectEmpty: false, }],
  },
  {
    id: 'PRICE02',
    description: 'Lọc sản phẩm trong khoảng giá không có sản phẩm',
    ranges: [{
      min: 0,
      max: 75000,
      expectEmpty: true,
      expectedEmptyText: 'Không có sản phẩm nào phù hợp',
    }],

  },
  {
    id: 'PRICE03',
    description: 'Cập nhật sản phẩm khi thay đổi khoảng giá',
    ranges: [
      {
        min: 0,
        max: 90000,
        expectEmpty: true,
        expectedEmptyText: 'Không có sản phẩm nào phù hợp',
      },
      {
        min: 900000,
        max: 1550000,
        expectEmpty: false
      },
    ],
  },
  {
    id: 'PRICE04',
    description: 'Lọc sản phẩm khi min bằng max',
    ranges: [{ min: 1550000, max: 1550000, expectEmpty: false }],
  },
  {
    id: 'PRICE05',
    description: 'Lọc sản phẩm khi max = min bằng 0 (mong đợi không có sản phẩm)',
    ranges: [{
      min: 0,
      max: 0,
      expectEmpty: true,
      expectedEmptyText: 'Không có sản phẩm nào phù hợp',
    }],
  },
];
