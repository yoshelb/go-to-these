from app.models import db, User, List, environment, SCHEMA
from sqlalchemy.sql import text


def seed_lists():
    demo = User.query.filter_by(username='Demo').first()
    lists = [
        List(
            user_id=demo.id, name="Great Coffee & Pastries", description=""
        ),
        List(
            user_id=demo.id, name="Favorite Bars", description=""
        ),
        List(
            user_id=demo.id, name="Fun Stuff", description="Places that are really fun and special."
        )
    ]

    db.session.add_all(lists)
    db.session.commit()

def undo_lists():
    demo_user = User.query.filter_by(username='Demo').first()
    if environment == "production":
        db.session.execute(text(f"DELETE FROM {SCHEMA}.lists WHERE user_id = :user_id"), {'user_id': demo_user.id})
    else:
        db.session.execute(text("DELETE FROM lists WHERE user_id = :user_id"), {'user_id': demo_user.id})

    db.session.commit()
