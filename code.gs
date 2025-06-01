function autoForwardNetflixEmails() {
  const sender = "info@account.netflix.com";  // Địa chỉ email cần forward
  const subjectKeyword = "[NETFLIX][AI] New devices access";
  const forwardTo = ["test@gmail.com"]; // Cho list email vào đây

  // Tìm email mới từ người gửi và có tiêu đề phù hợp
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
