# Generating passwords

Plaintext passwords were generated with custom JavaScript code.

It generates 100,000 passwords, each password is one of the following types:
1. Really random password (5%) - alphanumeric string with length 8 to 12 characters picked randomly
2. Top 100 (10%) - random password from top-100 list from here: https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-100.txt
3. Top 1,000,000 (65%) - random password from top-1mil list from here: https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/10-million-password-list-top-1000000.txt
4. Transformed (20%) - random password from top-1mil list with probability of 80% to use l33t and 40% to append random number 

Then, the same set of 100,000 passwords were hashed using 3 schemes:
1. MD5
2. SHA1 with 16-byte salt
3. Bcrypt with 5 salt rounds


# Cracking passwords

For cracking, we used hashcat with different approaches.
1. MD5 dictionary attack - `hashcat --force --potfile-disable -m 0 -a 0 -o alien/cracked_md5.txt alien/md5.txt top1kk.txt`
2. SHA1 bruteforce attack - `hashcat --force --potfile-disable -m 110 -a 3 -o alien/cracked_sha1.txt alien/sha1.txt`
3. Bcrypt dictionary attack - `hashcat --force --potfile-disable -m 3200 -a 0 -o alien/cracked_bcrypt.txt alien/bcrypt.txt top1kk.txt`

MD5 attack finished in 11 seconds, recovered 36.4%.

SHA1 attack was running for 10 minutes, recovered 0.08%, max speed: 14360 kH/s.

Bcrypt attack was running for 10 minutes, recovered 0.38%, max speed: 300 H/s.

Summary: recovery speed and accuracy depend on attack type and hashing scheme. Bruteforce attack is more precise than dictionary because it tries all possible symbol combinations, but because of that, it requires more time to finish and provides worse results when given the same time amount. Salted hashing schemes take longer time to recover, and better hashing algorithms reduce cracking speed.  