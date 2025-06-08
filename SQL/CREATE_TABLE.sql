USE [Sports]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Anh](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [varbinary](max) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[id_ctsp] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Anh] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChatLieu](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK_ChatLieu] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ChiTietSanPham](
	[id] [uniqueidentifier] NOT NULL,
	[id_cl] [uniqueidentifier] NULL,
	[id_sp] [uniqueidentifier] NULL,
	[id_lsp] [uniqueidentifier] NULL,
	[id_nsx] [uniqueidentifier] NULL,
	[id_kc] [uniqueidentifier] NULL,
	[id_ms] [uniqueidentifier] NULL,
	[id_ca] [uniqueidentifier] NULL,
	[ma] [nvarchar](50) NULL,
	[so_luong] [int] NULL,
	[gia_ban] [money] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[nguoi_sua] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
 CONSTRAINT [PK_ChiTietSanPham] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CoAo](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK_CoAo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DiaChi]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DiaChi](
	[id] [uniqueidentifier] NOT NULL,
	[dia_chi] [nvarchar](50) NULL,
	[tinh_thanh] [nvarchar](50) NULL,
	[quan_huyen] [nvarchar](50) NULL,
	[phuong_xa] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[id_kh] [uniqueidentifier] NULL,
 CONSTRAINT [PK_DiaChi] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DoiHang]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DoiHang](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[tong_tien_hang_doi] [money] NULL,
	[so_hang_doi] [int] NULL,
	[trang_thai] [int] NULL,
	[ghi_chu] [nvarchar](50) NULL,
	[ngay_tao] [datetime] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[phuong_thuc_thanh_toan] [bit] NULL,
	[tien_khach_phai_tra] [money] NULL,
 CONSTRAINT [PK_TraHang] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHang]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHang](
	[id] [uniqueidentifier] NOT NULL,
	[id_tk] [uniqueidentifier] NULL,
	[ma] [nvarchar](50) NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_thanh_toan] [datetime] NULL,
	[trang_thai] [int] NULL,
	[ten_nguoi_nhan] [nvarchar](50) NULL,
	[dia_chi] [nvarchar](50) NULL,
	[sdt] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GioHangChiTiet]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GioHangChiTiet](
	[id] [uniqueidentifier] NOT NULL,
	[id_gh] [uniqueidentifier] NULL,
	[id_ctsp] [uniqueidentifier] NULL,
	[so_luong] [int] NULL,
	[tong_tien] [money] NULL,
 CONSTRAINT [PK_GioHangChiTiet] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HangLoi]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HangLoi](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ghi_chu] [nvarchar](50) NULL,
	[so_luong_hang_loi] [int] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[ngay_tao] [datetime] NULL,
 CONSTRAINT [PK_HangLoi] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HinhThucThanhToan]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HinhThucThanhToan](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ma_giao_dich] [nvarchar](50) NULL,
	[tien] [money] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK__HinhThuc__3213E83F6A9996CF] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDon]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDon](
	[id] [uniqueidentifier] NOT NULL,
	[id_kh] [uniqueidentifier] NULL,
	[id_tk] [uniqueidentifier] NULL,
	[dia_chi] [nvarchar](255) NULL,
	[tinh] [nvarchar](50) NULL,
	[huyen] [nvarchar](50) NULL,
	[xa] [nvarchar](50) NULL,
	[ma] [nvarchar](50) NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_thanh_toan] [datetime] NULL,
	[tong_tien] [money] NULL,
	[tong_tien_sau_khi_giam] [money] NULL,
	[trang_thai] [int] NULL,
	[ten_nguoi_nhan] [nvarchar](50) NULL,
	[sdt] [nvarchar](50) NULL,
	[ngay_ship] [datetime] NULL,
	[tien_ship] [money] NULL,
	[ngay_sua] [datetime] NULL,
	[ngay_nhan] [datetime] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[loai_don] [int] NULL,
	[id_httt] [uniqueidentifier] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
 CONSTRAINT [PK__HoaDon__3213E83F62062958] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDon_KhuyenMai]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDon_KhuyenMai](
	[id] [uniqueidentifier] NOT NULL,
	[id_hd] [uniqueidentifier] NULL,
	[id_km] [uniqueidentifier] NULL,
	[tien_giam] [money] NULL,
 CONSTRAINT [PK_HoaDon_KhuyenMai] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[HoaDonChiTiet]    Script Date: 12/13/2023 3:55:58 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HoaDonChiTiet](
	[id] [uniqueidentifier] NOT NULL,
	[id_th] [uniqueidentifier] NULL,
	[id_hd] [uniqueidentifier] NULL,
	[id_hl] [uniqueidentifier] NULL,
	[id_ctsp] [uniqueidentifier] NULL,
	[don_gia] [money] NULL,
	[so_luong] [int] NULL,
	[so_luong_hang_doi] [int] NULL,
	[so_luong_yeu_cau_doi] [int] NULL,
	[so_luong_hang_loi] [int] NULL,
	[lich_su_so_luong_yeu_cau_doi] [int] NULL,
 CONSTRAINT [PK__HoaDonCh__3213E83FC480223A] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhachHang]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhachHang](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[sdt] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
	[ngay_sinh] [datetime] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[mat_khau] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[gioi_tinh] [bit] NULL,
	[anh] [varbinary](max) NULL,
	[ngay_tao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KhuyenMai]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KhuyenMai](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[muc_giam] [money] NULL,
	[so_tien_toi_thieu_giam] [money] NULL,
	[thoi_gian_bat_dau] [datetime] NULL,
	[thoi_gian_ket_thuc] [datetime] NULL,
	[mo_ta] [nvarchar](255) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[nguoi_sua] [nvarchar](50) NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[loai_giam] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[KichCo]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[KichCo](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK_KichCo] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LichSuHoaDon]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LichSuHoaDon](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ghi_chu] [nvarchar](max) NULL,
	[id_hd] [uniqueidentifier] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LoaiSanPham]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LoaiSanPham](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK_LoaiSanPham] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[MauSac]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[MauSac](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
 CONSTRAINT [PK_MauSac] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhanVien]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhanVien](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[sdt] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
	[dia_chi] [nvarchar](255) NULL,
	[ngay_sinh] [datetime] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[nguoi_tao] [nvarchar](50) NULL,
	[nguoi_sua] [nvarchar](50) NULL,
	[mat_khau] [nvarchar](50) NULL,
	[id_vt] [uniqueidentifier] NULL,
	[trang_thai] [int] NULL,
	[anh] [varbinary](max) NULL,
	[gioi_tinh] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NhaSanXuat]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NhaSanXuat](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[dia_chi] [nvarchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SanPham]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SanPham](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
	[ngay_sua] [datetime] NULL,
	[mo_ta] [nvarchar](max) NULL,
 CONSTRAINT [PK_SanPham] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[VaiTro]    Script Date: 12/13/2023 3:55:59 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[VaiTro](
	[id] [uniqueidentifier] NOT NULL,
	[ma] [nvarchar](50) NULL,
	[ten] [nvarchar](50) NULL,
	[trang_thai] [int] NULL,
	[ngay_tao] [datetime] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
