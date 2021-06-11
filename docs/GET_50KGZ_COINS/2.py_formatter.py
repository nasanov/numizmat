import json

f = open('1.50kgz_coins.json')

data = json.load(f)
coin_ids = []

for i in data['list']:
    coin_ids.append(i['id'])

# print(coin_ids)

f.close()

f2 = open('50_kgz_coins_ids.txt', 'w')
for i in coin_ids:
    f2.write(str(i))
    f2.write('\n')
f2.close()
