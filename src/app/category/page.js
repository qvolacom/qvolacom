import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CategoryLayout from '../layouts/CategoryLayout';

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <CategoryLayout></CategoryLayout>
      <Footer></Footer>
    </main>
  );
}
