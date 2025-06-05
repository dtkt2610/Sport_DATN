export interface CartTestCase {
    id: string;
    description: string;
    initialCartItems?: {
        productName: string;
        colorRgb: string;
        size: string;
        quantity: number;
    }[];
    expectedProducts?: {
        productName: string;
        colorRgb: string;
        size: string;
        quantity: number;
    }[];
    actions?: {
        type: "updateQuantity" | "deleteProduct" | "selectForCheckout" | "proceedToCheckout";
        productName?: string;
        colorRgb?: string;
        size?: string;
        quantity?: number;
    }[];
    checkoutSelection?: {
        productName: string;
        colorRgb: string;
        size: string;
    }[];
    expectText?: string;      // dùng cho expectEmptyCart hoặc expectErrorMessage
    expectError?: boolean;
}

export const CartTestData: CartTestCase[] = [
    {
        id: "TC01",
        description: "Kiểm tra xem danh sách sản phẩm trong giỏ hàng",
        initialCartItems: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M", quantity: 2 },
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ],
        expectedProducts: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M", quantity: 2 },
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ]
    },
    {
        id: "TC02",
        description: "Kiểm tra thay đổi số lượng sản phẩm trong giỏ hàng",
        initialCartItems: [
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ],
        actions: [
            {
                type: "updateQuantity",
                productName: "Áo thun thể thao Nam dài tay SS057M1",
                colorRgb: "black",
                size: "M",
                quantity: 2
            }
        ],
        expectedProducts: [
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 2 }
        ]
    },
    {
        id: "TC03",
        description: "Kiểm tra xóa sản phẩm khỏi giỏ hàng",
        initialCartItems: [
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ],
        actions: [
            {
                type: "deleteProduct",
                productName: "Áo thun thể thao Nam dài tay SS057M1",
                colorRgb: "black",
                size: "M"
            }
        ],
        expectText: "Không có sản phẩm nào trong giỏ hàng"
    },
    {
        id: "TC04",
        description: "Kiểm tra chọn sản phẩm để thanh toán",
        initialCartItems: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M", quantity: 2 },
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ],
        checkoutSelection: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M" }
        ],
        actions: [
            {
                type: "selectForCheckout",
                productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
                colorRgb: "black",
                size: "M"
            },
            {
                type: "proceedToCheckout"
            }
        ],
        expectedProducts: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M", quantity: 2 }
        ]
    },
    {
        id: "TC05",
        description: "Kiểm tra không chọn sản phẩm nào để thanh toán",
        initialCartItems: [
            { productName: "Áo thun thể thao Nam dài tay SS057M1", colorRgb: "black", size: "M", quantity: 1 }
        ],
        actions: [
            {
                type: "proceedToCheckout"
            }
        ],
        expectError: true,
        expectText: "Vui lòng chọn sản phẩm để thanh toán" // gợi ý
    },
    {
        id: "TC06",
        description: "Kiểm tra không có sản phẩm nào trong giỏ hàng",
        actions: [
            {
                type: "proceedToCheckout"
            }
        ],
        expectError: true,
        expectText: "Không có sản phẩm nào trong giỏ hàng"
    },
    {
        id: "TC07",
        description: "Kiểm tra chọn sản phẩm để thanh toán vượt quá 50 triệu đồng",
        initialCartItems: [
            {
                productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
                colorRgb: "black",
                size: "L",
                quantity: 1000
            }
        ],
        checkoutSelection: [
            { productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular", colorRgb: "black", size: "M" }
        ],
        actions: [
            {
                type: "selectForCheckout",
                productName: "Áo Hoodie Thể Thao Tay Ngắn Có Nón Form Regular",
                colorRgb: "black",
                size: "M"
            },
            {
                type: "proceedToCheckout"
            }
        ],
        expectError: true,
        expectText: "Đơn tối thiểu khi đặt không được phép lớn hơn 50.000.000đ" // giả định text error backend
    }
];
