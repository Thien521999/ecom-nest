## Một số chức năng chính

- Authentication(access token và refresh token), quản lý được số thiết bị đăng nhập

- Áp dụng xác thực 2 yếu tố (2FA)

- Phân quyền dựa trên Role và Permission

- Sản phẩm chứa nhiều biến thể như size, màu, số lượng, giá ... (Product Variant)

- Thanh toán đơn hàng bằng mã QR code

- Gửi mail thông báo định kỳ cho khách hàng khi có sản phẩm mới (Cron Job)

## Phân tích sơ bộ các đối tượng cần tạo bảng

- **language**        : id, name, code
- **user**            : id, name, email, password
- **UserTranslation** : id, userId, languageId, description, address
- **RefreshToken**    : token, userId

Để phục vụ cho việc gữi OTP 6 số về email khi register và forget password, cần tạo thêm bảng để lưu mã OTP

- **VerificationCode** : id, email, code, expiresAt

Để phục vụ phân quyền Role và Permission thì

- **Role** :      id, name, isActive
- **Permission**: id, name, path, method

> Quan hệ giữa **Role** và **Permission** là n-n nên cần tạo bảng trung gian (RolePermission)

Liên quan đến sản phẩm

- **Product** : id, price, categoryId
- **ProductTranslation** : id, productId, languageId, name, description
- **Category** : id, parentCategoryId
- **CategoryTranslation** : id, categoryId, languageId, name
- **Brand** : id, logo
- **BrandTranslation**: id, brandId, languageId, name

> Quan hệ giữa **Product** và **Category** là n-n, nên cần tạo bảng trung quan (ProductCategory)
> 1 **Category** cha có thể có nhiều **Category** con, nên cần tạo thêm cột `parentCategoryId` trong
bảng **Category**. Đây gọi là **tự** quan hệ 1-n

Hỗ trợ Product Variant

- **Variant** : id, name, productId
- **VariantOption** : id, value, variantId
- **SKU** : id, value, price, stock, images, productId

> Quan hệ giữa **VariantOption** và **SKU** là n-n , nên cần tạo bảng trung gian (VariantOptionSKU)

Hỗ trợ mua hàng

- **CartItem** : id, userId, skuId, quanlity
- **ProductSKUSnapshot** (clone sản phẩm sku lúc đó, để phòng sau này sản phẩm bị thay đổi thì ko ảnh
hưởng đến lịch sử mua hàng) : id, productName, price, images, skuValue, skuId, orderId
- **Order** : id, userId, status

Hỗ trợ đánh giá sản phẩm

- **Review**: id, userId, productId, rating, content

Hỗ trợ thông tin thanh toán chuyển khoản

- **PaymentTransaction** (Đây là payload mà cổng thanh toán bắn cho mình khi có 1 ai đó chuyển khoản
vào bank mình): id, gateway, transactionDate, accountNumber, code, body, ...

Chức năng nhắn tin
- **Message** : id, fromUserId, toUserId, content, isRead

FAQ
1. Tại sao cần tạo bảng **VerificationCode** mà ko gọp vào bảng **User** ?
 => Liên quan đến folow đăng ký tài khoản

Tôi muốn verify email trước khi người dùng nhấn submit đăng ký tài khoản, điều này giúp tránh được email
rác , cũng như là xung đột email giữa các user.