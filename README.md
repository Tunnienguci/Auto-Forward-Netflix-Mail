# 📧 Gmail Auto Forward Script - Netflix Device Alert

Tự động forward email từ `info@account.netflix.com` nếu tiêu đề chứa `[NETFLIX][AI] New devices access`, và gửi đến một (hoặc nhiều) địa chỉ email phụ với **tiêu đề mail cố định**.

---

## ✅ Tính năng

- 🔍 Lọc email từ người gửi `info@account.netflix.com`
- 📨 Kiểm tra tiêu đề có chứa `[NETFLIX][AI] New devices access`
- 📤 Forward toàn bộ nội dung email đến danh sách người nhận
- 🏷️ Tiêu đề email forward là cố định: `[NETFLIX][AI] New devices access`
- ⭐ Tránh forward trùng lặp bằng cách đánh dấu email đã xử lý (gắn sao)

---

## 🛠 Cách cài đặt

### 1. Mở Google Apps Script

1. Truy cập: [https://script.google.com](https://script.google.com)
2. Chọn **"New project"**.

---

### 2. Thêm mã script

Dán đoạn mã sau vào `Code.gs`:

```javascript
function autoForwardNetflixEmails() {
  const sender = "info@account.netflix.com";
  const subjectKeyword = "[NETFLIX][AI] New devices access";
  const forwardTo = ["cnqtuannn@gmail.com"]; // Cập nhật danh sách email nhận

  const threads = GmailApp.search(`from:${sender} subject:"${subjectKeyword}" newer_than:1d`);

  for (const thread of threads) {
    const messages = thread.getMessages();
    for (const msg of messages) {
      if (!msg.isInInbox() || msg.isDraft() || msg.isStarred()) continue;

      const body = msg.getBody();
      for (const email of forwardTo) {
        GmailApp.sendEmail(email, "[NETFLIX][AI] New devices access", body, {
          htmlBody: body
        });
      }

      msg.star(); // Đánh dấu đã xử lý
    }
  }
}
```

---

### 3. Cấp quyền cho script

1. Nhấn nút **Run ▶** lần đầu để chạy `autoForwardNetflixEmails`
2. Google sẽ yêu cầu cấp quyền truy cập Gmail – bấm **Allow**

---

### 4. Tạo Trigger chạy tự động

1. Vào menu trái → **Triggers (biểu tượng đồng hồ)**
2. Bấm **"+ Add Trigger"**
3. Cài đặt:
   - Choose which function: `autoForwardNetflixEmails`
   - Choose which deployment: `Head`
   - Select event source: `Time-driven`
   - Select type of time-based trigger: e.g. `Every 15 minutes`

---

## 📌 Lưu ý

- Script chỉ forward **email mới trong 1 ngày gần nhất**
- Nếu bạn cần forward cũ hơn, có thể thay:  
  `newer_than:1d` ➜ `after:2024/12/01` hoặc bỏ luôn điều kiện thời gian
- Có thể thay đổi danh sách người nhận bằng cách cập nhật mảng:
  ```javascript
  const forwardTo = ["email1@gmail.com", "email2@gmail.com"];
  ```

---

## 📤 Ví dụ kết quả

- Gửi từ: `info@account.netflix.com`
- Tiêu đề gốc: `New login from unknown device`
- Email được gửi đi:
  - Tới: `test@gmail.com`
  - Tiêu đề: `[NETFLIX][AI] New devices access`
  - Nội dung: giữ nguyên nội dung HTML gốc

---

## ✅ Done!

Bạn đã thiết lập xong chức năng auto-forward email từ Netflix đến địa chỉ phụ với tiêu đề cố định.
