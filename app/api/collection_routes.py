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
    # print(collection_name, current_user.id)
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
    # ! test this shit
    collection.coins_in.clear()
    db.session.commit()
    db.session.delete(collection)
    db.session.commit()
    return {"collection": collection.to_dict()}


# DOWNLOAD COLLECTION
@collection_routes.route('/<int:collection_id>/download/', methods=['POST'])
def download_collection(collection_id):
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


# IMPORT COLLECTION (add to the collection)
@collection_routes.route('/<int:collection_id>/import/', methods=['POST'])
def import_collection(collection_id):
    collection = Collection.query.get(collection_id)

    fileToImport = request.files['fileToImport']
    # if fileToImport.filename != '':
    #     fileToImport.save(fileToImport.filename)

    # print("stream -> ", dir(fileToImport.stream))
    # print("stream -> ", dir(fileToImport.stream._file))
    # print("stream -> ", fileToImport.stream._file.read())
    # print("stream -> ", fileToImport.stream.readline())

    # getting byte object with the value from the uploaded file and decode it to the string
    newFile = fileToImport.stream._file.getvalue().decode("utf-8")
    # print("stream -> ", newFile)

    # * Read whole text
    # * print("read -> ", fileToImport.stream._file.read())
    # ? Read line by line
    # ? print("readline -> ", fileToImport.stream._file.readline())
    # ! Array of lines
    # ! print("readlines -> ", fileToImport.stream._file.readlines())

    # getting the array of the lines
    arrayOfLines = newFile.split("\n")

    # print(len(arrayOfLines))
    # iterate over each line and split by ','
    for i in range(len(arrayOfLines) - 1):
        row = arrayOfLines[i].split(',')
        # print(row)
        # create coin for each line
        new_coin = Coin(
            name=row[1],
            # collection_id=collection_id,
            obverse_photo=row[2],
            reverse_photo=row[3],
            country=row[4],
            is_collectible=True,
            series=row[6],
            year=row[7],
            mintage=row[8],
            value=row[9],
            composition=row[10],
            weight=row[11],
            diameter=row[12],
            shape=row[14],
            user_id=current_user.id
        )

        # print(new_coin)
        new_coin.in_collections.append(collection)
        db.session.add(new_coin)
        # push each coin to the coins_in array of the collection
        # collection.coins_in.append(new_coin)

        # print(row.split(','))

    db.session.commit()
    # return data, save to the store, dispatch after return
    return {"collection": collection.to_dict()}


# IMPORT COLLECTION (create new collection)
@collection_routes.route('/import/', methods=['POST'])
def import_new_collection():
    collection = Collection(
        name="Imported Collection", user_id=current_user.id)

    fileToImport = request.files['fileToImport']

    newFile = fileToImport.stream._file.getvalue().decode("utf-8")
    arrayOfLines = newFile.split("\n")

    for i in range(len(arrayOfLines) - 1):
        row = arrayOfLines[i].split(',')

        new_coin = Coin(
            name=row[1],
            obverse_photo=row[2],
            reverse_photo=row[3],
            country=row[4],
            is_collectible=True,
            series=row[6],
            year=row[7],
            mintage=row[8],
            value=row[9],
            composition=row[10],
            weight=row[11],
            diameter=row[12],
            shape=row[14],
            user_id=current_user.id
        )

        new_coin.in_collections.append(collection)
        db.session.add(new_coin)
    db.session.commit()
    return {"collection": collection.to_dict()}
