# Gửi Email

Email sử dụng giao thức SMTP, IMAP, POP3 để gửi và nhận email. Nó khác với giao thức HTTP
mà chúng ta lướt web hàng ngày.

Vì vậy để gửi email người ta có 2 giải pháp

## 1. Tự build một Service riêng để gửi email

Cách này rất tốn thời gian, chi phí và ko hiệu quả. Vì dễ bị các hệ thống email như
Gmail, Yahoo, Outlook,... chặn do ko đáp ứng các tiêu chuẩn an toàn, chống spam, ...

## 2. Sử dụng dịch vụ của các cty cung cấp dịch vụ như AWS SES, SendGrid, Mailgun, Resend, ...

Cách này hiệu quả hơn, chi phí thấp hơn, dễ sử dụng , hỗ trợ nhiều tính năng như gửi email theo
hàng loạt , theo dõi email, chống spam,...

Với cách này thường có 2 mode

- **Sandbox mode** : chỉ cho phép gửi email đến email đã xác nhận trước

- **Production mode** : cho phép gửi email đến bất kỳ email nào. Đòi hỏi xác minh tên miền, tài khoản,...

Đây cũng là cách mà thực tế các cty dùng nhiều nhất(vì nó siêu sẽ)

Tôi sẽ dùng Resend để gửi email thay vì dùng Node-mailer

Vì Resend dạo gần đây hot, dễ dùng, UI và UX number one

Nếu ko thích Resend có thể dùng AWS SES, ...
