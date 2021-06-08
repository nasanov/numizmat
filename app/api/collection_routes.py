from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from flask_login import current_user, login_user, logout_user, login_required

collection_routes = Blueprint('collections', __name__)


# GET ALL COLLECTIONS FOR THE CURRENT USER
@collection_routes.route('/')
def all_collections():
    # filter for the current user
    collections = Collection.query.filter(
        Collection.user_id == current_user.id).all()
    return {"collections": [collection.to_dict() for collection in collections]}


# ADD NEW COLLECTION
@collection_routes.route('/', methods=['POST'])
def add_collection():
    # get info from request and pass it to the Collection instance
    collection_name = request.json['name']
    print(collection_name, current_user.id)
    collection = Collection(name=collection_name, user_id=current_user.id)
    db.session.add(collection)
    db.session.commit()
    return {"collection": collection.to_dict()}


# EDIT COLLECTION
@collection_routes.route('/<int:collection_id>/', methods=['PUT'])
def edit_collection(collection_id):

    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    collection = Collection.query.get(collection_id)
    collection.name = request.json
    db.session.commit()
    return {"collection": collection.to_dict()}


# DELETE COLLECTION
@collection_routes.route('/<int:collection_id>/', methods=['DELETE'])
def delete_collection(collection_id):

    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    collection = Collection.query.get(collection_id)
    db.session.delete(collection)
    db.session.commit()
    return {"collection": collection.to_dict()}
