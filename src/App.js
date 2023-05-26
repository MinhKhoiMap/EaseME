import React from "react";
import "./App.css";
import Login from "./pages/Login/Login";
import Survey from "./pages/Survey/Survey";

import { Routes, Route } from "react-router-dom";
import NotePage from "./pages/NotePage/NotePage";
import Book from "./components/Book/Book";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/note" element={<NotePage />} />
        <Route
          path="/book"
          element={
            <Book
              pageContentArr={[
                {
                  content:
                    "Cuộc sống không phải là cứ không thích chương nào là bỏ qua chương đó. Bạn sẽ phải đọc từng dòng một, gặp từng người một. Dĩ nhiên không phải chương nào cũng làm bạn vui. Cũng có những chương làm bạn khóc suốt mấy tuần lận. Bạn sẽ phải đọc những thứ bạn không muốn, nhưng cũng sẽ có những khoảnh khắc mà bạn chẳng muốn chúng kết thúc một chút nào. Nhưng bạn vẫn sẽ phải bước tiếp. Tiếp tục để thế giới được vận hành. Hãy sống cuộc đời của riêng bạn, đừng bỏ lỡ bất cứ điều gì",
                  date: "12/4/2033",
                },
                { content: "hehehe2", date: "12/4/2033" },
                {
                  content:
                    "Cuộc sống không phải là cứ không thích chương nào là bỏ qua chương đó. Bạn sẽ phải đọc từng dòng một, gặp từng người một. Dĩ nhiên không phải chương nào cũng làm bạn vui. Cũng có những chương làm bạn khóc suốt mấy tuần lận. Bạn sẽ phải đọc những thứ bạn không muốn, nhưng cũng sẽ có những khoảnh khắc mà bạn chẳng muốn chúng kết thúc một chút nào. Nhưng bạn vẫn sẽ phải bước tiếp. Tiếp tục để thế giới được vận hành. Hãy sống cuộc đời của riêng bạn, đừng bỏ lỡ bất cứ điều gì",
                  date: "12/4/2033",
                },
                { content: "hehehe4", date: "12/4/2033" },
                { content: "hehehe5", date: "12/4/2033" },
              ]}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
