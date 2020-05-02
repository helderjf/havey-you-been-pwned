const crypto = require('crypto')
const http = require('http2')
const axios = require('axios')


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

const url = 'https://api.pwnedpasswords.com/range/'

axios.default.get(url + splitedHash.head)
	.then(response => console.log(response.data))
	.catch(error => console.log(error))







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