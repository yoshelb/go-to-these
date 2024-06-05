from flask import Blueprint, jsonify, request, abort, make_response
from flask_login import login_required, current_user
from app.models import db, Review, User, List, Place, List_Review
from sqlalchemy.orm import joinedload

list_routes = Blueprint('lists', __name__)

# Get lists of Current User
@list_routes.route("/current")
@login_required
def get_all_lists():
     lists = List.query.filter_by(user_id=current_user.id).options(
        joinedload(List.list_review).joinedload(List_Review.review).joinedload(Review.place)
    ).all()
     list_dicts = []
     if(lists):
        for list in lists:
            list_dict = list.to_dict(include_reviews=True)
            list_dicts.append(list_dict)


     return jsonify(list_dicts), 200

#Get List Details by LIST ID
@list_routes.route("/<list_id>")
@login_required
def get_list_by_id(list_id):
    list = List.query.filter_by(user_id=current_user.id, id=list_id).options(
        joinedload(List.list_review).joinedload(List_Review.review).joinedload(Review.place)
    ).first()

    if (not list):
       return jsonify("No List by that Id exists"), 404
    else:
        list_dict = list.to_dict(include_reviews=True)
        return jsonify(list_dict), 200
