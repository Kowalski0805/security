# Password storage

We created application with the following security measures:
1.  Passwords are hashed with Argon2i algorithm.
2.  DB honeypot is set up - application has two databases: real and mock; if hacker tries to execute a SQL injection, malicious queries are forwarded to the mock database.
3.  Real database contains poisoned records - if hacker executes code that triggers them, automatic database backup starts.

# Sensitive information storage

Application contains sensitive information - email addresses.
1.  Azure key vault is used for storing key for encrypting/decrypting data.
2.  Email are encrypted with AES algorithm in CBC mode, using key from Azure and IV.
