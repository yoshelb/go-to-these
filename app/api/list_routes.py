from flask import Blueprint, jsonify, request, abort, make_response, render_template, url_for
from flask_login import login_required, current_user
from app.models import db, Review, User, List, Place, List_Review
from sqlalchemy.orm import joinedload

list_routes = Blueprint('lists', __name__)

# List of common crawler user agents
CRAWLER_USER_AGENTS = [
    'facebookexternalhit', 'twitterbot', 'pinterest', 'slackbot', 'googlebot', 'linkedinbot', 'applebot'
]

def is_crawler(user_agent):
    return any(crawler in user_agent for crawler in CRAWLER_USER_AGENTS)

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

#Get List Preview for Crawlers =====================

@list_routes.route("/<list_id>/preview")
def get_list_preview(list_id):
    list = List.query.options(
        joinedload(List.list_review).joinedload(List_Review.review).joinedload(Review.place)
    ).get(list_id)

    if not list:
        return jsonify("No List by that Id exists"), 404


    if(not list_dict['shareable_by_link']):
        preview_image =  url_for('static', filename='images/not-public.png')

        return render_template('list_detail.html', list_data={
        'title': 'List Not Public',
        'description': 'Sorry this list is not public 😿! If someone shared this link with ask them to make it public.',
        'image': '/',
        'url': request.url
    })

    list_dict = list.to_dict(include_reviews=True)
    preview_image = list_dict['reviews'][0]['place']['previewImage'] if list_dict['reviews'] else url_for('static', filename='images/default-list-img.png')

    return render_template('list_detail.html', list_data={
        'title': list_dict['name'],
        'description': list_dict['description'],
        'image': preview_image,
        'url': request.url
    })

#Get List Details by LIST ID
@list_routes.route("/<list_id>")
# @login_required
def get_list_by_id(list_id):
    list = List.query.options(
        joinedload(List.list_review).joinedload(List_Review.review).joinedload(Review.place)
    ).get(list_id)

    if (not list):
       return jsonify("No List by that Id exists"), 404
    else:
        list_dict = list.to_dict(include_reviews=True)

        if(list_dict['shareable_by_link'] == True):
           # Detect if the request is from a crawler or if the preview parameter is set
          return jsonify(list_dict), 200
        else:
            # if not shareble and not signed in return an error
            if(not getattr(current_user, 'id', False)):
                print('FALSE')
                return jsonify({"error": "user must be logged in"}), 400
            else:
                if(list.user_id != current_user.id):
                    return jsonify({"error": "List must belong to current user"}), 400
                else:
                    return jsonify(list_dict), 200




#CREATE A LIST

@list_routes.route("/new", methods=['POST'])
@login_required
def create_list():
    body = request.get_json()

    new_list = List(user_id=current_user.id, name= body['name'], description=body['description'], shareable_by_link=body['shareable_by_link'])
    if(new_list):
        db.session.add(new_list)
        db.session.commit()
        # print("NEW LIST", new_list)
        list_dict = new_list.to_dict()
        # print("LIST DICT ===========>", list_dict)
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
    list_to_update.shareable_by_link = body["shareable_by_link"]
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
