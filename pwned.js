const crypto = require('crypto')


//get password from the command line
const plainTextPassword = process.argv[2];
console.log('plain text password = ' + plainTextPassword)

//hash password using sha1 algorithm
const hashedPassword = crypto
	.createHash('sha1')
	.update(plainTextPassword)
	.digest('hex')
console.log('hashed password = ' + hashedPassword)
