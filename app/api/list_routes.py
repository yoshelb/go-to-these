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


#CREATE A LIST

@list_routes.route("/new", methods=['POST'])
@login_required
def create_list():
    body = request.get_json()

    new_list = List(user_id=current_user.id, name= body['name'], description=body['description'])
    if(new_list):
        db.session.add(new_list)
        db.session.commit()
        # print("NEW LIST", new_list)
        list_dict = new_list.to_dict()
        print("LIST DICT ===========>", list_dict)
        return jsonify(list_dict), 200
    else:
        return jsonify("internal servor errror"), 400

#ADD REVIEW TO A LIST BY LIST ID
@list_routes.route("/<list_id>/reviews/<review_id>/add", methods=['POST'])
@login_required
def add_review(list_id, review_id):
    old_list_review = List_Review.query.filter_by(review_id=review_id, list_id=list_id).first()

    if(not old_list_review):
       new_list_review = List_Review(review_id=int(review_id), list_id=int(list_id))
       db.session.add(new_list_review)
    else:
        db.session.add(old_list_review)

    db.session.commit()
    return jsonify("updated"), 200


# EDIT A LIST

@list_routes.route("/<list_id>/edit", methods=['PUT'])
@login_required
def edit_list(list_id):
    print("HITTING ROUTE", list_id)
    body = request.get_json()
    list_to_update = List.query.get_or_404(list_id)
    list_to_update.name = body["name"]
    list_to_update.description = body["description"]
    db.session.add(list_to_update)
    db.session.commit()

    return jsonify("update sucsessful"), 200




# Edit list by Deleting a REVIEW
@list_routes.route("/<list_id>/reviews/<review_id>/delete", methods=['DELETE'])
@login_required
def remove_review_from_list(list_id, review_id):
    list_review_to_remove = List_Review.query.filter_by(review_id=review_id, list_id = list_id).first()
    if(list_review_to_remove):
        db.session.delete(list_review_to_remove)
        db.session.commit()
        return jsonify("sucessfully removed"), 200

# DELETE A LIST

@list_routes.route("/<list_id>/delete", methods=['DELETE'])
@login_required
def delete_list(list_id):
    list_to_delete = List.query.get_or_404(list_id)
    db.session.delete(list_to_delete)
    db.session.commit()
    return jsonify("sucessfully deleted"), 200
