import { Fragment } from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Home from "./components/main/Home";
import Header from "./components/main/Header";
import Footer from "./components/main/Footer";
import FlowerList from "./components/flower/FlowerList";
import FlowerDownList from "./components/flower/FlowerDownList";
import FlowerDetail from "./components/flower/FlowerDetail";
import BoardList from "./components/board/BoardList";
import BoardDetail from "./components/board/BoardDetail";
import BoardInsert from "./components/board/BoardInsert";
import BoardUpdate from "./components/board/BoardUpdate";
import BoardDelete from "./components/board/BoardDelete";
import FlowerStore from "./components/flower/FlowerStore";
function App() {
  return(
    <Fragment>
    <Router>
      <Header/>
      <Routes>
        <Route path={"/"} element={<Home/>}/>
        <Route path={"/flower/list"} element={<FlowerList/>}/>
        <Route path={"/flower/down/list/:cateMinor"} element={<FlowerDownList/>}/>
        <Route path={"/flower/detail/:fno"} element={<FlowerDetail/>}/>
        <Route path={"/board/list"} element={<BoardList/>}/>
        <Route path={"/board/detail/:no"} element={<BoardDetail/>}/>
        <Route path={"/board/insert"} element={<BoardInsert/>}/>
        <Route path={"/board/update/:no"} element={<BoardUpdate/>}/>
        <Route path={"/board/delete/:no"} element={<BoardDelete/>}/>
        <Route path={"/flower/store"} element={<FlowerStore/>}/>
      </Routes>
      <Footer/>
    </Router>
   </Fragment>
  )

}

export default App;
