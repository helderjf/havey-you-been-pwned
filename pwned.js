const axios = require('axios')
const chalk = require('chalk')
const hashUtils = require('./hash-utils.js')

const version = '1.0.0'
const command = process.argv[2];

//parse user input
switch (command) {
	case 'check':
		const plainTextPassword = process.argv[3];
		if(plainTextPassword){
			handle(plainTextPassword)
		}else{
			showHelp()
		}
		break;
	case 'version':
		showVersion();
		break;
	case 'help': 
		showHelp()
		break;
	default: showHelp()
		break;
}

/**
 * show GUI help menu
 */
function showHelp() {
	console.log('Usage:');
	console.log("    node pwned check 'your_password_between_quotes'          check if your password has been pwned");
	console.log("    node pwned version                                       view version");
	console.log("    node pwned help                                          view help");
	process.exit()
}

/**
 * show version
 */
function showVersion () {
	console.log('version: ' + version);
	process.exit()
}



/**
 * Main program
 * @param {string} plainTextPassword 
 */
function handle(plainTextPassword){
	//hash password using SHA1 algorithm
	const hashedPassword = hashUtils.hashPassword(plainTextPassword)
	//split hashed password
	const splitedHash = hashUtils.splitHash(hashedPassword)

	//get pwned hashes from API
	const url = 'https://api.pwnedpasswords.com/range/'
	axios.default.get(url + splitedHash.head)
		.then(response => checkPwned(splitedHash, response.data))
		.catch(error => console.log(error))
}

/**
 * Searchs the API response for our password's hash tail and informs the user of the outcome
 * @param {Object} splitedHash object containing the password's SHA1 hash, splited by head(5 first characters) and tail
 * @param {String} data multiline string containing the API response body
 */
function checkPwned(splitedHash, data){
	const pwnedHash = 
		data.split('\r\n')
			.find(line =>  line.startsWith(splitedHash.tail))
	
	//inform user
	if(pwnedHash){
		const timesPwned = pwnedHash.split(':')[1]
		console.log(chalk.white.bgRedBright('!!!Whoops!!!!') 
			+ '     ' 
			+ chalk.redBright('Your password has been pwned ' + timesPwned + ' times!'))
		console.log(chalk.redBright('You should change it ASAP.'))
	}else{
		console.log(chalk.green('Good! Your password hasn\'t been pwned'))
	}
}
