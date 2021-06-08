from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()


coin_collections = db.Table(
    'coin_collections',
    db.Column("collection_id", db.Integer,
              db.ForeignKey("collections.id"), primary_key=True),
    db.Column("coin_id", db.Integer, db.ForeignKey(
        "coins.id"), primary_key=True),
    db.Column("coin_quantity", db.Integer, default=1)

)


class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    message = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=datetime.now())

    user = db.relationship(
        "User",
        back_populates="messages"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "message": self.message,
            "created_at": str(self.created_at),
        }


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstname = db.Column(db.String(40))
    lastname = db.Column(db.String(40))
    country = db.Column(db.String(255))
    # profile_photo = db.Column(db.String(255))

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    messages = db.relationship(
        "Message",
        back_populates="user"
    )

    collections = db.relationship(
        "Collection",
        back_populates="user"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "firstname": self.firstname,
            "lastname": self.lastname,
            "country": self.country
        }


class Coin(db.Model):
    __tablename__ = 'coins'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    # collection_id = db.Column(db.Integer, db.ForeignKey(
    #     "collections.id"), nullable=False)
    obverse_photo = db.Column(db.String(255))
    reverse_photo = db.Column(db.String(255))
    country = db.Column(db.String(255))
    is_collectible = db.Column(db.Boolean(), default=True)
    series = db.Column(db.String(255))
    year = db.Column(db.String(255))
    mintage = db.Column(db.String(255))
    value = db.Column(db.String(255))
    # currency = db.Column(db.String(10))
    composition = db.Column(db.String(255))
    weight = db.Column(db.Float)
    diameter = db.Column(db.Float)
    thickness = db.Column(db.Float)
    shape = db.Column(db.String(255))
    orientation = db.Column(db.String(255))
    # obverse = db.Column(db.Text)
    # reverse = db.Column(db.Text)
    # verified = db.Column(db.Integer)
    # Who created this coin, admin by default
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))

    collections = db.relationship("Collection",
                                  secondary=coin_collections,
                                  back_populates="coins")

    # collections = db.relationship(
    #     "Collection",
    #     back_populates="coin",
    # )

    in_collections = db.relationship(
        "Collection",
        secondary=coin_collections,
        back_populates="coins_in"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "obverse_photo": self.obverse_photo,
            "reverse_photo": self.reverse_photo,
            "country": self.country,
            "is_collectible": self.is_collectible,
            "series": self.series,
            "year": self.year,
            "mintage": self.mintage,
            "value": self.value,
            "composition": self.composition,
            "weight": self.weight,
            "diameter": self.diameter,
            "thickness": self.thickness,
            "shape": self.shape,
            "orientation": self.orientation,
            "user_id": self.user_id,
            'in_collections': [collection.to_dict_basic() for collection in self.in_collections],
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "obverse_photo": self.obverse_photo,
            "reverse_photo": self.reverse_photo,
            "country": self.country,
            "is_collectible": self.is_collectible,
            "series": self.series,
            "year": self.year,
            "mintage": self.mintage,
            "value": self.value,
            "composition": self.composition,
            "weight": self.weight,
            "diameter": self.diameter,
            "thickness": self.thickness,
            "shape": self.shape,
            "orientation": self.orientation,
            "user_id": self.user_id
        }


class Collection(db.Model):
    __tablename__ = 'collections'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    coins = db.relationship("Coin",
                            secondary=coin_collections,
                            back_populates="collections")

    # coin = db.relationship(
    #     "Coin",
    #     back_populates="collections"
    # )

    coins_in = db.relationship(
        "Coin",
        secondary=coin_collections,
        back_populates="in_collections"
    )

    user = db.relationship(
        "User",
        back_populates="collections"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            'coins_in': [coin.to_dict_basic() for coin in self.coins_in],
        }

    def to_dict_basic(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
        }
