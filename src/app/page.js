import '../app/styles/fonts.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import CategoryLayout from '../app/layouts/CategoryLayout';
import Slider from '../components/Slider';
import Stripe from '../components/Stripe';

export const metadata = {
  title: "Quevolacom",
  description: "Welcome to Quevolacom.com home page",
};

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
