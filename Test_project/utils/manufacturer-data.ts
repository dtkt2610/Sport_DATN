
export interface ManufacturerFilterTestCase {
  id: string;
  description: string;
  initialSelection: string[];   
  unselectAfter?: boolean;      
  reselect?: string[];         
}

export const ManufacturerData: ManufacturerFilterTestCase[] = [
  {
    id: "TC01",
    description: "Lọc sản phẩm với một nhà sản xuất",
    initialSelection: ["USA Mỹ"],
  },
  {
    id: "TC02",
    description: "Lọc sản phẩm với nhiều nhà sản xuất",
    initialSelection: ["Trung Quốc", "Việt Nam"],
  },
  {
    id: "TC03",
    description: "Chọn lại nhà sản xuất khác",
    initialSelection: ["Việt Nam"],
    unselectAfter: true,    // Có bỏ chọn sau đó chọn lại không
    reselect: ["USA Mỹ"]
  },
];
