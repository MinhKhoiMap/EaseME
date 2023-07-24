// Import libraries
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

// Import services
import userService from "./services/user.service";

// Import redux utilities
import { retrieveUser } from "./redux/slices/userSlice";

// Import styles
import "./App.css";

// Import components
import TopNavBar from "./components/TopNavBar/TopNavBar";
import Login from "./pages/Login/Login";
import Survey from "./pages/Survey/Survey";
import Book from "./components/Book/Book";
import MainPageLayout from "./components/MainPageLayout/MainPageLayout";
import Profile from "./pages/Profile/Profile";
import MyDiary from "./pages/MyDiary/MyDiary";
import Loader from "./components/Loader/Loader";

// Test
import av from "./assets/images/avatarTest.png";
import av1 from "./assets/images/wallpaper.jpg";
import TestComp from "./components/TestComp/TestComp";

const token_test =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhOTgzOTU1YTEyZTgyMDliZTEzNDk1IiwiaWF0IjoxNjg4ODMyNTEwfQ.udvfx_bFvQFffxeVoMhwQKMhUjXOcoY_0TorTGBwyqU";

function App() {
  const dispatch = useDispatch();

  const [showLoader, setShowLoader] = useState(false);

  const userProfileQuery = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      setShowLoader(true);
      return userService.loginWithToken(token_test);
    },
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (!userProfileQuery.isLoading) {
      setShowLoader(false);
    }
    if (userProfileQuery.isSuccess) {
      dispatch(retrieveUser(userProfileQuery.data.data.user));
    }
  }, [userProfileQuery.fetchStatus]);

  /* ************ Render JSX ************ */
  return (
    <div className="App">
      <TopNavBar />
      <Routes>
        {/* <Route path="/" element={<Loader />} /> */}
        <Route path="login" element={<Login />} />
        <Route path="survey" element={<Survey />} />
        <Route
          path="book"
          element={
            <Book
              pageContentArr={[
                {
                  content:
                    "Cuộc sống không phải là cứ không thích chương nào là bỏ qua chương đó. Bạn sẽ phải đọc từng dòng một, gặp từng người một. Dĩ nhiên không phải chương nào cũng làm bạn vui. Cũng có những chương làm bạn khóc suốt mấy tuần lận. Bạn sẽ phải đọc những thứ bạn không muốn, nhưng cũng sẽ có những khoảnh khắc mà bạn chẳng muốn chúng kết thúc một chút nào. Nhưng bạn vẫn sẽ phải bước tiếp. Tiếp tục để thế giới được vận hành. Hãy sống cuộc đời của riêng bạn, đừng bỏ lỡ bất cứ điều gì",
                  date: "12/4/2033",
                },
                { content: "hehehe2", date: "13/4/2033" },
                {
                  content:
                    "Cuộc sống không phải là cứ không thích chương nào là bỏ qua chương đó. Bạn sẽ phải đọc từng dòng một, gặp từng người một. Dĩ nhiên không phải chương nào cũng làm bạn vui. Cũng có những chương làm bạn khóc suốt mấy tuần lận. Bạn sẽ phải đọc những thứ bạn không muốn, nhưng cũng sẽ có những khoảnh khắc mà bạn chẳng muốn chúng kết thúc một chút nào. Nhưng bạn vẫn sẽ phải bước tiếp. Tiếp tục để thế giới được vận hành. Hãy sống cuộc đời của riêng bạn, đừng bỏ lỡ bất cứ điều gì",
                  date: "14/4/2033",
                },
                { content: "hehehe4", date: "15/4/2033" },
                { content: "hehehe5", date: "16/4/2033" },
              ]}
            />
          }
        />
        <Route path="page" element={<MainPageLayout />}>
          <Route path="" element={<MyDiary />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
      {showLoader && <Loader />}
    </div>
  );
}

export default App;
