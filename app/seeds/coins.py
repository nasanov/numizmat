import random
from app.models import db, User, Coin
from faker import Faker

#################### FUNCTIONS ####################

# Seeds Channel Data


def seed_coins():
    fake = Faker()

    coins = []

    for _ in range(100):
        name = fake.slug()
        country = fake.country()
        series = 1
        year = 2
        collection_id = random.randint(1, 6)

        coins.append(
            {'name': name,
             'collection_id': collection_id,
             'country': country,
             'series': series,
             'year': year, }
        )

    for coin in coins:
        load_coin = Coin(
            name=coin['name'], collection_id=coin['collection_id'], country=coin['country'], series=coin['series'], year=coin['year']
        )
        db.session.add(load_coin)

    db.session.commit()


def undo_coins():
    db.session.execute('TRUNCATE coins RESTART IDENTITY CASCADE;')
    db.session.commit()
