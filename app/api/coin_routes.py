from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from app.aws import allowed_file, get_unique_filename, upload_file_to_s3, delete_file_from_s3
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import AddCoinForm

coin_routes = Blueprint('coins', __name__)


# GET ALL COINS FOR THE CURRENT USER
@coin_routes.route('/')
def all_coins():
    current_user_coins = Coin.query.filter(
        Coin.user_id == current_user.id).all()
    admins_coins = Coin.query.filter(
        Coin.user_id == 2).all()
    coins = current_user_coins + admins_coins
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


# GET ONE COINS
@coin_routes.route('/<int:coin_id>', methods=['GET'])
def one_coin(coin_id):
    coin = Coin.query.get(coin_id)
    return {"coin": coin.to_dict()}


# ADD NEW COIN
@coin_routes.route('/', methods=['POST'])
def add_coin():
    # get info from request and pass it to the Coin instance
    # form = AddCoinForm()
    # print("######### form ########", request.form)
    # print("######### files ########", request.files)

    # if "obversePhoto" not in request.files:
    #     return {"errors": "image required"}, 400
    # if "reversePhoto" not in request.files:
    #     return {"errors": "image required"}, 400

    obverse_image = request.files["obversePhoto"]
    reverse_image = request.files["reversePhoto"]

    if obverse_image == 'null' or obverse_image == 'undefined':
        obverse_image = None
    if reverse_image == 'null' or reverse_image == 'undefined':
        reverse_image = None

    if not allowed_file(obverse_image.filename):
        return {"errors": "file type not permitted"}, 400
    if not allowed_file(reverse_image.filename):
        return {"errors": "file type not permitted"}, 400

    obverse_image.filename = get_unique_filename(obverse_image.filename)
    reverse_image.filename = get_unique_filename(reverse_image.filename)

    upload_obverse = upload_file_to_s3(obverse_image)
    upload_reverse = upload_file_to_s3(reverse_image)

    # print("hello *&*&*&*&*&*^*^&*^*^&*&^*&^*&^*&*&^*")
    # print(obverse_image.filename, reverse_image)
    # print("hello *&*&*&*&*&*^*^&*^*^&*&^*&^*&^*&*&^*")
    # print(upload_obverse, upload_reverse)

    if "url" not in upload_obverse:
        return upload_obverse, 400
    if "url" not in upload_reverse:
        return upload_reverse, 400

    url_obverse = upload_obverse["url"]
    url_reverse = upload_reverse["url"]

    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    print("$$$$$$$$$$$$$$$$$$", request.form)
    coin = Coin(
        name=request.form['name'],
        obverse_photo=url_obverse,
        reverse_photo=url_reverse,
        country=request.form['country'],
        # is_collectible=request.form['isCollectible'],
        series=request.form['series'],
        year=request.form['year'],
        mintage=request.form['mintage'],
        value=request.form['value'],
        composition=request.form['composition'],
        weight=request.form['weight'],
        diameter=request.form['diameter'],
        thickness=request.form['thickness'],
        shape=request.form['shape'],
        orientation=request.form['orientation'],
        user_id=current_user.id
    )
    print(coin)
    db.session.add(coin)
    db.session.commit()
    return {"coin": coin.to_dict()}


# EDIT COIN
@coin_routes.route('/<int:coin_id>/', methods=['PUT'])
def edit_coin(coin_id):
    if not current_user.is_authenticated:
        return {'errors': ['Unauthorized']}

    # print("request files", request.files)
    # print("request json", request.form["obversePhoto"])
    if request.form["obversePhoto"] != 'undefined' or request.form["reversePhoto"] != 'undefined':
        url_obverse = request.form["obversePhoto"]
        url_reverse = request.form["reversePhoto"]
    else:
        obverse_image = request.files["obversePhoto"]
        reverse_image = request.files["reversePhoto"]

        if obverse_image == 'null' or obverse_image == 'undefined':
            obverse_image = None
        if reverse_image == 'null' or reverse_image == 'undefined':
            reverse_image = None

        if not allowed_file(obverse_image.filename):
            return {"errors": "file type not permitted"}, 400
        if not allowed_file(reverse_image.filename):
            return {"errors": "file type not permitted"}, 400

        obverse_image.filename = get_unique_filename(obverse_image.filename)
        reverse_image.filename = get_unique_filename(reverse_image.filename)

        upload_obverse = upload_file_to_s3(obverse_image)
        upload_reverse = upload_file_to_s3(reverse_image)

        if "url" not in upload_obverse:
            return upload_obverse, 400
        if "url" not in upload_reverse:
            return upload_reverse, 400

        url_obverse = upload_obverse["url"]
        url_reverse = upload_reverse["url"]

    coin = Coin.query.get(coin_id)

    coin.name = request.form['name']
    coin.obverse_photo = url_obverse
    coin.reverse_photo = url_reverse
    coin.country = request.form['country']
    coin.series = request.form['series']
    coin.year = request.form['year']
    coin.mintage = request.form['mintage']
    coin.value = request.form['value']
    coin.composition = request.form['composition']
    coin.weight = request.form['weight']
    coin.diameter = request.form['diameter']
    coin.thickness = request.form['thickness']
    coin.shape = request.form['shape']
    coin.orientation = request.form['orientation']

    # db.session.commit()
    return {"coin": coin.to_dict()}


# DELETE COIN
@coin_routes.route('/<int:coin_id>/', methods=['DELETE'])
def dm_delete(coin_id):
    coin = Coin.query.get(coin_id)
    # collections = coin_collections.query.all()
    # print(collections)
    db.session.delete(coin)
    db.session.commit()

    return {'coin': coin.to_dict()}


# ADD COIN TO COLLECTION
@coin_routes.route('/<int:coinId>/', methods=['POST'])
def add_coin_to_collection(coinId):
    # print("#################", coinId)

    coin = Coin.query.get(coinId)
    collection = Collection.query.get(request.json)
    # print(collection)
    coin.in_collections.append(collection)
    db.session.commit()
    return {"coin": coin.to_dict(),
            "collection": collection.to_dict()}
