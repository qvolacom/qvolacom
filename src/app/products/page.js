import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ProductLayout from '../../app/layouts/ProductsLayout';

export const metadata = {
  title: "Quevolacom - Products",
  description: "All Our Products",
};

export default function Home() {
  return (
    <main>
      <NavBar></NavBar>
      <ProductLayout></ProductLayout>
      <Footer></Footer>
    </main>
  );
}
