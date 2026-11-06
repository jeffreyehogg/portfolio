import Hero from '../components/sections/Hero'
import EngineeringPillars from '../components/sections/EngineeringPillars'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import Trusted from '../components/sections/Trusted'

export default function Home() {
	return (
		<div className='flex flex-col'>
			<Hero />
			<FeaturedProjects />
			<EngineeringPillars />
			<Trusted />
		</div>
	)
}
