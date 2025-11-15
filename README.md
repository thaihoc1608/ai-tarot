# Trải Bài Tarot 3 Lá

Một ứng dụng web tương tác để rút và giải nghĩa một trải bài Tarot ba lá, sử dụng Gemini AI để đưa ra luận giải. Khám phá quá khứ, hiện tại và tương lai của bạn thông qua những lá bài huyền bí.

## Cài đặt và Chạy dự án

Dự án này được xây dựng bằng React, TypeScript, và Vite.

### Yêu cầu
- [Node.js](https://nodejs.org/) (phiên bản 18.x trở lên được khuyến nghị)
- [npm](https://www.npmjs.com/) hoặc [yarn](https://yarnpkg.com/)

### Các bước cài đặt

1.  **Clone repository**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Cài đặt các dependency**
    Sử dụng npm:
    ```bash
    npm install
    ```
    Hoặc sử dụng yarn:
    ```bash
    yarn install
    ```

3.  **Cấu hình API Key**
    Bạn cần có một API Key từ Google AI Studio để sử dụng Gemini.

    - Tạo một file mới ở thư mục gốc của dự án và đặt tên là `.env`
    - Thêm nội dung sau vào file `.env`, thay thế `YOUR_API_KEY` bằng API key của bạn:
      ```
      VITE_API_KEY=YOUR_API_KEY
      ```
    *Lưu ý: File `.env` đã được thêm vào `.gitignore` để đảm bảo API key của bạn không bị đưa lên GitHub.*

4.  **Chạy development server**
    ```bash
    npm run dev
    ```
    Mở trình duyệt và truy cập vào địa chỉ `http://localhost:5173` (hoặc cổng khác nếu được chỉ định trong terminal).

### Các câu lệnh khác

-   **Build for production**:
    ```bash
    npm run build
    ```
    Lệnh này sẽ tạo một thư mục `dist` chứa các file tĩnh đã được tối ưu hóa để deploy.

-   **Preview production build**:
    ```bash
    npm run preview
    ```
    Lệnh này sẽ khởi động một server local để xem trước phiên bản đã được build.
