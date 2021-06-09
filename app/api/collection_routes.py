from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from flask_login import current_user, login_user, logout_user, login_required
import csv
import io
from flask import make_response


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


# DOWNLOAD COLLECTION
@collection_routes.route('/<int:collection_id>/download/', methods=['POST'])
def download_collection(collection_id):

    # data = [
    #     ["REVIEW_DATE", "AUTHOR", "ISBN", "DISCOUNTED_PRICE"],
    #     ["1985/01/21", "Douglas Adams", '0345391802', 5.95],
    #     ["1990/01/12", "Douglas Hofstadter", '0465026567', 9.95],
    #     ["1998/07/15", "Timothy \"The Parser\" Campbell", '0968411304', 18.99],
    #     ["1999/12/03", "Richard Friedman", '0060630353', 5.95],
    #     ["2004/10/04", "Randel Helms", '0879755725', 4.50]
    # ]

    collection = Collection.query.get(collection_id).to_dict()['coins_in']

    # for coin in collection:
    # print("##############################")
    # print(collection)

    data = []
    for coin in range(len(collection)):
        row = []
        current = collection[coin]
        for i in current:
            # print(current[i])
            row.append(current[i])
        data.append(row)

    # print(data)
    si = io.StringIO()
    cw = csv.writer(si)
    cw.writerows(data)
    output = make_response(si.getvalue())
    output.headers["Content-Disposition"] = "attachment; filename=export.csv"
    output.headers["Content-type"] = "text/csv"
    return output
