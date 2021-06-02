import requests
import json

# api-endpoint
URL = "https://qmegas.info/numista-api/coin/"

# defining a params dict for the parameters to be sent to the API
# PARAMS = {'coin_id': required}

f = open('50_us_coins_ids.txt', 'r')
result_object = {}
i = 0

while True:
    i += 1
    line = f.readline()
    if not line:
        break
    # print(line.strip())
    r = requests.get(url=URL, params={'coin_id': line.strip()})
    data = r.json()
    result_object[i] = data
f.close()

json_object = json.dumps(result_object, indent=4)

with open("result.json", "w") as outfile:
    outfile.write(json_object)

# print(result_object)
