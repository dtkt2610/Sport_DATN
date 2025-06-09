
interface PriceRange {
  min: number;
  max: number;
}

export interface PriceRangeTestCase {
  id: string;
  description: string;
  ranges: PriceRange[];
  expectEmpty?: boolean;
}
export const priceRangeData: PriceRangeTestCase[] = [
  {
    id: 'PRICE01',
    description: 'Lọc sản phẩm trong khoảng giá hợp lệ',
    ranges: [{ min: 901865, max: 1550000 }]

  },
  {
    id: 'PRICE02',
    description: 'Lọc sản phẩm trong khoảng giá không có sản phẩm',
    ranges: [{ min: 0, max: 165448 }],
    expectEmpty: true
  },
  {
    id: 'PRICE03',
    description: 'Cập nhật sản phẩm khi thay đổi khoảng giá',
    ranges: [{ min: 0, max: 165448 },
    { min: 901865, max: 1550000 },]
  },
  {
    id: 'PRICE04',
    description: 'Lọc sản phẩm khi min bằng max',
    ranges: [{ min: 1550000, max: 1550000 }]
  },
  {
    id: 'PRICE05',
    description: 'Lọc sản phẩm khi max = min',
    ranges: [{ min: 0, max: 0 }]
  },
];
