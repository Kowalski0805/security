from Crypto.Cipher import Salsa20
import string
import re

msgs = [
    'ad924af7a9cdaf3a1bb0c3fe1a20a3f367d82b0f05f8e75643ba688ea2ce8ec88f4762fbe93b50bf5138c7b699',
    'a59a0eaeb4d1fc325ab797b31425e6bc66d36e5b18efe8060cb32edeaad68180db4979ede43856a24c7d',
    'a59a0eaeaad7fc3c56fe82fd1f6bb5a769c43a0f0cfae74f0df56fdae3db8d9d840875ecae2557bf563fcea2',
    'a59a0eaea8ddf93c08fe81e11e2ab2bb6d962f0f1af2f44243b46cc1b6d6c291995d65a9a5234aa204',
    'ad924af7a9cdaf3a1bb0c3f51439a5b628cf215a1fbdee4302a77a8ea2cc86c8984d65ffac6c58bf5b71dab8841136',
    'b09b4afda3caf93c5aa78ce6096bb2a67ad86e4302f3e10602b37acbb1829680935137e8bb2919b6503fccfdca5461',
    'a59a0eaeb5d7af3115b287b31425e6a460d3200f19f5e35406f567dde3cc8d9c9e4179eee92557f1463edc',
    'a18c09ebb6ccaf2d12bbc3c41227aaf37fde274c05bdf5471aa62edaac82968093452da9eb0456bd5b71c6bfcb56',

    'ad924af7a9cdaf3a1bb0c3e71a27adf37fdf3a474dfef44914b17d8ea2cc86c89d4d72f9e93556a44d71dfb8980034b3cea5c4d4',
    'ab864af9a7d4e4790db797fb5b00afbd6fc5acaff9f3e95443b961dda6829680930874e6a42156bf1f25c6a4891c6d',
    'ad924ae0a3d1fb311facc3f5142eb5f366d93c0f01f2f04f0db22ec8b1cb8786925b37eaa82219b94a23ddf1931b34fa',
    'ad924aefaad4af341fb0c3f0143ea8a728c1275b05bdff4916f92eccb6d6c286994672a9bd2356f15224cab9d1',
    'ad924af7a9cdaf3a1bb0c3f51227aaf37cde2b0f18f3e04911b267d8aacc85c89b4179fcbd29',
    'b39d1ee6e6cbe6210ea7c3e01e28a9bd6cc5690f1af2f4520bf561c8e3c68b9b824979eaac6c4ba4517d89f1ca',
    'bd9b1ffcb598e62a5aaa8bf65b0ea7a17cde6e4e03f9a64315b07cd7b7ca8b86910863e1a8381ea21f38c7f183006df6c2a5',
    'a59a0e6c462cf83113bd8bb31238e6be67c42bcded09ff4916f262c2e3c087c897085ae8a76019bc4671dabe8455'
]


def byte_xor(ba1, ba2):
    return bytes([_a ^ _b for _a, _b in zip(ba1, ba2)])

# msgsxx = byte_xor(bytes.fromhex(z[0]+z[1]+z[2]+z[3]+z[4]+z[5]+z[6]+z[7]), bytes.fromhex(z[8]+z[9]+z[10]+z[11]+z[12]+z[13]+z[14]+z[15])).hex()
# msgsxx = byte_xor(bytes.fromhex(z[7]), bytes.fromhex(z[15])).hex()
p = re.compile(r'(..)')
# print(p.sub(r'\1 ', msgsxx))
# print(z[0]+z[1]+z[2]+z[3]+z[4]+z[5]+z[6]+z[7])
# print(z[8]+z[9]+z[10]+z[11]+z[12]+z[13]+z[14]+z[15])

x1 = bytes.fromhex(msgs[8])
x2 = b'If you can talk with crowds and keep your virtue,'
xx = byte_xor(x1, x2)
# for msg in msgs:
#     print(byte_xor(xx, bytes.fromhex(msg)).decode('utf-8'))


a1 = b'hello my name is kowalski'
a2 = b'welcome to my laba'
secret = b'0123456789abcdef0123456789abcdef'
cipher = Salsa20.new(key=secret, nonce=bytes(8))
x1 = cipher.encrypt(a1)
print(x1.hex())
cipher = Salsa20.new(key=secret, nonce=bytes(8))
x2 = cipher.encrypt(a2)
print(x2.hex())

xx = byte_xor(x1, x2)
print(xx.hex())

print(byte_xor(b'welcome to my laba', xx))
print(byte_xor(b'hello my name is kowalski', xx))

# for x in range(65, 123):
#     s = byte_xor(bytes(chr(x), 'ascii'), xx)
#     # if all(n >= 65 and n < 91 for n in s):
#     print(chr(x), '->', s.decode("ascii"))

# for x in range(65, 123):
#     for y in range(65, 123):
#         for z in range(65, 123):
#             s = byte_xor(bytes(chr(x)+chr(y)+chr(z), 'ascii'), xx)
#             if all((n >= 65 and n < 123) or n in [32] for n in s):
#                 print(chr(x)+chr(y)+chr(z), '->', s.decode("ascii"))

# plaintext = b'raz dva pizda'
# secret = bytes.fromhex(msgs[1])
# cipher = Salsa20.new(key=secret, nonce=bytes(8))
# msg = cipher.encrypt(plaintext)

# ciphertext = msg
# cipher = Salsa20.new(key=secret, nonce=bytes(8))
# plaintext = cipher.encrypt(ciphertext)
# print(plaintext)

# print(plaintext.upper())

# def apparitions(chaine) :
#     app = [0] * 26
#     for c in chaine.upper() :
#         if c >= 65 and c < 91:
#             app[c - ord('A')] += 1
#     return app

# def indice_coincidence(chaine) :
#     app = apparitions(chaine) 
#     s = sum (n*(n-1) for n in app)
#     somme = sum(app)
#     return s / (somme*(somme-1))

# # print(indice_coincidence(plaintext))


# # for i in range(1, pow(2,256)):
# #     if i % 10000 == 0:
# #         print(i, indice_coincidence(text))
# #     secret = i.to_bytes(length=32, byteorder='big')
# #     cipher = Salsa20.new(key=secret, nonce=bytes(8))
# #     text = b''
# #     for msg in msgs:
# #         plaintext = cipher.decrypt(msg)
# #         text += plaintext + b'\n'
# #     if indice_coincidence(text) > 0.05:
# #         print(text)
# #         break;


# # for i in range(1, pow(2,256)):
#     if i % 10000 == 0:
#         print(i, indice_coincidence(text))
#     secret = i.to_bytes(length=32, byteorder='big')
#     cipher = Salsa20.new(key=secret, nonce=bytes(8))
#     text = b''
#     for msg in msgs:
#         plaintext = cipher.decrypt(msg)
#         text += plaintext + b'\n'
#     if indice_coincidence(text) > 0.05:
#         print(text)
#         break;