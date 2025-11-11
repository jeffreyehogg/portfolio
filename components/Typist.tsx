import { Component } from 'react'
import Typist from 'react-typist'

export default class MyComponent extends Component {
	render() {
		return (
			<Typist>
				<span className='text-indigo-200'>Programmer</span>
				<Typist.Backspace count={10} delay={200} />
				<span className='text-indigo-200'>Web Developer</span>
				<Typist.Backspace count={13} delay={200} />
				<span className='text-indigo-200'>Software Developer</span>
				<Typist.Backspace count={9} delay={200} />
				<span className='text-indigo-200'>Engineer</span>
			</Typist>
		)
	}
}
