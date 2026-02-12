document.addEventListener('DOMContentLoaded', function () {
	const burger = document.querySelector('.burger')
	const nav = document.querySelector('.header__nav')
	const overlay = document.querySelector('.menu-overlay')
	const closeBtn = document.querySelector('.menu-close')
	const body = document.body

	// Открытие меню
	burger?.addEventListener('click', function () {
		burger.classList.toggle('active')
		nav.classList.toggle('active')
		overlay?.classList.toggle('active')
		body.style.overflow = 'hidden'
	})

	// Закрытие через кнопку X
	closeBtn?.addEventListener('click', closeMenu)

	// Закрытие через overlay
	overlay?.addEventListener('click', closeMenu)

	// Закрытие через ссылки
	document.querySelectorAll('.header__link').forEach(link => {
		link.addEventListener('click', closeMenu)
	})

	// Закрытие через ESC
	document.addEventListener('keydown', e => {
		if (e.key === 'Escape' && nav?.classList.contains('active')) {
			closeMenu()
		}
	})

	function closeMenu() {
		burger?.classList.remove('active')
		nav?.classList.remove('active')
		overlay?.classList.remove('active')
		body.style.overflow = ''
	}
})
