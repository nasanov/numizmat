import random
from app.models import db, User, Coin
from faker import Faker
import json
# import os


def seed_coins():
    # fake = Faker()

    # coins = []
    # f = open('./result.json')

    # data = json.load(f)

    # cwd = os.getcwd()  # Get the current working directory (cwd)
    # files = os.listdir(cwd)  # Get all the files in that directory
    # print("Files in %r: %s" % (cwd, files))

    with open('result.json') as f:
        data = json.load(f)

    with open('resultkgz.json') as f2:
        data2 = json.load(f2)
    coins = []

    for i in data:
        coins.append(data[i])
    for i in data2:
        coins.append(data2[i])
    # print(coins)
    # for _ in range(100):
    #     name = fake.slug()
    #     country = fake.country()
    #     series = 1
    #     year = 2
    #     collection_id = random.randint(1, 6)

    #     coins.append(
    #         {'name': name,
    #          'collection_id': collection_id,
    #          'country': country,
    #          'series': series,
    #          'year': year, }
    #     )
    # collection_id = random.randint(1, 3)
    for coin in coins:
        # print(coin)
        load_coin = Coin(
            name=coin['title'],
            # collection_id=collection_id,
            obverse_photo=coin['images']['obverse']['preview'],
            reverse_photo=coin['images']['reverse']['preview'],
            country=coin['country']['name'],
            is_collectible=coin['is_commemorative'],
            series=coin['commemorative_name'],
            year=coin['years_range'],
            mintage=coin['years'][0]['mintage'],
            value=coin['value'],
            composition=coin['metal'],
            weight=coin['weight'],
            diameter=coin['diameter'],
            # thickness=coin['thickness'],
            shape=coin['shape'],
            # orientation=coin['orientation'],
            user_id=2
        )
        db.session.add(load_coin)

    db.session.commit()
    f.close()
    f2.close()


def undo_coins():
    db.session.execute('TRUNCATE coins RESTART IDENTITY CASCADE;')
    db.session.commit()
