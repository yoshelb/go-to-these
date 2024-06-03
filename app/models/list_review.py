from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime



class List_Review(db.Model):
    __tablename__ = 'list_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id'), ondelete='CASCADE'), nullable=False)
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id'), ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    review = db.relationship('Review', back_populates='list_review')
    list = db.relationship('List', back_populates='list_review')

    def to_dict(self):
        return {
           'id' : self.id,
           'review_id': self.review_id,
           'list_id': self.list_id
        }
