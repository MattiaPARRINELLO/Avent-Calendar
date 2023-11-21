import math

def affiche_sin():
    print(math.pi)
    for x in range(0, int(math.pi * 100) + 1):
        x /= 100
        print(f"sin({x}) = {math.sin(x)}")

affiche_sin()

