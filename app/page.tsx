import Hero from '../components/Hero';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Trusted from '../components/Trusted';

export default function Home() {
  return (
    <>
      <Hero />
      <Trusted />
      <Testimonials />
      <Services />
    </>
  );
}