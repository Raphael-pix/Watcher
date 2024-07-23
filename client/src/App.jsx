import { Routes,Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import FilmDetails from './pages/film-details/film-details';
import Header from './components/header-section/Header';
import Footer from './components/footer/footer';
import MoviesPages from './pages/movies-page/movies';
import TvShowsPages from './pages/tv-shows-pages/tv';
import Login from './pages/forms/signin';
import Signup from './pages/forms/signup';
import { useContext } from 'react';
import { GlobalContext } from './context/context';

function App() {

  const location = useLocation()
  const{theme}=useContext(GlobalContext)
  const isAuthRoute = location.pathname === '/accounts/login' || location.pathname === '/accounts/create-account';
  
  return (
    <div className="App" data-theme={theme}>
      {
        isAuthRoute ?
        <Routes>
          <Route path={'/accounts/login'} element={<Login/>}/>
          <Route path={'/accounts/create-account'} element={<Signup/>}/>
        </Routes>
        :
        <>
      <Header className="header-section"/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path={'info/:film/:id'} element={<FilmDetails/>}/>
        <Route path='movies' element={<MoviesPages/>}/>
        <Route path='tv-shows' element={<TvShowsPages/>}/>
        <Route path={'movies/info/:film/:id'} element={<FilmDetails/>}/>
        <Route path={'tv-shows/info/:film/:id'} element={<FilmDetails/>}/>
      </Routes>
      <Footer className='footer-section'/>
      </>
      }
    </div>
  );
}

export default App;
