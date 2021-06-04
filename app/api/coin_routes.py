from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from flask_login import current_user, login_user, logout_user, login_required

coin_routes = Blueprint('coins', __name__)


# GET ALL COINS
@coin_routes.route('/')
def all_coins():
    coins = Coin.query.all()
    return {"coins": [coin.to_dict() for coin in coins]}


# GET ALL COIN CATEGORIES
@coin_routes.route('/categories')
def all_categories():
    coins = Coin.query.all()

    categories = {
        "composition": [],
        "country": [],
        "diameter": [],
        "is_collectible": [],
        "mintage": [],
        "orientation": [],
        "series": [],
        "shape": [],
        "thickness": [],
        "weight": [],
        "year": []
    }

    for coin in coins:
        if coin.composition not in categories["composition"]:
            categories["composition"].append(coin.composition)
        if coin.country not in categories["country"]:
            categories["country"].append(coin.country)
        if coin.diameter not in categories["diameter"]:
            categories["diameter"].append(coin.diameter)
        if coin.is_collectible not in categories["is_collectible"]:
            categories["is_collectible"].append(coin.is_collectible)
        if coin.mintage not in categories["mintage"]:
            categories["mintage"].append(coin.mintage)
        if coin.orientation not in categories["orientation"]:
            categories["orientation"].append(coin.orientation)
        if coin.series not in categories["series"]:
            categories["series"].append(coin.series)
        if coin.shape not in categories["shape"]:
            categories["shape"].append(coin.shape)
        if coin.thickness not in categories["thickness"]:
            categories["thickness"].append(coin.thickness)
        if coin.weight not in categories["weight"]:
            categories["weight"].append(coin.weight)
        if coin.year not in categories["year"]:
            categories["year"].append(coin.year)

    # print("******************", categories)
    return {"categories": categories}


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

#     db.session.add(coin)
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
