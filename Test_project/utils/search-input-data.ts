import { expect } from "@playwright/test";

export const sanphamSearchData = [
  {
    id: 'TC01',
    description: 'Theo tên sản phẩm đầy đủ',
    keyword: 'ÁO POLO THỂ THAO - 35572',
    expected: 'ÁO POLO THỂ THAO - 35572'
  },
  {
    id: 'TC02',
    description: 'Theo từ khóa một phần',
    keyword: 'polo',
    expected: 'polo'
  },
  {
    id: 'TC03',
    description: 'Không phân biệt hoa/thường',
    keyword: 'Áo polo thể thao - 35572',
    expected: 'ÁO POLO THỂ THAO - 35572'
  }, 
  {
    id:'TC04',
    description: 'Tìm kiếm với từ khóa không phù hợp',
    keyword: 'Xe máy',
    expect: ''
  },
  {
    id: 'TC05',
    description: 'Tìm kiếm với ô tìm kiếm để trống',
    keyword: '',
    expected: ''
  }
];