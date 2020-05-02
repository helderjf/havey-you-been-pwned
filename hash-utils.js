const crypto = require('crypto')

module.exports = 
    {
        /**
         * Hash password with the SHA1 algorithm
         * @param {string} password 
         */
        hashPassword : (plainTextPassword) => {
            return crypto
            .createHash('sha1')
            .update(plainTextPassword)
            .digest('hex')
            .toUpperCase()
        },
        
        /**
         * Split the hash on the 5th character
         * @param {string} hash 
         */
        splitHash : (hash) => {
            return {
                head: hash.substr(0,5),
                tail: hash.substr(5)
            }
        }
    }
    
