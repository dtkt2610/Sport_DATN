export const Color: Record<string, string> = {
  blue: 'rgb(32, 72, 230)',
  cyan: 'rgb(57, 219, 217)',
  red: 'rgb(232, 32, 32)',
  orange: 'rgb(230, 130, 64)',
  gray: 'rgb(107, 100, 100)',
  white: 'rgb(255, 255, 255)',
  yellow: 'rgb(236, 242, 68)',
  black: 'rgb(3, 3, 3)',
  navy: 'rgb(0, 0, 128)',
};

export type ColorKey = keyof typeof Color;

export interface ColorTestCase {
  id: string;
  description: string;
  color: ColorKey[];
  expected: number;
   shouldUncheck?: boolean;
}

export const ColorData: ColorTestCase[] = [
  {
    id: "TC01",
    description: "Lọc sản phẩm với một màu",
    color: ["red"],  // Giá trị là 'red', là key của Color
    expected: 2
  },
  {
    id: "TC02",
    description: "Lọc sản phẩm với nhiều màu",
    color: [ "red", "cyan"],  // Giá trị là 'blue', là key của Color
    expected: 3
  },
  {
    id: "TC03",
    description: "Bỏ chọn màu và kiểm tra cập nhật",
    color: ["cyan"],  // Giá trị là 'cyan', là key của Color
    expected: 42,
    shouldUncheck: true
  },
  
];

