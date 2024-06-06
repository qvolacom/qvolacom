import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProductLayout from '../layouts/ProductsLayout';

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <ProductLayout></ProductLayout>
      <Footer></Footer>
    </main>
  );
}
