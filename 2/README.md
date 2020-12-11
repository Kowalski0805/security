# Weak salt

Salsa20 is ARX-based cipher (add, rotate, xor), so it basically relies on XOR function.

If no nonce is present, that means that we can simply use key reause attack and XOR string between themselves
and then use crib dragging method to recover one of the messages, which will in its turn recover all other strings.

For crib dragging, I used https://lzutao.github.io/cribdrag/ online solver and manually picked some cribs.