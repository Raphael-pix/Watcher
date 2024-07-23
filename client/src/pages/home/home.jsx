import './home.css'
import Hero from '../../components/hero-section/Hero';
import Row from '../../components/rows/Row-Home'
import requests from '../../utils/request';
import Trending from '../../components/trending/trending';

export default function Home() {
  return (
    <div className="home-container">  
      <Hero className="hero-section" url={requests.fetchPopular}/>
      <Trending/>
      <Row title="latest" url={requests.fetchLatest}/>
      <Row title="Top Rated" url={requests.fetchTopRated}/>
    </div>
  );
}

