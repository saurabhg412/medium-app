import { BrowserRouter, Route, Routes } from "react-router-dom"
import Signin from "./pages/Signin"
import {Post} from "./pages/Post"
import { UpdatedUser } from "./pages/Update"
import Publish from "./pages/publish"
import Posts from "./pages/Posts"
import Postid from "./pages/Postid"
import Signup from "./pages/Signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/update" element={<UpdatedUser/>}></Route>
        <Route path="/post" element={<Post/>}></Route>
        <Route path="/posts" element={<Posts/>}></Route>
        <Route path="/post/:id" element={<Postid/>}></Route>
        <Route path="/publish" element={<Publish/>}></Route>
        <Route path="/update/:id" element={<UpdatedUser/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
