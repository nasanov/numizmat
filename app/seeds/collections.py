import random
from app.models import db, User, Collection


def seed_collections():

    collections = [
        {"name": 'All Coins', 'user_id': 1},
        {"name": 'All Coins', 'user_id': 2},
        {"name": 'All Coins', 'user_id': 3},
        {"name": 'All Coins', 'user_id': 4},
        {"name": 'All Coins', 'user_id': 5},
        {"name": 'All Coins', 'user_id': 7},
        {"name": 'All Coins', 'user_id': 6},
        {"name": 'Wishlist', 'user_id': 1},
        {"name": 'Wishlist', 'user_id': 2},
        {"name": 'Wishlist', 'user_id': 3},
        {"name": 'Wishlist', 'user_id': 4},
        {"name": 'Wishlist', 'user_id': 5},
        {"name": 'Wishlist', 'user_id': 7},
        {"name": 'Wishlist', 'user_id': 6},
    ]

    for collection in collections:
        load_collections = Collection(
            name=collection['name'], user_id=collection['user_id'])
        db.session.add(load_collections)

    db.session.commit()


def undo_collections():
    db.session.execute('TRUNCATE collections RESTART IDENTITY CASCADE;')
    db.session.commit()
