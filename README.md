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
- hiển thị đếm ngược tới lần chạy tiếp theo, có thể tìm biến `IS_SHOW_COUNTDOWN = true` đổi thành `false` để tắt cho đỡ lag

## ♾ Cài đặt đa luồng

- Mặc định tool sẽ chạy đa luồng ứng với số tài khoản bạn nhập vào, không cần cài đặt thêm gì cả.
- Mặc định ở vòng lặp đầu tiên mỗi tài khoản (luồng) sẽ chạy cách nhau 30s để tránh spam request, có thể tìm biến `DELAY_ACC = 20` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp

## ❌ Chế độ thử lại khi lỗi

- Đỗi với lỗi kết nối proxy, hệ thống sẽ cố thử lại sau mỗi 30s, bạn có thể cài đặt giới hạn số lần thử lại bằng cách tìm biến `MAX_RETRY_PROXY = 20` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp (mặc định là 20). Khi quá số lần thử kết nối lại hệ thống sẽ dừng auto tài khoản đó và nghi nhận lỗi vào file [log.error.txt](src/data/log.error.txt)
- Đỗi với lỗi đăng nhập thất bại, hệ thống sẽ cố thử lại sau mỗi 60s, bạn có thể cài đặt giới hạn số lần thử lại bằng cách tìm biến `MAX_RETRY_LOGIN = 20` trong file [index.js](src/run/index.js) để điều chỉnh cho phù hợp (mặc định là 20). Khi quá số lần thử đăng nhập lại hệ thống sẽ dừng auto tài khoản đó và nghi nhận lỗi vào file [log.error.txt](src/data/log.error.txt)

## 🔄 Lịch sử cập nhật

> Khi cập nhật phiên bản mới chỉ cần copy thư mục 📁 [data](src/data) của bản cũ ghi đè lại ở bản mới là có thể chạy được mà không cần lấy lại data

> Phiên bản mới nhất: `v0.0.9`

<details>
<summary>v0.0.9 - 📅 15/09/2024</summary>
  
- Thêm đếm ngược đến lần chạy tiếp theo
- Thêm thông báo từ hệ thống và kiểm tra version
</details>
<details>
<summary>v0.0.8 - 📅 10/09/2024</summary>
  
- Fix lỗi không mua thêm 3 vé chơi game khi qua ngày mới
- Tăng số điểm nhận được khi chơi game từ random 110-150 thành 180-230 cho nó máu, ai sợ thì vô đổi lại nhé (game cho max 250)
- Fix lỗi không thể tạo tài khoản vì mã ref của mình đạt cmn nó giới hạn 5000 ref rồi nó không cho nhận thêm ref nữa 🤣🤣
</details>
<details>
<summary>v0.0.7 - 📅 08/09/2024</summary>
  
- Thêm cơ chế giới hạn số lần thử lại khi lỗi proxy/đăng nhập
- Ghi nhận lỗi vào file log khi thử lại quá số lần cài đặt để các bạn chạy nhiều acc tiện theo dõi
- Cập nhật chính xác số vé chơi game sau khi checkin
</details>
<details>
<summary>v0.0.6 - 📅 05/09/2024</summary>
  
- Fix lỗi SSL server (bản ổn định, đã nhận proxy)
- Lưu ý: cần chạy lại lệnh `npm install` trước khi start tool
</details>
<details>
<summary>v0.0.5 - 📅 05/09/2024</summary>
  
- Fix lỗi SSL server (bản tạm thời)
- Lưu ý: cần chạy lại lệnh `npm install`
</details>
<details>
<summary>v0.0.4 - 📅 03/09/2024</summary>
  
- Cập nhật lại hiển thị đúng số điểm claim reward khi dùng boost x2, x3
- Làm thêm các nhiệm vụ Matchain Ecosystem
</details>
<details>
<summary>v0.0.3 - 📅 26/08/2024</summary>
  
- Fix lỗi crash tool khi chơi game bị lỗi
</details>
<details>
<summary>v0.0.2 - 📅 25/08/2024</summary>
  
- Thêm sẵn thư mục data
</details>
<details>
<summary>v0.0.1 - 📅 25/08/2024</summary>
  
- Chia sẽ tool đến cộng đồng
</details>

> Khi cập nhập phiên bản mới chỉ cần copy các file trong folder data qua bản mới là có thể sử dụng mà không cần lấy lại dữ liệu

## 🎁 Donate

Chúng tôi rất vui được chia sẻ các mã script và tài nguyên mã nguồn miễn phí đến cộng đồng làm airdrop. Nếu bạn thấy các công cụ và tài liệu của chúng tôi hữu ích và muốn ủng hộ chúng tôi tiếp tục phát triển và duy trì các dự án này, bạn có thể đóng góp hỗ trợ qua hình thức donate.

Mỗi đóng góp của bạn sẽ giúp chúng tôi duy trì chất lượng dịch vụ và tiếp tục cung cấp những tài nguyên giá trị cho cộng đồng làm airdrop. Chúng tôi chân thành cảm ơn sự hỗ trợ và ủng hộ của bạn!

Mãi iu 😘😘😘

<div style="display: flex; gap: 20px;">
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-momo.png" alt="QR Momo" height="340" />
  <img src="https://raw.githubusercontent.com/zuydd/image/main/qr-binance.jpg" alt="QR Binance" height="340" />
</div>
