from flask import Blueprint, jsonify, request
from app.models import Coin, Collection, User, db
from app.aws import allowed_file, get_unique_filename, upload_file_to_s3, delete_file_from_s3
from flask_login import current_user, login_user, logout_user, login_required
from app.forms import AddCoinForm

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

    print("hello *&*&*&*&*&*^*^&*^*^&*&^*&^*&^*&*&^*")
    print(obverse_image.filename, reverse_image)
    print("hello *&*&*&*&*&*^*^&*^*^&*&^*&^*&^*&*&^*")
    print(upload_obverse, upload_reverse)

    if "url" not in upload_obverse:
        return upload_obverse, 400
    if "url" not in upload_reverse:
        return upload_reverse, 400

    url_obverse = upload_obverse["url"]
    url_reverse = upload_reverse["url"]

    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():

    coin = Coin(
        # name=form.data['name'],
        # obverse_photo=url_obverse,
        # reverse_photo=url_reverse,
        # country=form.data['country'],
        # is_collectible=form.data['is_collectible'],
        # series=form.data['series'],
        # year=form.data['year'],
        # mintage=form.data['mintage'],
        # value=form.data['value'],
        # composition=form.data['composition'],
        # weight=form.data['weight'],
        # diameter=form.data['diameter'],
        # thickness=form.data['thickness'],
        # shape=form.data['shape'],
        # orientation=form.data['orientation'],
        name=request.form['name'],
        obverse_photo=url_obverse,
        reverse_photo=url_reverse,
        country=request.form['country'],
        is_collectible=request.form['is_collectible'],
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
    )

    # db.session.add(coin)
    # db.session.commit()
    return {"coin": coin.to_dict()}


# EDIT COIN
# @coin_routes.route('/<int:coin_id>', methods=['PUT'])
# def edit_coin(coin_id):

#     if not current_user.is_authenticated:
#         return {'errors': ['Unauthorized']}

#     coin = Coin.query.get(coin_id)
#     coin.name = request.json
#     db.session.commit()
#     return {"coin": coin.to_dict()}
