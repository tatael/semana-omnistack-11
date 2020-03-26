const express = require('express')
const crypto = require('crypto')
const routes = express.Router()
const connection = require('./database/connection')

function getConnection(name) {
	return connection(name)
}

routes.post('/ongs', async (request, response) => {
	const { name, email, whatsapp, city, uf } = request.body
	const id = crypto.randomBytes(4).toString('HEX')
	const ongConnection = getConnection('ongs')
	
	await ongConnection.insert({
		id, name, email,
		whatsapp, city, uf
	})

	return response.json({ id })
})

module.exports = routes