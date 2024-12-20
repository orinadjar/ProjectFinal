import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeVideo from "./components/WelcomeVideo";

const App = () => {
  return (
    <>
      <WelcomeVideo videoSrc="/WalcomeVid.mp4" />
      <Header/>
      <main className='py-3'>
        <Container>
          <Outlet/>
        </Container>
      </main>
      <Footer/>
    </>

  )
}

export default App