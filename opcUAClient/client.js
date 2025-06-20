const opcua = require("node-opcua");
const axios = require("axios");

// OPC UA server của PLC Turck
const endpointUrl = "opc.tcp://192.168.1.60:4840"; // 🔁 Đổi IP theo PLC thật

// Tạo OPC UA client
const client = opcua.OPCUAClient.create({});
const sessionTimeout = 5000;

async function main() {
  try {
    // Kết nối OPC UA
    await client.connect(endpointUrl);
    console.log("✅ Đã kết nối tới PLC:", endpointUrl);

    // Tạo session (nếu PLC yêu cầu user/pass thì thêm ở đây)
    const session = await client.createSession();
    console.log("✅ Phiên làm việc được tạo!");

    // NodeId cần đọc từ PLC (kiểm tra đúng từ Codesys export ra)
    const nodeId1 = "ns=4;s=|var|TBEN-L4-PLC-11.Application.PLC_PRG.number1";
    const nodeId2 = "ns=4;s=|var|TBEN-L4-PLC-11.Application.PLC_PRG.number2";

    // Hàm đọc và gửi dữ liệu
    async function readAndSend() {
      try {
        const [data1, data2] = await Promise.all([
          session.readVariableValue(nodeId1),
          session.readVariableValue(nodeId2)
        ]);

        const number1 = data1.value.value;
        const number2 = data2.value.value;

        console.log("📥 Giá trị đọc từ PLC:", number1, number2);

        // Gửi dữ liệu lên backend
        const payload = { number1, number2 };

        axios.post("https://opcua1.onrender.com/data", payload)
          .then(res => console.log("📤 Gửi thành công:", res.data))
          .catch(err => console.error("❌ Lỗi gửi dữ liệu:", err.message));

      } catch (readErr) {
        console.error("❌ Lỗi khi đọc dữ liệu từ PLC:", readErr.message);
      }
    }

    // Đọc và gửi mỗi 5 giây
    setInterval(readAndSend, 5000);

  } catch (err) {
    console.error("❌ Lỗi kết nối hoặc tạo session:", err.message);
  }
}

// Bắt đầu chương trình
main();
