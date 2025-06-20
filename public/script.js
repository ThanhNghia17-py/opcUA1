const apiURL = "https://opcua-2.onrender.com/data"; // đổi thành đúng backend bạn

function fetchData() {
  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("number1").textContent = data.number1;
      document.getElementById("number2").textContent = data.number2;
    })
    .catch((err) => {
      console.error("Lỗi khi lấy dữ liệu từ server:", err);
    });
}

// Gọi mỗi 3 giây
setInterval(fetchData, 3000);

// Gọi lần đầu
fetchData();
