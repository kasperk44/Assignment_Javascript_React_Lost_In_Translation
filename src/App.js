import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LoginView from './components/views/LoginView';
import TranslationView from './components/views/TranslationView';
import ProfileView from './components/views/ProfileView';
import Navbar from './components/Navbar/Navbar';

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={ <LoginView /> } />
          <Route path="/translation" element={ <TranslationView /> } />
          <Route path="/profile" element={ <ProfileView /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
