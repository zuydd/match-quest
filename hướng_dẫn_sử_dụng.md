** Link cập nhật tool và hướng dẫn chi tiết tại **
https://github.com/zuydd/match-quest

**_ Hướng dẫn cài đặt _**

- B1: Tải và giải nén tool
- B2: Chạy lệnh: npm install để cài đặt thư viện bổ trợ
- B3: vào thư mục src -> data, nhập user hoặc query_id vào file users.txt và proxy vào file proxy.txt, không có proxy thì bỏ qua khỏi nhập

**_ Các lệnh chức năng chạy tool _**

- npm run start: dùng để chạy farming/claim, làm nhiệm vụ, trả lời quiz, chơi game, dùng boost, claim điểm invite.... tóm lại game có gì là nó làm cái đó

🕹️ Các tính năng có trong tool:

- tự động tạo tài khoản nếu chưa tạo
- tự động làm nhiệm vụ
- tự động farming/claim khi tới giờ
- tự động chơi game
- tự động dùng boost
- tự động trả lời quiz
- claim điểm invite
- nhận diện proxy tự động, tự động kết nối lại proxy khi bị lỗi. ae ai chạy proxy thì thêm vào file proxy.txt ở dòng ứng với dòng chứa acc muốn chạy proxy đó, acc nào không muốn chạy proxy thì để trống hoặc gõ skip vào
- đa luồng chạy bao nhiêu acc cũng được, không bị block lẫn nhau

⚠️ Lưu ý:

- Nếu gặp lỗi Request failed with status code 503 thì đó là do server của matchquest nó lỏ chứ không phải lỗi tool
- Nếu gặp lỗi đăng nhập không thành công, hãy thử xoá token và lấy lại user hoặc query_id mới
