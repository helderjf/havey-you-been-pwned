# safe-have-you-been-pwned
A simple node.js command line util that lets you safely check if your passwords have bean pwned, without actually sending your passwords over the internet, but sending only a small part of it's hash.

## Description
This util makes use of the haveibeenpwned.com site's API to check if your password(s) have been leaked, without you having to send your password over the internet to the site.
### How does it work?
Instead of taking your password as a parameter, the API takes only the 5 first characters of your password's SHA1 hash, and it responds with a list of the leaked password hashes and the number of times each have been leaked.
Then this app will locally search the list for the remaining 35 characters of your password's hash. If it finds it, you have been PWNED!

## Usage
install node.js

On terminal:
```
cd safe-have-you-been-pwned

npm install

node pwned check 'your_password_between_quotes'
```