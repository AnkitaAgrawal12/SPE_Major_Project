import './App.css';
import BlogPage from './Pages/BlogPage';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import LoginPage from './Pages/LoginPage';
import ProfilePage from './Pages/ProfilePage';
import MainPage from './Pages/MainPage';
import HomePage from './Pages/HomePage';
import NewPost from './Pages/NewPost';
import ContactPage from './Pages/ContactPage';

function App() {
  
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path = "/" element={<Navigate to='/login' exact /> }/>
      <Route exact path='/login' element={<LoginPage/>} />
      <Route exact path='/homepage' element={<HomePage/>} />
      <Route exact path='/newpost' element={<NewPost/>} />
      <Route exact path='/blogpage' element={<BlogPage/>} />
      <Route exact path='/signup' element={<SignUp/>} />
      <Route exact path='/mainpage' element={<MainPage/>} />
      <Route exact path='/profilepage' element={<ProfilePage/>} />
      <Route exact path='/contactpage' element={<ContactPage/>} />
      </Routes>
      </Router>
      </div>
  );
}

export default App;
