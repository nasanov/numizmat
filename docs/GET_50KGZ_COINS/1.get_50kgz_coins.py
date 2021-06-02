import requests
import json

URL = "https://qmegas.info/numista-api/country/coins/?country_id=kirghizistan&filter_common=0&limit=50"

result_object = {}

r = requests.get(url=URL)
data = r.json()
result_object = data

json_object = json.dumps(result_object, indent=4)

with open("result.json", "w") as outfile:
    outfile.write(json_object)

# print(result_object)
