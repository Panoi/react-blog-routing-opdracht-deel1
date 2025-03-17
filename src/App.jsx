import './App.css'
import logo from './assets/logo-white.png'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/homePage/Home.jsx";
import Blogs from "./pages/blogsOverview/Blogs.jsx";
import CreateBlog from "./pages/createBlog/CreateBlog.jsx";
import PageNotFound from "./pages/pageNotFound/PageNotFound.jsx";
import Navigation from "./components/navigation/Navigation.jsx";
import BlogDetails  from "./pages/blogDetails/BlogDetails.jsx";
import {useState} from "react";


function App() {

const [isAuth, setIsAuth] = useState(false);

    return (

        <div className="page-container">
            <Navigation />
            {/*<img src={logo} alt="Company logo"/>*/}
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/create-blog" element={<CreateBlog setIsAuth={setIsAuth} isAuth={isAuth} />} />
                <Route path="/blogs" element={isAuth ? <Blogs /> : <Navigate to="/create-blog" />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/blogs/:id" element={<BlogDetails />} />
            </Routes>

        </div>
    )
}


export default App
