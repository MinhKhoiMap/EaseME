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
import Loader from "./components/Loader/Loader";
import Community from "./pages/Community/Community";

// Test
import av from "./assets/images/avatarTest.png";
import av1 from "./assets/images/wallpaper.jpg";
import TestComp from "./components/TestComp/TestComp";

const token_test =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91c2VyIjoiNjRhNmQ2Y2ZhMzkyMmQ1ZDQ3Y2NkNDY4IiwiaWF0IjoxNjkwNzY4NDc5fQ.nk0gDmaSiKEqROe90V0ceiA7Ioef7dqXviHWy4S9gEo";

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
      <Routes>
        <Route path="" element={<MainPageLayout />}></Route>
        <Route path="login" element={<Login />} />
        <Route path="survey" element={<Survey />} />
        <Route path="book" element={<Book pageContentArr={[]} />} />
        <Route path="page" element={<MainPageLayout />}>
          <Route path="profile" exact element={<Profile />} />
          <Route path="community/:id_tag" element={<Community />} />
          <Route path="community" element={<Community />} />
        </Route>
      </Routes>
      {showLoader && <Loader />}
    </div>
  );
}

export default App;
