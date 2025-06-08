#!/bin/bash

# Chờ SQL Server khởi động hoàn tất
echo "⏳ Đang chờ SQL Server khởi động..."
sleep 20

# Thông tin kết nối
USER=sa
PASSWORD='Kimtho@123'
SERVER=localhost

# Đường dẫn các file SQL (đã copy vào /usr/src/app/sql trong container)
SQL_PATH=/usr/src/app/sql

# Thực thi từng file SQL
echo "🚀 Đang tạo bảng..."
/opt/mssql-tools/bin/sqlcmd -S $SERVER -U $USER -P $PASSWORD -i $SQL_PATH/CREATE_TABLE.sql

echo "📦 Đang chèn dữ liệu mẫu..."
/opt/mssql-tools/bin/sqlcmd -S $SERVER -U $USER -P $PASSWORD -i $SQL_PATH/DATN.sql

echo "🔐 Đang thêm ràng buộc..."
/opt/mssql-tools/bin/sqlcmd -S $SERVER -U $USER -P $PASSWORD -i $SQL_PATH/CONTRAINT.sql


echo "✅ Khởi tạo CSDL hoàn tất."
