from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from flask_login import current_user, login_user, logout_user, login_required

coin_routes = Blueprint('coins', __name__)


# GET ALL COINS
@coin_routes.route('/')
def all_coins():
    coins = Coin.query.all()
    return {"coins": [coin.to_dict() for coin in coins]}


# ADD NEW COIN
# @coin_routes.route('/', methods=['POST'])
# def add_coin():
#     # get info from request and pass it to the Coin instance

#     coin = Coin(
#         name=request.json['name'],
#         obverse_photo=request.json['obverse_photo'],
#         reverse_photo=request.json['reverse_photo'],
#         country=request.json['country'],
#         is_collectible=request.json['is_collectible'],
#         series=request.json['series'],
#         year=request.json['year'],
#         mintage=request.json['mintage'],
#         value=request.json['value'],
#         composition=request.json['composition'],
#         weight=request.json['weight'],
#         diameter=request.json['diameter'],
#         thickness=request.json['thickness'],
#         shape=request.json['shape'],
#         orientation=request.json['orientation'],
#     )

#     db.session.add(channel)
#     db.session.commit()
#     return {"coin": coin.to_dict()}

# EDIT COIN
# @coin_routes.route('/<int:coin_id>', methods=['PUT'])
# def edit_coin(coin_id):

#     if not current_user.is_authenticated:
#         return {'errors': ['Unauthorized']}

#     coin = Coin.query.get(coin_id)
#     coin.name = request.json
#     db.session.commit()
#     return {"coin": coin.to_dict()}
