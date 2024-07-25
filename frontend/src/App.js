
import react, { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import Home from './components/home/Home'
import About from './components/aboutUs/About'
import Signup from './components/signup/Signup'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signin from './components/signup/Signin'
import Todo from './components/todo/Todo';
import { useDispatch } from "react-redux";
import { authActions } from './store'

const App = () =>{
  const dispatch = useDispatch();
  useEffect(()=>{
    const id = (sessionStorage.getItem("id"))
    if(id)dispatch(authActions.login())
  },[])
  return <div>
    <Router>
      <Navbar/>
        <Routes>
          <Route exact path='/' element = {<Home/>}></Route>
          <Route  path='/about' element = {<About/>}></Route>
          <Route path='/signup' element = {<Signup/>}></Route>
          <Route path='/signin' element = {<Signin/>}></Route>
          <Route path='/todo' element = {<Todo/>}></Route>
        </Routes>
    </Router>
    <Footer/>
  </div>

}

export default App;