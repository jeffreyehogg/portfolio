import type { Metadata } from 'next'
import AboutMe from '../../components/AboutMe'

export const metadata: Metadata = {
  title: 'About Jeff Hogg',
  description: 'Learn about my experience as a software developer, including my work at Cisco on the Webex Control Hub Platform.',
}

export default function About() {
  return <AboutMe />
}