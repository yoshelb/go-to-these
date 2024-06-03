from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm.attributes import instance_state



class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(100))
    friends_view = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    user = db.relationship('User', back_populates='list')

    list_review = db.relationship('List_Review', back_populates='list', cascade='all, delete-orphan') #one to many and delete list in reviews_list if list is deleted

    def to_dict(self):
        state = instance_state(self)

        list_dict = {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
            'description': self.description,
            'friends_view': self.friends_view,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
        if 'users' in state.dict:
            list_dict['user'] = self.user.to_dict() if self.user else None

        return list_dict
# how can I get every review back that belongs with a particular list? Maybe that's a good reason to do a join table? need to look that up.
