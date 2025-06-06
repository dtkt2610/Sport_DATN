

export interface ColorTestCase {
  id: string;
  description: string;
  initialSelection: string[];   
  unselectAfter?: boolean;      
  reselect?: string[];         
}

export const ColorData: ColorTestCase[] = [
  {
    id: "TC01",
    description: "Lọc sản phẩm với một màu",
    initialSelection: ["red"], 
  },
  {
    id: "TC02",
    description: "Lọc sản phẩm với nhiều màu",
    initialSelection: [ "red", "cyan"],
  },
  {
    id: "TC03",
    description: "Bỏ chọn màu và kiểm tra cập nhật",
    initialSelection: ["cyan"],  // Giá trị là 'cyan', là key của Color
    unselectAfter: true,    // Có bỏ chọn sau đó chọn lại không
    reselect: ["yellow"]
  },
  
];

