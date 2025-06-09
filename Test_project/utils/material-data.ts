
export interface MaterialFilterTestCase {
  id: string;
  description: string;
  initialSelection: string[];
  unselectAfter?: boolean;
  reselect?: string[];
}

export const MaterialData: MaterialFilterTestCase[] = [
  {
    id: "MF01",
    description: "Lọc sản phẩm với một loại chất liệu",
    initialSelection: ["Nylon"],
  },
  {
    id: "MF02",
    description: "Lọc sản phẩm với nhiều chất liệu",
    initialSelection: ["60% cotton, 40% polyester", "Nylon"],
  },
  {
    id: "MF03",
    description: "Chọn lại loại cổ áo khác",
    initialSelection: ["Nylon"],
    unselectAfter: true,    // Có bỏ chọn sau đó chọn lại không
    reselect: ["60% cotton, 40% polyester"]
  },
];
