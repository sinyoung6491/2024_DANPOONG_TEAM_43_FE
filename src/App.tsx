import React, { useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Home from 'page/Home';
import Map from 'page/Map';
import Group from 'page/Group';
import Chats from 'page/Chats';
import MyPage from 'page/MyPage';
import Login from 'page/Login';
import KakaoLoginRedirect from 'page/KakaoLoginRedirect';
import Sign from 'page/Sign';
import Header from 'components/common/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Nav from 'components/Nav';
import ChatRoomMain from 'page/ChatRoomMain';
import ChatVolunteer from 'page/ChatVolunteer';
import ChatCareWorker from 'page/ChatCareWorker';
import RequestSure from 'page/RequestSure';
import RequestDetail from 'page/RequestDetail';
import RequestPay from 'page/RequestPay';
import PayDone from 'page/PayDone';
import Memory from 'page/Memory';
import AIContents from 'page/AIContents';

const queryClient = new QueryClient();

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      if (location.pathname === '/login' || location.pathname === '/kakao-login') {
        navigate('/');
      }
    } else {
      if (location.pathname !== '/login' && location.pathname !== '/kakao-login' && location.pathname !== '/signup') {
        navigate('/login');
      }
    }
  }, [location, navigate]);

  const showHeaderAndNav = !['/login', '/kakao-login', '/signup', '/chat-room','/chat-volunteer','/chat-volunteer','/chat-worker','/request-detail','/request-sure','/request-pay','/pay-done', '/Memory','/ai-contents'].includes(location.pathname);


  return (
    <>
    <QueryClientProvider client={queryClient}>
      {showHeaderAndNav && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/group" element={<Group />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kakao-login" element={<KakaoLoginRedirect />} />
        <Route path="/signup" element={<Sign />} />
        <Route path="/chat-room" element={<ChatRoomMain />} />
        <Route path="/chat-volunteer" element={<ChatVolunteer />} />
        <Route path="/chat-worker" element={<ChatCareWorker />} />
        <Route path="/request-sure" element={<RequestSure />} />
        <Route path="/request-detail" element={<RequestDetail />} />
        <Route path="/request-pay" element={<RequestPay />} />
        <Route path="/pay-done" element={<PayDone />} />
        <Route path="/Memory" element={<Memory />} />
        <Route path="/ai-contents" element={<AIContents />} />
      </Routes>
      {showHeaderAndNav && <Nav />}
      </QueryClientProvider>
    </>
  );
};

export default App;