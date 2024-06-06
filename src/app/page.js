import '../app/styles/fonts.css'
import NavBar from '../app/components/NavBar';
import Footer from './components/Footer';
import CategoryLayout from './layouts/CategoryLayout';
import Slider from '../app/components/Slider'

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <Slider></Slider>
      <CategoryLayout></CategoryLayout>
      <Footer></Footer>
    </main>
  );
}
