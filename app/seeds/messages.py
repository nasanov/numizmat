import random
from faker import Faker
from app.models import db, User, Message


def seed_messages():

    fake = Faker()

    messages = [
        {'user_id': 1, "message": 'Demo 1'},
        {'user_id': 2, "message": 'Demo 2'},
        {'user_id': 3, "message": 'Demo 3'},
        {'user_id': 4, "message": 'Demo 4'},
        {'user_id': 5, "message": 'Demo 5'},
        {'user_id': 7, "message": 'Demo 6'},
        {'user_id': 6, "message": 'Demo 7'},
    ]

    for _ in range(200):
        user_id = random.randint(1, 6)

        messages.append(
            {
                'user_id': user_id,
                'message': fake.sentence(nb_words=random.randint(1, 15))
            }
        )

    for message in messages:
        load_message = Message(
            user_id=message['user_id'], message=message['message'])
        db.session.add(load_message)

    db.session.commit()


def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
