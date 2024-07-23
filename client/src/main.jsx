import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import GlobalState from './context/context';
import { SkeletonTheme } from 'react-loading-skeleton';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SkeletonTheme baseColor="var(--skeleton-loader-base)" highlightColor="var(--skeleton-loader-highlight)" width={100}>
    <BrowserRouter>
      <GlobalState> <App /></GlobalState>
    </BrowserRouter>
  </SkeletonTheme>
);
