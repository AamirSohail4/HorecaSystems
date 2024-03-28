import './scrollbutton.css'
import { Icon } from '@iconify/react';
import { useState,useEffect } from 'react'

export const ScrollButton = () => {
    const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		// Show/hide the button based on scroll position
		const handleScroll = () => {
			const scrollY = window.scrollY;
			setIsVisible(scrollY > 30);
		};

		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth', // for smooth scroll
		});
	};
  return (
    
    <>
			<Icon
				icon='mdi:arrow-up-bold'
				className={`Scrollbtn ${isVisible ? 'visible' : 'hide'}`}
				onClick={scrollToTop}
				id='scroll'
			/>
		</>
  )
}
