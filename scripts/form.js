;(function () {
	const form = document.querySelector('.contact-form')
	if (!form) return

	const validate = {
		name: value => {
			if (!value) return 'Name is required'
			if (value.length < 3 || value.length > 50)
				return 'Name must be between 3 and 50 characters'
			return ''
		},
		email: value => {
			if (!value) return 'Email is required'
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
				return 'Please enter a valid email address'
			return ''
		},
		subject: value => {
			if (!value) return 'Subject is required'
			if (value.length < 3) return 'Subject is too short'
			if (value.length > 80) return 'Subject is too long'
			return ''
		},
		message: value => {
			if (!value) return 'Message is required'
			if (value.length < 10) return 'Message is too short'
			if (value.length > 1000) return 'Message is too long'
			return ''
		},
	}

	function setError(input, message) {
		const error = input.closest('.form-group').querySelector('.error')
		error.textContent = message
		input.classList[message ? 'add' : 'remove']('error-input')
	}

	form.addEventListener('submit', function (e) {
		e.preventDefault()
		let hasErrors = false

		Object.keys(validate).forEach(name => {
			const input = this[name]
			const message = validate[name](input.value.trim())
			setError(input, message)
			if (message) hasErrors = true
		})

		if (!hasErrors) {
			const btn = document.querySelector('.submit-btn')
			btn.disabled = true
			btn.classList.add('loading')
			btn.textContent = 'Sending...'

			const formData = {
				userName: this.name.value.trim(),
				email: this.email.value.trim(),
				subject: this.subject.value.trim(),
				message: this.message.value.trim(),
			}

			fetch('https://jsonplaceholder.typicode.com/posts', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			})
				.then(res => res.json())
				.then(data => {
					console.log('Server response:', data)
					form.reset()
					Object.keys(validate).forEach(name => setError(this[name], ''))
					alert('Form submitted successfully!')
				})
				.catch(err => {
					console.error('Error sending form:', err)
					alert('An error occurred. Please try again.')
				})
				.finally(() => {
					btn.disabled = false
					btn.classList.remove('loading')
					btn.textContent = 'Submit'
				})
		}
	})

	Object.keys(validate).forEach(name => {
		const input = form[name]
		if (!input) return

		input.addEventListener('blur', () => {
			const message = validate[name](input.value.trim())
			setError(input, message)
		})

		input.addEventListener('input', function () {
			if (this.classList.contains('error-input')) {
				const message = validate[name](this.value.trim())
				setError(this, message)
			}
		})
	})
})()
