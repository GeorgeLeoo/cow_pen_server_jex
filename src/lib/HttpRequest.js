const axios = require('axios')

const instance = axios.create({
	baseURL: 'http://localhost:4500',
})

module.exports = instance
