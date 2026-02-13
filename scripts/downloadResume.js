const button = document.querySelector('.downloadCv')

button.addEventListener('click', () => {
	const link = document.createElement('a')
	link.href = 'img/CV.pdf'
	link.download = 'Morsik_CV.pdf'
	document.body.append(link)
	link.click()
	link.remove()
})
