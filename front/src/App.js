import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home/Home";
import Main from "pages/Main/Main";
import Login from "pages/User/Auth/Login";
import Register from "pages/User/Auth/Register";
import UserProfile from "pages/User/Profile/UserProfile";
import KakaoLoginHandler from "pages/User/Auth/KakaoLoginHandler";
import Header from "components/Header";
import Footer from "components/Footer";
import Loading from "components/Loading";
import TestHome from "pages/TestSheet/TestHome";
import TestResult from "pages/TestResult/TestResult";
import TrainingStepOne from "pages/Training/TrainingOne/TrainingStepOne";
import TrainingStepTwo from "pages/Training/TrainingTwo/TrainingStepTwo";
import TrainingStepThree from "pages/Training/TrainingThree/TrainingStepThree";
import TrainingStepFour from "pages/Training/TrainingFour/TrainingStepFour";
import Posts from "pages/Post/Posts";
import Post from "pages/Post/Post";
import Posting from "pages/Post/Posting";
import { useGetCurrentUser } from "queries/userQuery";
import ScrollToTop from "hooks/ScrollToTop";

function App() {
  const { isFetching } = useGetCurrentUser();

  if (isFetching) return <Loading />;

  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route
              path="/oauth/callback/kakao"
              element={<KakaoLoginHandler />}
            />
            <Route path="/main" element={<Main />} />
            <Route path="/training/1" element={<TrainingStepOne />} />
            <Route path="/training/2" element={<TrainingStepTwo />} />
            <Route path="/training/3" element={<TrainingStepThree />} />
            <Route path="/training/4" element={<TrainingStepFour />} />

            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<Post />} />
            <Route path="/post" element={<Posting />} />

            <Route path="/test" element={<TestHome />} />
            <Route path="/test/result" element={<TestResult />} />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
