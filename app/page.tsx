import Hero from '../components/sections/Hero';
import Services from '../components/sections/Services';
import Testimonials from '../components/sections/Testimonials';
import Trusted from '../components/sections/Trusted';

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