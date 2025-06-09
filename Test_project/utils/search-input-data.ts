export const sanphamSearchData = [
  {
    id: 'SEARCH01',
    description: 'Theo tên sản phẩm đầy đủ',
    keyword: 'ÁO POLO THỂ THAO - 35572',
    expected: 'ÁO POLO THỂ THAO - 35572'
  },
  {
    id: 'SEARCH02',
    description: 'Theo từ khóa một phần',
    keyword: 'polo',
    expected: 'polo'
  },
  {
    id: 'SEARCH03',
    description: 'Không phân biệt hoa/thường',
    keyword: 'Áo polo thể thao - 35572',
    expected: 'ÁO POLO THỂ THAO - 35572'
  },
  {
    id: 'SEARCH04',
    description: 'Tìm kiếm với từ khóa không phù hợp',
    keyword: 'Xe máy',
    expect: 'Không có sản phẩm nào phù hợp'
  },
  {
    id: 'SEARCH05',
    description: 'Tìm kiếm với ô tìm kiếm để trống',
    keyword: '',
    expected: ''
  }
];