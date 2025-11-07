# Repository Pattern

Repository Pattern là một mẫu thiết kế (design pattern) giúp tách biệt logic truy vấn dữ liệu
khỏi logic nghiệp vụ của ứng dụng

Repository hoạt động như một **lớp trung gian** giữa ứng dụng và database, giúp
quản lý va truy xuất dữ liệu một cách có tổ chức, dễ bảo trì hơn.

## **Cấu trúc Repository Pattern**

Một Repository thường bao gồm:

1. **Entity (Model)** : Đại diện cho bảng trong database (ví dụ : `User`, `Post`, ...)
2. **Repository** : Cài đặt logic truy vấn dữ liệu (Sử dụng ORM như Prisma, TypeORM, Sequelize...)
3. **Service Layer** : Gọi Repository để thực hiện các thao tác với database mà ko phụ thuộc vào ORM cụ thể.

Có thể có nhiều biến thể của Repository Pattern, chia nhỏ các thành phần ra hơn nữa
như `Repository Interface`, `Repository Implementation`, ... nhưng cơ bản thì cấu
trúc như trên. Tuỳ thuộc vào style code của team cũng như quy mô dự án.
