# TLS certificate

I used ED25519 algorithm because it is based on twisted Edwards curve and Curve25519, which is considered safe on http://safecurves.cr.yp.to/ .

Key generation: `openssl genpkey -algorithm Ed25519 -out ed.key`
Certificate request generation: `openssl req -new -key ed.key -out ed_t.csr`
Certificate generation (I created own CA and added it to trusted to bypass self-signed certificate warnings):
```
# Become a Certificate Authority
openssl genrsa -des3 -out myCA.key 2048
openssl req -x509 -new -nodes -key myCA.key -sha256 -days 825 -out myCA.pem

# Create CA-signed certs
>ed_t.ext cat <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
EOF

openssl x509 -req -in ed_t.csr -CA myCA.pem -CAkey myCA.key -CAcreateserial -out ed_t.crt -days 825 -sha256 -extfile $NAME.ext
```