USE [Sports]
GO
ALTER TABLE [dbo].[Anh] ADD  CONSTRAINT [DF_Anh_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ChatLieu] ADD  CONSTRAINT [DF_ChatLieu_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ChiTietSanPham] ADD  CONSTRAINT [DF_ChiTietSanPham_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[CoAo] ADD  CONSTRAINT [DF_CoAo_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[DiaChi] ADD  CONSTRAINT [DF_DiaChi_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[DoiHang] ADD  CONSTRAINT [DF_TraHang_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[GioHang] ADD  CONSTRAINT [DF_GioHang_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[GioHangChiTiet] ADD  CONSTRAINT [DF_GioHangChiTiet_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[HangLoi] ADD  CONSTRAINT [DF_HangLoi_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[HinhThucThanhToan] ADD  CONSTRAINT [DF_HinhThucThanhToan_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[HoaDon] ADD  CONSTRAINT [DF_HoaDon_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[HoaDon_KhuyenMai] ADD  CONSTRAINT [DF_HoaDon_KhuyenMai_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[HoaDonChiTiet] ADD  CONSTRAINT [DF_HoaDonChiTiet_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[KhachHang] ADD  CONSTRAINT [DF_KhachHang_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[KhuyenMai] ADD  CONSTRAINT [DF_KhuyenMai_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[KichCo] ADD  CONSTRAINT [DF_KichCo_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[LichSuHoaDon] ADD  CONSTRAINT [DF_LichSuHoaDon_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[LoaiSanPham] ADD  CONSTRAINT [DF_LoaiSanPham_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[MauSac] ADD  CONSTRAINT [DF_MauSac_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[NhanVien] ADD  CONSTRAINT [DF_NhanVien_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[NhaSanXuat] ADD  CONSTRAINT [DF_NhaSanXuat_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[SanPham] ADD  CONSTRAINT [DF_SanPham_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[VaiTro] ADD  CONSTRAINT [DF_VaiTro_id]  DEFAULT (newid()) FOR [id]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_ChatLieu] FOREIGN KEY([id_cl])
REFERENCES [dbo].[ChatLieu] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_ChatLieu]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_CoAo] FOREIGN KEY([id_ca])
REFERENCES [dbo].[CoAo] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_CoAo]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_KichCo] FOREIGN KEY([id_kc])
REFERENCES [dbo].[KichCo] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_KichCo]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_LoaiSanPham] FOREIGN KEY([id_lsp])
REFERENCES [dbo].[LoaiSanPham] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_LoaiSanPham]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_MauSac] FOREIGN KEY([id_ms])
REFERENCES [dbo].[MauSac] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_MauSac]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_NhaSanXuat] FOREIGN KEY([id_nsx])
REFERENCES [dbo].[NhaSanXuat] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_NhaSanXuat]
GO
ALTER TABLE [dbo].[ChiTietSanPham]  WITH CHECK ADD  CONSTRAINT [FK_ChiTietSanPham_SanPham] FOREIGN KEY([id_sp])
REFERENCES [dbo].[SanPham] ([id])
GO
ALTER TABLE [dbo].[ChiTietSanPham] CHECK CONSTRAINT [FK_ChiTietSanPham_SanPham]
GO
ALTER TABLE [dbo].[DiaChi]  WITH CHECK ADD  CONSTRAINT [FK_DiaChi_KhachHang] FOREIGN KEY([id_kh])
REFERENCES [dbo].[KhachHang] ([id])
GO
ALTER TABLE [dbo].[DiaChi] CHECK CONSTRAINT [FK_DiaChi_KhachHang]
GO
ALTER TABLE [dbo].[GioHang]  WITH CHECK ADD  CONSTRAINT [FK_GioHang_KhachHang] FOREIGN KEY([id_tk])
REFERENCES [dbo].[KhachHang] ([id])
GO
ALTER TABLE [dbo].[GioHang] CHECK CONSTRAINT [FK_GioHang_KhachHang]
GO
ALTER TABLE [dbo].[GioHangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GioHangChiTiet_ChiTietSanPham] FOREIGN KEY([id_ctsp])
REFERENCES [dbo].[ChiTietSanPham] ([id])
GO
ALTER TABLE [dbo].[GioHangChiTiet] CHECK CONSTRAINT [FK_GioHangChiTiet_ChiTietSanPham]
GO
ALTER TABLE [dbo].[GioHangChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_GioHangChiTiet_GioHang] FOREIGN KEY([id_gh])
REFERENCES [dbo].[GioHang] ([id])
GO
ALTER TABLE [dbo].[GioHangChiTiet] CHECK CONSTRAINT [FK_GioHangChiTiet_GioHang]
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD  CONSTRAINT [FK_HoaDon_HinhThucThanhToan] FOREIGN KEY([id_httt])
REFERENCES [dbo].[HinhThucThanhToan] ([id])
GO
ALTER TABLE [dbo].[HoaDon] CHECK CONSTRAINT [FK_HoaDon_HinhThucThanhToan]
GO
ALTER TABLE [dbo].[HoaDon]  WITH CHECK ADD  CONSTRAINT [FK_HoaDon_NhanVien] FOREIGN KEY([id_tk])
REFERENCES [dbo].[NhanVien] ([id])
GO
ALTER TABLE [dbo].[HoaDon] CHECK CONSTRAINT [FK_HoaDon_NhanVien]
GO
ALTER TABLE [dbo].[HoaDon_KhuyenMai]  WITH CHECK ADD  CONSTRAINT [FK_HoaDon_KhuyenMai_HoaDon] FOREIGN KEY([id_hd])
REFERENCES [dbo].[HoaDon] ([id])
GO
ALTER TABLE [dbo].[HoaDon_KhuyenMai] CHECK CONSTRAINT [FK_HoaDon_KhuyenMai_HoaDon]
GO
ALTER TABLE [dbo].[HoaDon_KhuyenMai]  WITH CHECK ADD  CONSTRAINT [FK_HoaDon_KhuyenMai_KhuyenMai] FOREIGN KEY([id_km])
REFERENCES [dbo].[KhuyenMai] ([id])
GO
ALTER TABLE [dbo].[HoaDon_KhuyenMai] CHECK CONSTRAINT [FK_HoaDon_KhuyenMai_KhuyenMai]
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonChiTiet_ChiTietSanPham] FOREIGN KEY([id_ctsp])
REFERENCES [dbo].[ChiTietSanPham] ([id])
GO
ALTER TABLE [dbo].[HoaDonChiTiet] CHECK CONSTRAINT [FK_HoaDonChiTiet_ChiTietSanPham]
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonChiTiet_HangLoi] FOREIGN KEY([id_hl])
REFERENCES [dbo].[HangLoi] ([id])
GO
ALTER TABLE [dbo].[HoaDonChiTiet] CHECK CONSTRAINT [FK_HoaDonChiTiet_HangLoi]
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonChiTiet_HoaDon] FOREIGN KEY([id_hd])
REFERENCES [dbo].[HoaDon] ([id])
GO
ALTER TABLE [dbo].[HoaDonChiTiet] CHECK CONSTRAINT [FK_HoaDonChiTiet_HoaDon]
GO
ALTER TABLE [dbo].[HoaDonChiTiet]  WITH CHECK ADD  CONSTRAINT [FK_HoaDonChiTiet_TraHang] FOREIGN KEY([id_th])
REFERENCES [dbo].[DoiHang] ([id])
GO
ALTER TABLE [dbo].[HoaDonChiTiet] CHECK CONSTRAINT [FK_HoaDonChiTiet_TraHang]
GO
ALTER TABLE [dbo].[LichSuHoaDon]  WITH CHECK ADD  CONSTRAINT [FK_LichSuHoaDon_HoaDon] FOREIGN KEY([id_hd])
REFERENCES [dbo].[HoaDon] ([id])
GO
ALTER TABLE [dbo].[LichSuHoaDon] CHECK CONSTRAINT [FK_LichSuHoaDon_HoaDon]
GO
ALTER TABLE [dbo].[NhanVien]  WITH CHECK ADD  CONSTRAINT [FK_NhanVien_VaiTro] FOREIGN KEY([id_vt])
REFERENCES [dbo].[VaiTro] ([id])
GO
ALTER TABLE [dbo].[NhanVien] CHECK CONSTRAINT [FK_NhanVien_VaiTro]
GO