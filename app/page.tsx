import Hero from '../components/sections/Hero'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'
import Trusted from '../components/sections/Trusted'
import BroadcastTeaser from '../components/sections/BroadcastTeaser'

export default function Home() {
	return (
		<>
			<Hero />
			<Trusted />
			<BroadcastTeaser />
			<Services />
			<Testimonials />
		</>
	)
}
