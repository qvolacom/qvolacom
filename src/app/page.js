import '../app/styles/fonts.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer';
import CategoryLayout from '../app/layouts/CategoryLayout';
import Slider from '../components/Slider'
import Head from 'next/head';

export default function Home() {
  return (
    <main title='Home'>
      <NavBar></NavBar>
      <Slider></Slider>
      <CategoryLayout></CategoryLayout>
      <Footer></Footer>
    </main>
  );
}
