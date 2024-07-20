from flask.cli import AppGroup
from .users import seed_users, undo_users
from .places import seed_places, undo_places
from .reviews import seed_reviews, undo_reviews
from .list import seed_lists, undo_lists
from .list_review import seed_list_reviews, undo_list_reviews
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_places()
        undo_reviews()
        undo_lists()
        undo_list_reviews()
    seed_users()
    # Add other seed functions here
    seed_places()
    seed_reviews()
    seed_lists()
    seed_list_reviews()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_list_reviews()
    undo_lists()
    undo_reviews()
    undo_places()
    undo_users()



    # Add other undo functions here
