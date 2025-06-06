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
        description: "Kiểm tra xem danh sách sản phẩm trong giỏ hàng khi không có sản phẩm",
        expectText: "Không có sản phẩm nào trong giỏ hàng"
    },
    {
        id: "TC02",
        description: "Kiểm tra xem danh sách sản phẩm trong giỏ hàng",
        initialCartItems: [
            { productName: "Áo khoác chạy bộ Fast & Free", colorRgb: "black", size: "M", quantity: 2 },
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M", quantity: 1 }
        ],
        expectedProducts: [
            { productName: "Áo khoác chạy bộ Fast & Free", colorRgb: "black", size: "M", quantity: 2 },
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M", quantity: 1 }
        ]
    },
    {
        id: "TC03",
        description: "Kiểm tra thay đổi số lượng sản phẩm trong giỏ hàng",
        actions: [
            {
                type: "updateQuantity",
                productName: "Áo khoác chạy bộ Fast & Free",
                colorRgb: "black",
                size: "M",
                quantity: 3
            }
        ],
        expectedProducts: [
            { productName: "Áo khoác chạy bộ Fast & Free", colorRgb: "black", size: "M", quantity: 3 }
        ]
    },
    {
        id: "TC04",
        description: "Kiểm tra xóa sản phẩm khỏi giỏ hàng",
        actions: [
            {
                type: "deleteProduct",
                productName: "Áo khoác chạy bộ Fast & Free",
                colorRgb: "black",
                size: "M"
            }
        ],
        expectedProducts: [
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M", quantity: 1 }
        ]
    },
    {
        id: "TC05",
        description: "Kiểm tra chọn sản phẩm để thanh toán",
        checkoutSelection: [
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M" }
        ],
        actions: [
            {
                type: "selectForCheckout",
                productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0",
                colorRgb: "red",
                size: "M"
            },
            {
                type: "proceedToCheckout"
            }
        ],
        expectText: "/checkout"
    },
    {
        id: "TC06",
        description: "Kiểm tra không chọn sản phẩm nào để thanh toán",
        actions: [
            {
                type: "proceedToCheckout"
            }
        ],
        expectError: true,
        expectText: "Vui lòng chọn sản phẩm trước khi thanh toán"
    },
    {
        id: "TC07",
        description: "Kiểm tra chọn sản phẩm để thanh toán vượt quá 50 triệu đồng",
        initialCartItems: [
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M", quantity: 1 }
        ],
        checkoutSelection: [
            { productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0", colorRgb: "red", size: "M" }
        ],
        actions: [
            {
                type: "selectForCheckout",
                productName: "Áo thun Nam Cotton Mỹ hình in logo TS225M0",
                colorRgb: "red",
                size: "M"
            },
            {
                type: "proceedToCheckout"
            }
        ],
        expectError: true,
        expectText: "Đơn tối thiểu khi đặt không được phép lớn hơn 50.000.000đ"
    }
];
