import Layout from './Components/Layout';
import Navi from './Components/Navi';
import Login from './Pages/Login';
import PostDetail from './Pages/PostDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Pages/Register';
import { BlogProvider } from './Context/BlogContext';
import ProfilePage from './Pages/ProfilePage';
import HomePage from './Pages/HomePage';
import axios from 'axios';


function App() {


  return (
   
      <BrowserRouter>
        <BlogProvider>
          <Navi />
          <Routes>
            <Route exact path="/*" element={<HomePage/>} />
            <Route path='/layout' element={<Layout/>}/>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile" element={<ProfilePage />} />            
          </Routes>
        </BlogProvider>
      </BrowserRouter>

  );
}

export default App;
