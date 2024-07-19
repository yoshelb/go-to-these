from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', first_name="Demo", last_name='Usinger')
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', first_name="Marnie", last_name='Lady')
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', first_name="Bobbie", last_name='Brown')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    db.session.commit()

# Uses a raw SQL query to DELETE specific users from the users table.
def undo_users():
    if environment == "production":
        # Delete specific users based on their email
        db.session.execute(text(f"DELETE FROM {SCHEMA}.users WHERE email IN ('demo@aa.io', 'marnie@aa.io', 'bobbie@aa.io')"))
    else:
        db.session.execute(text("DELETE FROM users WHERE email IN ('demo@aa.io', 'marnie@aa.io', 'bobbie@aa.io')"))

    db.session.commit()
