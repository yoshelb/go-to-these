from flask import Blueprint, jsonify, request, abort, make_response
from flask_login import login_required, current_user
from app.models import db, Review, User, List
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
