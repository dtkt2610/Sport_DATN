
export interface NeckFilterTestCase {
  id: string;
  description: string;
  initialSelection: string[];   // Loại cổ áo ban đầu chọn
  unselectAfter?: boolean;      // Có bỏ chọn sau đó chọn lại không
  reselect?: string[];          // Nếu bỏ chọn rồi thì chọn loại mới
}

export const NeckData: NeckFilterTestCase[] = [
  {
    id: "TC01",
    description: "Lọc sản phẩm với một loại cổ áo",
    initialSelection: ["Cổ Có Mũ"],
  },
  {
    id: "TC02",
    description: "Lọc sản phẩm với nhiều loại cổ áo",
    initialSelection: ["Cổ Tròn", "Cổ Có Mũ"],
  },
  {
    id: "TC03",
    description: "Chọn lại loại cổ áo khác",
    initialSelection: ["Cổ Có Mũ"],
    unselectAfter: true,    // Có bỏ chọn sau đó chọn lại không
    reselect: ["Cổ Tròn"]
  },
];
