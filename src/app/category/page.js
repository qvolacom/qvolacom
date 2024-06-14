import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import CategoryLayout from '../layouts/CategoryLayout';

export const metadata = {
  title: "Quevolacom - Category",
  description: "Check all our products category",
};

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <CategoryLayout></CategoryLayout>
      <Footer></Footer>
    </main>
  );
}
