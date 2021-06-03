import random
from app.models import db, User, Collection, Coin
from faker import Faker


def seed_collections():
    fake = Faker()
    coins = Coin.query.all()
    users = User.query.all()

    collections = [
        {"name": 'All Coins', 'user_id': 1, 'coins_in': [
            coins[5], coins[3], coins[7], coins[2]]},
        {"name": 'All Coins', 'user_id': 2, 'coins_in': [
            coins[2], coins[0], coins[6], coins[7]]},
        {"name": 'All Coins', 'user_id': 3, 'coins_in': [
            coins[0], coins[9], coins[2], coins[3]]},
        {"name": 'All Coins', 'user_id': 4, 'coins_in': [
            coins[7], coins[0], coins[8], coins[1]]},
        {"name": 'All Coins', 'user_id': 5, 'coins_in': [
            coins[6], coins[2], coins[0], coins[1]]},
        {"name": 'All Coins', 'user_id': 7, 'coins_in': [
            coins[1], coins[9], coins[5], coins[8]]},
        {"name": 'All Coins', 'user_id': 6, 'coins_in': [
            coins[6], coins[3], coins[8], coins[0]]},
        {"name": 'Wishlist', 'user_id': 1, 'coins_in': [
            coins[4], coins[5], coins[6], coins[9]]},
        {"name": 'Wishlist', 'user_id': 2, 'coins_in': [
            coins[4], coins[1], coins[9], coins[3]]},
        {"name": 'Wishlist', 'user_id': 3, 'coins_in': [
            coins[0], coins[6], coins[2], coins[1]]},
        {"name": 'Wishlist', 'user_id': 4, 'coins_in': [
            coins[1], coins[3], coins[2], coins[0]]},
        {"name": 'Wishlist', 'user_id': 5, 'coins_in': [
            coins[7], coins[8], coins[0], coins[1]]},
        {"name": 'Wishlist', 'user_id': 7, 'coins_in': [
            coins[8], coins[5], coins[3], coins[4]]},
        {"name": 'Wishlist', 'user_id': 6, 'coins_in': [
            coins[2], coins[8], coins[6], coins[3]]},
    ]

    for _ in range(55):
        name = fake.slug()
        coin_id = random.randint(1, len(coins))
        user_id = random.randint(1, len(users))

        temp_coins = Coin.query.filter(Coin.id != coin_id).all()

        coins_in = [Coin.query.get(coin_id)]
        coins_in += random.sample(temp_coins, random.randint(0, 3))

        collections.append(
            {'name': name,
             'user_id': user_id,
             'coins_in': coins_in}
        )

    for collection in collections:
        load_collections = Collection(
            name=collection['name'], user_id=collection['user_id'], coins_in=collection['coins_in'])
        db.session.add(load_collections)

    db.session.commit()


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
