const crypto = require('crypto')
const http = require('http2')


//get password from the command line
const plainTextPassword = process.argv[2];
console.log('plain text password = ' + plainTextPassword)

//hash password using sha1 algorithm
const hashedPassword = hashPassword(plainTextPassword)
console.log('hashed password = ' + hashedPassword)

//split hashed password
const splitedHash = splitHash(hashedPassword)
console.log('hash head: '+ splitedHash.head)
console.log('hash tail: '+ splitedHash.tail)





function hashPassword(password){
	return crypto
		.createHash('sha1')
		.update(plainTextPassword)
		.digest('hex')
}

function splitHash(hash){
	const head = hash.substr(0,5)
	const tail  = hash.substr(5)
	return {head,tail}
}