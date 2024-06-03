from app.models import db, User, List, environment, SCHEMA
from sqlalchemy.sql import text


def seed_lists():
    demo = User.query.filter_by(username = 'Demo').first()
    # bobbie = User.query.filter_by(username='bobbie').first()
    lists = [
        List(
            user_id = demo.id, name="Great Coffee & Pastries", description=""
        ),
        List(
            user_id = demo.id, name="Favorite Bars", description=""
        ),
        List(
            user_id = demo.id, name="Fun Stuff", description="Places that are really fun and special."
        )
    ]

    db.session.add_all(lists)
    db.session.commit()

def undo_lists():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.lists RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM lists"))

    db.session.commit()
