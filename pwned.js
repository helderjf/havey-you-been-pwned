const axios = require('axios')
const chalk = require('chalk')
const yargs = require('yargs')
const hashUtils = require('./hash-utils.js')

//set up GUI
yargs.version('1.0.0')
yargs.help()
yargs.parse()

//get password from the command line
const plainTextPassword = process.argv[2];

//hash password using sha1 algorithm
const hashedPassword = hashUtils.hashPassword(plainTextPassword)
//split hashed password
const splitedHash = hashUtils.splitHash(hashedPassword)

//get pwned hashes from API
const url = 'https://api.pwnedpasswords.com/range/'
axios.default.get(url + splitedHash.head)
	.then(response => checkPwned(response.data))
	.catch(error => console.log(error))

//check if password has been pwned
function checkPwned(data){
	const pwnedHash = 
		data.split('\r\n')
			.find(line =>  line.startsWith(splitedHash.tail))
	
	if(pwnedHash){
		const timesPwned = pwnedHash[0].split(':')[1]
		console.log(chalk.white.bgRedBright('!!!Whoops!!!!') 
			+ '     ' 
			+ chalk.redBright('Your password has been pwned ' + timesPwned + ' times!'))
		console.log(chalk.redBright('You should change it ASAP.'))
	}else{
		console.log(chalk.green('Good! Your password hasn\'t been pwned'))
	}
}
