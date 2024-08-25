![Matchquest banner](https://raw.githubusercontent.com/zuydd/image/main/match-quest.jpg)

# Tool Auto Match Quest NodeJS by ZuyDD

**Tool phát triển và chia sẻ miễn phí bởi ZuyDD**

<a href="https://www.facebook.com/zuy.dd"><img src="https://raw.githubusercontent.com/zuydd/image/main/facebook.svg" alt="Facebook"></a>
<a href="https://t.me/zuydd"><img src="https://raw.githubusercontent.com/zuydd/image/main/telegram.svg" alt="Telegram"></a>

> [!WARNING]
> Mọi hành vi buôn bán tool dưới bất cứ hình thức nào đều không được cho phép!

## 🛠️ Hướng dẫn cài đặt

> Yêu cầu đã cài đặt NodeJS

- Bước 1: Tải về phiên bản mới nhất của tool [tại đây ⬇️](https://github.com/zuydd/match-quest/archive/refs/heads/main.zip)
- Bước 2: Giải nén tool
- Bước 3: Tại thư mục tool vừa giải nén, chạy lệnh `npm install` để cài đặt các thư viện bổ trợ

## 💾 Cách thêm dữ liệu tài khoản

> Tool hỗ trợ cả `user` và `query_id` (khuyến khích dùng user)

> Tất cả dữ liệu mà bạn cần nhập đều nằm ở các file trong thư mục 📁 `src / data`

- [users.txt](src/data/users.txt) : chứa danh sách `user` hoặc `query_id` của các tài khoản, mỗi dòng ứng với một tài khoản
- [proxy.txt](src/data/proxy.txt) : chứa danh sách proxy, proxy ở mỗi dòng sẽ ứng với tài khoản ở dòng đó trong file users.txt phía trên, để trống nếu không dùng proxy
- [token.json](src/data/token.json) : chứa danh sách token được tạo ra từ `user` hoặc `query_id`. Có thể copy token từ các phiên bản cũ hoặc tool khác qua file này (miễn cùng format) để chạy.

> Định dạng proxy: http://user:pass@ip:port

> Lưu ý: `user` và `query_id` chỉ có thời gian sống (có thể get token) trong tầm vài ngày, `token` có thời gian sống 7 ngày. Vậy nên nếu nhận được thông báo đăng nhập thất bại, hãy lấy mới lại `user` hoặc `query_id`

## >\_ Các lệnh và chức năng tương ứng

| Lệnh            | Chức năng                                                                                                                                 |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run start` | Dùng để chạy farming/claim, làm nhiệm vụ, trả lời quiz, chơi game, dùng boost, claim điểm invite,.... tóm lại game có gì là nó làm cái đó |

## 🕹️ Các tính năng có trong tool

- tự động tạo tài khoản nếu chưa tạo
- tự động làm nhiệm vụ
- tự động farming/claim khi tới giờ
- tự động chơi game
- tự động dùng boost. Lưu ý đối với daily boost bạn có thể bật/tắt trạng thái sử dụng bằng cách tìm biến `this.useDailyBooster = true` trong file [reward.js](src/services/reward.js) sửa `true` thành `false` nếu bạn không muốn dùng boost
- tự động trả lời quiz
- claim điểm invite
- nhận diện proxy tự động, tự động kết nối lại proxy khi bị lỗi. ae ai chạy proxy thì thêm vào file proxy.txt ở dòng ứng với dòng chứa acc muốn chạy proxy đó, acc nào không muốn chạy proxy thì để trống hoặc gõ skip vào
- đa luồng chạy bao nhiêu acc cũng được, không bị block lẫn nhau

## 🔄 Lịch sử cập nhật

> Phiên bản mới nhất: `v0.0.2`

<details>
<summary>v0.0.2 - 📅 25/08/2024</summary>
  
- Thêm sẵn thư mục data
</details>
<details>
<summary>v0.0.1 - 📅 25/08/2024</summary>
  
- Chia sẽ tool đến cộng đồng
</details>

## 🎁 Donate

Chúng tôi rất vui được chia sẻ các mã script và tài nguyên mã nguồn miễn phí đến cộng đồng làm airdrop. Nếu bạn thấy các công cụ và tài liệu của chúng tôi hữu ích và muốn ủng hộ chúng tôi tiếp tục phát triển và duy trì các dự án này, bạn có thể đóng góp hỗ trợ qua hình thức donate.

Mỗi đóng góp của bạn sẽ giúp chúng tôi duy trì chất lượng dịch vụ và tiếp tục cung cấp những tài nguyên giá trị cho cộng đồng làm airdrop. Chúng tôi chân thành cảm ơn sự hỗ trợ và ủng hộ của bạn!

Mãi iu 😘😘😘

<div style="display: flex; gap: 20px;">
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-momo.png" alt="QR Momo" height="340" />
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-binance.jpg" alt="QR Binance" height="340" />
</div>