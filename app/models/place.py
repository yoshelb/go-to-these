from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.orm.attributes import instance_state



class Place(db.Model):
    __tablename__ = 'places'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.String(500), primary_key=True)
    editorialSummary = db.Column(db.String(500))
    displayName = db.Column(db.String(100))
    types = db.Column(db.String(500))
    formattedAddress = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Numeric)
    lng = db.Column(db.Numeric)
    googleMapsUri = db.Column(db.String(1000))
    websiteUri = db.Column(db.String(1000))
    previewImage = db.Column(db.String(1000))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    review = db.relationship('Review', back_populates='place', cascade='all, delete-orphan') #one to many and delete review if place is deleted



    def to_dict(self, include_reviews = False):
        state = instance_state(self)

        place_dict = {
            'id': self.id,
            'editorialSummary': self.editorialSummary,
            'displayName': self.displayName,
            'types': self.types,
            'formattedAddress': self.formattedAddress,
            'lat': self.lat,
            'lng': self.lng,
            'googleMapsUri': self.googleMapsUri,
            'websiteUri': self.websiteUri,
            'previewImage': self.previewImage,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
        if(include_reviews):
            place_dict['review'] = [rev.to_dict() for rev in self.review] if self.review else None

        return place_dict
