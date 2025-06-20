const axios = require("axios");

const data = {
  number1: 10,
  number2: 10
};

axios.post("https://opcua-2.onrender.com/data", data)
  .then(response => {
    console.log("✅ Đã gửi dữ liệu thành công:", response.data);
  })
  .catch(error => {
    console.error("❌ Lỗi khi gửi dữ liệu:", error.message);
  });
