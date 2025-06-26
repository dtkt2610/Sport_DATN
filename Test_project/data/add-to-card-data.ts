
export interface AddToCartTestCase {
  id: string;
  description: string;
  productName?: string;
  colorRgb?: string;    // màu sắc là chuỗi rgb hoặc null nếu không chọn
  sizeLabel?: string;   // kích cỡ (null nếu không chọn)
  quantity?: number;    // số lượng (mặc định là 1)
  expectRedirectToLogin?: boolean;
  expectedPopupMessage?: string;
}


export const AddToCartData: AddToCartTestCase[] = [
  {
    id: "ATC01",
    description: "Thêm vào giỏ hàng khi chưa đăng nhập",
    productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
    colorRgb: "black",
    sizeLabel: "M",
    quantity: 2,
    expectRedirectToLogin: true
  },
  {
    id: "ATC02",
    description: "Thêm vào giỏ hàng khi chưa chọn màu",
    productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
    colorRgb: "",
    sizeLabel: "M",  // kích cỡ (null nếu không chọn)
    quantity: 2,
    expectedPopupMessage: "Vui lòng chọn màu sắc !"
  },
  {
    id: "ATC03",
    description: "Thêm vào giỏ hàng khi chưa chọn kích cỡ",
    productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
    colorRgb: "black",
    sizeLabel: "",  // kích cỡ (null nếu không chọn)
    quantity: 1,
    expectedPopupMessage: "Vui lòng chọn kích cỡ"
  },
  {
    id: "ATC04",
    description: "Thêm sản phẩm vào giỏ hàng khi đã chọn đủ thuộc tính",
    productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
    colorRgb: "black",
    sizeLabel: "M",
    quantity: 1,
    expectedPopupMessage: "Thành công"
  },
  {
    id: "ATC05",
    description: "Thêm sản phẩm vào giỏ hàng khi chưa chọn thuộc tính",
    productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
    colorRgb: "",
    sizeLabel: "",
    quantity: 1,
    expectedPopupMessage: "Vui lòng chọn màu sắc"
  }

];

