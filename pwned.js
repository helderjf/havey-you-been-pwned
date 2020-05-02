const crypto = require('crypto')
const axios = require('axios')
const chalk = require('chalk')
const yargs = require('yargs')

//set up GUI
yargs.version('1.0.0')
yargs.help()
yargs.parse()




//get password from the command line
const plainTextPassword = process.argv[2];

//hash password using sha1 algorithm
const hashedPassword = hashPassword(plainTextPassword)
//split hashed password
const splitedHash = splitHash(hashedPassword)

//get pwned hashes from API
const url = 'https://api.pwnedpasswords.com/range/'
axios.default.get(url + splitedHash.head)
	.then(response => checkPwned(response.data))
	.catch(error => console.log(error))

//check if password has been pwned
function checkPwned(data){
	const filteredData = data.split('\r\n')
	.filter(line =>  line.startsWith(splitedHash.tail))
	
	if(filteredData.length != 0){
		const timesPwned = filteredData[0].split(':')[1]
		console.log(chalk.white.bgRedBright('!!!Upss!!!!') + '     ' + chalk.redBright('Your password has been pwned ' + timesPwned + ' times!'))
		console.log(chalk.redBright('You should change it ASAP.'))
	}else{
		console.log(chalk.green('Good! Your password hasn\'t been pwned'))
	}
}
	
function hashPassword(password){
	return crypto
		.createHash('sha1')
		.update(plainTextPassword)
		.digest('hex')
		.toUpperCase()
}

function splitHash(hash){
	const head = hash.substr(0,5)
	const tail  = hash.substr(5)
	return {head,tail}
}


