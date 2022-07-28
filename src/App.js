import Layout from './Components/Layout';
import Navi from './Components/Navi';
import Login from './Pages/Login';
import PostDetail from './Pages/PostDetail';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from './Pages/Register';
import { BlogProvider } from './Context/BlogContext';



function App() {
  return (
    <BrowserRouter>
      <BlogProvider>
        <Navi />
        <Routes>
          <Route path="/*" element={<Layout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />        
          <Route path="/post/:id" element={<PostDetail />}/>
        </Routes>
      </BlogProvider>
    </BrowserRouter>
  );
}

export default App;
