from flask import Blueprint, jsonify, session, request
from flask_login import login_required, current_user
from app.models import db, User, Coin, Collection

search_routes = Blueprint('search', __name__)


# GET SEARCH RESULTS
@search_routes.route('/', methods=['GET', 'POST'])
def search():
    searchTerm = request.json['searchParam']
    # print("####", request.json)

    coins = Coin.query.filter(
        Coin.user_id == current_user.id or Coin.user_id == 2).filter(Coin.name.ilike(f'%{searchTerm}%') | Coin.series.ilike(
            f'%{searchTerm}%') | Coin.composition.ilike(f'{searchTerm}%')).limit(10).all()
    collections = Collection.query.filter(Collection.user_id == current_user.id).filter(
        Collection.name.ilike(f'%{searchTerm}%')).limit(10).all()
    return {
        # "users": [user.to_dict() for user in users],
        "coins": [coin.to_dict() for coin in coins],
        "collections": [collection.to_dict() for collection in collections],
        "values": [coin.to_dict() for coin in coins]+[collection.to_dict() for collection in collections]
    }
