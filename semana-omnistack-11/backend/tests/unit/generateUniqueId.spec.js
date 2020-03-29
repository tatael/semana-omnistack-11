const generateUniqueId = require('../../src/utils/generateUniqueId')

describe('Generate Unique id', () => {
	it('should generate a unique id', () => {
		const id = generateUniqueId()
		expect(id).toHaveLength(8)
	})
})