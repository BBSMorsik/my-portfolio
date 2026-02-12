const links = document.querySelectorAll('.header__link')
const btn = document.querySelector('.hero__btn--contact')

const allLinks = btn ? [...links, btn] : [...links]
allLinks.forEach(link => {
	link.addEventListener('click', event => {
		const id = link.getAttribute('href')
		if (!id.startsWith('#')) {
			return
		}

		event.preventDefault()

		const section = document.querySelector(id)
		if (section) {
			seamless.scrollIntoView(section, {
				behavior: 'smooth',
				block: 'start',
				inline: 'center',
			})
		}
	})
})
