from werkzeug.security import generate_password_hash
from app.models import db, User
from faker import Faker

# Adds a demo user, you can add other users here if you want


def seed_users():
    fake = Faker()
    demo = User(username='Demo', email='demo@aa.io',
                password='password', firstname='DemoFirstName', lastname='DemoLastName', country="DemoCountry")
    publisher = User(username='admin', email='admin@aa.io',
                     password='password', firstname='adminFirstName', lastname='adminLastName', country="adminCountry")

    db.session.add(demo)
    db.session.add(publisher)

    users = []
    for _ in range(50):
        users.append({
            'username': fake.user_name(),
            'email': fake.free_email(),
            'password': fake.password(length=10),
            'firstname': fake.first_name(),
            'lastname': fake.last_name(),
            'country': fake.country()
        })

    for user in users:
        load_user = User(username=user['username'], email=user['email'],
                         password=user['password'], firstname=user['firstname'], lastname=user['lastname'], country=user['country'])
        db.session.add(load_user)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
