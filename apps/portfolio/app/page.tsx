import Hero from '../components/sections/Hero'
import EngineeringPillars from '../components/sections/EngineeringPillars'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'
import Trusted from '../components/sections/Trusted'

export default function Home() {
	return (
		<div className='flex flex-col'>
			<Hero />
			<EngineeringPillars />
			<FeaturedProjects />
			<Trusted />
			<Services />
			<Testimonials />
		</div>
	)
}
