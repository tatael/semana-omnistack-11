const connection = require('../database/connection')

module.exports = {
	async index(request, response) {
		const ongId = request.headers.authorization
		const incidents = await connection("incidents")
			.where("ongId", ongId)
			.select("*")

		return response.json(incidents)
	}
}