import Header from './components/Header';
import Footer from './components/Footer';
import { Routes, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import Subs from './pages/Subs';
import SubById from './pages/SubById';
// import Regsitration from './pages/Auth';
import Err from './pages/Err';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';

function App() {

  return (
    <div>
      <UserProvider>
        <Header />
        <Routes>
          <Route exact path="/" element={<IndexPage />} />
          <Route path='/subs' element={<Subs />} />
          <Route path='/subs/:id' element={<SubById />} />
          {/* <Route path='/twitch-auth' element={<Regsitration />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<Err />} />
        </Routes>
        <Footer />
      </UserProvider>
    </div>
  );
}

export default App;
