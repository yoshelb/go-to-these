from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm.attributes import instance_state



class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    place_id = db.Column(db.String(500), db.ForeignKey(add_prefix_for_prod('places.id'), ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    review = db.Column(db.String(800))
    rating = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    place = db.relationship('Place', back_populates='review')
    user = db.relationship('User', back_populates='review')
    list_review = db.relationship('List_Review', back_populates='review', cascade='all, delete-orphan') #one to many and delete review in reviews list if review is deleted

    def to_dict(self, include_place=False):
        state = instance_state(self)

        review_dict = {
        'id': self.id,
        'place_id': self.place_id,
        'user_id': self.user_id,
        'review': self.review,
        'rating': self.rating,
        'created_at': self.created_at,
        'updated_at': self.updated_at,

        }

        if 'user' in state.dict:
            review_dict['user'] = self.user.to_dict() if self.user else None
        if (include_place):
            review_dict['place'] = self.place.to_dict() if self.place else None

        return review_dict
