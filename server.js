const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Phục vụ frontend từ thư mục /public
app.use(express.static(path.join(__dirname, "public")));

// Biến lưu dữ liệu từ PLC
let latestData = { number1: "--", number2: "--" };

// Route lấy dữ liệu cho frontend
app.get("/data", (req, res) => {
  res.json(latestData);
});

// Route nhận dữ liệu từ OPC UA Client
app.post("/data", (req, res) => {
  latestData = req.body;
  console.log("📥 Dữ liệu nhận được:", latestData);
  res.json({ status: "received", data: latestData });
});

// Route gốc trả về index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`✅ Server đang chạy tại PORT: ${PORT}`);
});
