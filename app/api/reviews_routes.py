from flask import Blueprint, jsonify, request, abort, make_response
from flask_login import login_required, current_user
from app.models import db, Review, User, List, Place, List_Review
from sqlalchemy.orm import joinedload

reviews_routes = Blueprint('reviews', __name__)

# Get all reviews of Current User
@reviews_routes.route("/current")
@login_required
def current_user_reviews():
     reviews = Review.query.options(joinedload(Review.place)).filter_by(user_id=current_user.id).all()
     reviews_dicts = []
     for review in reviews:
          review_dict = review.to_dict(include_place=True)
          reviews_dicts.append(review_dict)

     return jsonify(reviews_dicts)

# GET REVIEW BY PLACE ID
@reviews_routes.route("/places/<place_id>")
@login_required
def get_review_by_shop_id(place_id):
    review = Review.query.filter(
            Review.user_id == current_user.id,
            Review.place_id == place_id
        ).first()
    print("REVIEW in back", review)
    if(review):
     return jsonify({"review": review.to_dict()})
    else:
     return jsonify("False")

#GET REVIEW BY REVIEW ID

@reviews_routes.route("/<review_id>")
# @login_required
def get_review_by_reviewid(review_id):
    review = Review.query.options(joinedload(Review.place), joinedload(Review.list_review).joinedload(List_Review.list)).get(review_id)
    # if a review is found turn into a dict
    if(review):
     review_dict = review.to_dict(include_place=True, include_lists=True)
     print("REVIEW_DICT======>", review_dict)
    else:
     return jsonify({"error": "Could not find review"}), 400

    # Check if review can be publicly shared
    if(any(list.get('shareable_by_link') for list in review_dict['lists'])):
       print("SHAREABLE BY LINK ===========>")
       return jsonify(review_dict)
    else:
       print("NOT SHAREABLE ===================================>")
    if(not getattr(current_user, 'id', False)):
       print('FALSE')
       return jsonify({"error": "user must be logged in"}), 400
    else:
       print('=================> True')
       if(review.user_id != current_user.id):
            return jsonify({"error": "Review must belong to current user"}), 400
       else:
        return jsonify(review_dict)



#Update Review
@reviews_routes.route("/<review_id>/update", methods=['PUT'])
@login_required
def update_review(review_id):
    body = request.get_json()
    review_to_update = Review.query.get_or_404(review_id)
    review_to_update.review = body["review"]
    review_to_update.rating = body['rating']
    List_Review.query.filter_by(review_id=review_id).delete()

    new_lists = body['lists']

    for list_id in new_lists:
       new_list_review = List_Review(review_id=int(review_id), list_id=int(list_id))
       db.session.add(new_list_review)


    db.session.commit()


    return jsonify("updated"), 200


# Create Review and Place
@reviews_routes.route("/new", methods=['POST'])
@login_required
def create_review_and_place():

    body = request.get_json()
    print("BODY IN ROUTE===========>", body)

    try:
        selected_place = body['selectedPlace']
        place_id = selected_place['id']
        print("PLACE ID", place_id)

        place = Place.query.get(place_id)

        if not place:
            place_obj = {
                "id": selected_place['id'],
                "displayName": selected_place['displayName'],
                "lat": selected_place['location']['lat'],
                "lng": selected_place['location']['lng'],
                "formattedAddress": selected_place['formattedAddress'],
            }

            if 'editorialSummary' in selected_place:
                place_obj['editorialSummary'] = selected_place['editorialSummary']

            if 'types' in selected_place:
                place_obj['types'] = ','.join(map(str, selected_place['types']))

            if 'googleMapsURI' in selected_place:
                place_obj['googleMapsUri'] = selected_place['googleMapsURI']

            if 'websiteURI' in selected_place:
                place_obj['websiteUri'] = selected_place['websiteURI']

            if 'previewImageUrl' in selected_place:
                place_obj['previewImage'] = selected_place['previewImageUrl']

            place = Place(**place_obj)
            db.session.add(place)
            db.session.commit()

            print("Created place:", place)


        if(place):
          place = place.to_dict()
          new_review = Review(
               place_id = place["id"],
               user_id = current_user.id,
               review = body['review'],
               rating = body['rating']
              )
          db.session.add(new_review)
          db.session.commit()

          new_lists = body['lists']
          for list_id in new_lists:
              new_list_review = List_Review(review_id=int(new_review.id), list_id=int(list_id))
              db.session.add(new_list_review)


          db.session.commit()

        return jsonify(new_review.to_dict())  # Assuming Place model has a to_dict method to serialize to JSON
    except KeyError as e:
        print(f"Missing key: {e}")
        return jsonify({"error": f"Missing key: {e}"}), 400
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred"}), 500

#DELETE REVIEW

@reviews_routes.route("/<review_id>/delete", methods=['DELETE'])
@login_required
def deleteReview(review_id):
   review_to_delete = Review.query.get_or_404(review_id)
   db.session.delete(review_to_delete)
   db.session.commit()
   return jsonify("sucessfully deleted"), 200
