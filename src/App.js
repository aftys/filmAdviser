import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import StarRating from './components/StarRating/StartRating';
import LogIn from './components/Login';
import SignUp from './components/SignUp';
import AddComment from './components/Comment/AddComment';


function App() {
  return (
    <div className="App">
        <Router>
          <Header /> 
            <Routes>
                <Route index element={<Home />}></Route>
                <Route path="movie/:id" element={<Movie />}></Route>
                <Route path="/test" element={<AddComment />}></Route>
                <Route path="movies/:type" element={<MovieList />}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
                <Route path="/rate" element={<StarRating/>}></Route>
                <Route path="/LogIn" element={<LogIn/>}></Route>
                <Route path="/SignUp" element={<SignUp/>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
