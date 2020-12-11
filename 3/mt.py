import requests
import math
import time
from uuid import uuid4

(w, n, m, r) = (32, 624, 397, 31)
a = 0x9908B0DF
(u, d) = (11, 0xFFFFFFFF)
(s, b) = (7, 0x9D2C5680)
(t, c) = (15, 0xEFC60000)
l = 18
f = 1812433253

lower_mask = (1 << 31) - 1
upper_mask = ~lower_mask

MT = [None]*624
index = n + 1

# Initialize the generator from a seed
def seed_mt(seed):
    global index
    index = n
    MT[0] = int32(seed)
    for i in range(1, n): # loop over each element
        MT[i] = int32(f * (MT[i-1] ^ (MT[i-1] >> (w-2))) + i)

def state(arr):
    seed_mt(0)
    for i in range(0, n): # loop over each element
        MT[i] = int32(untemper(arr[i]))

# Extract a tempered value based on MT[index]
# calling twist() every n numbers
def extract_number():
    global index
    if index >= n:
        if index > n:
            print("Generator was never seeded")
            # Alternatively, seed with constant value; 5489 is used in reference C code[52]
        twist()

    y = temper(MT[index])

    index += 1
    return int32(y)
 
def temper(y):
    y ^= (y >> u)
    y ^= ((y << s) & b)
    y ^= ((y << t) & c)
    y ^= (y >> l)
    return y

def untemper(y):
    y ^= y >> l
    y ^= y << t & c
    for _ in range(7):
        y ^= y << s & b
    for _ in range(3):
        y ^= y >> u
    return y

# Generate the next n values from the series x_i 
def twist():
    global index
    for i in range(0, n):
        x = int32((MT[i] & upper_mask) + (MT[(i+1) % n] & lower_mask))
        xA = x >> 1
        if ((x % 2) != 0): xA = xA ^ a
        MT[i] = MT[(i + m) % n] ^ xA
    index = 0

def int32(number):
    return int(0xFFFFFFFF & number)

if __name__ == "__main__":
    id = uuid4()
    print(requests.get("http://95.217.177.249/casino/createacc?id="+str(id)).json())
    x = requests.get("http://95.217.177.249/casino/playMt?id="+str(id)+"&bet=1&number=1").json()["realNumber"]
    now = math.floor(time.time())
    print(x)

    for i in range(-100, 100):
        seed_mt(now + i)
        y = extract_number()
        if (x == y):
            print(y)
            z = extract_number()
            print(z)
            print(requests.get("http://95.217.177.249/casino/playMt?id="+str(id)+"&bet=500&number="+str(z)).json())
            z = extract_number()
            print(z)
            print(requests.get("http://95.217.177.249/casino/playMt?id="+str(id)+"&bet=1000&number="+str(z)).json())
            break

    # 3.3

    id = uuid4()
    print(requests.get("http://95.217.177.249/casino/createacc?id="+str(id)).json())
    arr = [None]*624
    for i in range(0, 624):
        if i % 100 == 0: print(i)
        arr[i] = requests.get("http://95.217.177.249/casino/playBetterMt?id="+str(id)+"&bet=1&number=1").json()["realNumber"]

    state(arr)
    z = extract_number()
    print(z)
    print(requests.get("http://95.217.177.249/casino/playBetterMt?id="+str(id)+"&bet=300&number="+str(z)).json())
    z = extract_number()
    print(z)
    print(requests.get("http://95.217.177.249/casino/playBetterMt?id="+str(id)+"&bet=1000&number="+str(z)).json())

# from mt19937predictor import MT19937Predictor

# predictor = MT19937Predictor()

# for i in range(1, 625):
#     # print(i)
#     x = requests.get("http://95.217.177.249/casino/playBetterMt?id=322&bet=1&number=1").json()["realNumber"]
#     print(i)
#     predictor.setrandbits(abs(x), 32)
# print(requests.get("http://95.217.177.249/casino/playBetterMt?id=322&bet=300&number="+str(predictor.getrandbits(32))).json())
# print(requests.get("http://95.217.177.249/casino/playBetterMt?id=322&bet=1000&number="+str(predictor.getrandbits(32))).json())
