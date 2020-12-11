from math import pow
import requests

prev = requests.get("http://95.217.177.249/casino/playLcg?id=228&bet=1&number=1").json()["realNumber"]
curr = requests.get("http://95.217.177.249/casino/playLcg?id=228&bet=1&number=1").json()["realNumber"]
nextn = requests.get("http://95.217.177.249/casino/playLcg?id=228&bet=1&number=1").json()["realNumber"]

mod = int(pow(2,32))

def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, x, y = egcd(b % a, a)
        return (g, y - (b // a) * x, x)

def modinv(b, n):
    g, x, _ = egcd(b, n)
    if g == 1:
        return x % n


def getA(states, modulus):
    multiplier = (states[2] - states[1]) * modinv(states[1] - states[0], modulus) % modulus
    return multiplier


def getC(states, modulus, multiplier):
    increment = (states[1] - states[0]*multiplier) % modulus
    return increment

def getNext(x, a, c, mod):
    return (a*x + c) % mod

a = getA([prev, curr, nextn], mod)
print(a)
c = getC([prev, curr], mod, a)
print(c)

for i in range(0, 1000):
    prev = getNext(prev, a, c, mod)
    print(prev)
