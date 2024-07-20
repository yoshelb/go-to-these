from app.models import db, List, Review, List_Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_list_reviews():
    coffee = List.query.filter_by(name="Great Coffee & Pastries").first()
    bars = List.query.filter_by(name="Favorite Bars").first()
    fun = List.query.filter_by(name="Fun Stuff").first()

    kokkari = Review.query.filter_by(place_id='ChIJTel9dGCAhYARQGwrTfGZ07M').first()
    bobs = Review.query.filter_by(place_id='ChIJj-FdH-uAhYARIp6mvqK3HNM').first()
    maison_nico = Review.query.filter_by(place_id='ChIJJ5BEyYqAhYAR2Xim_Tv4XhE').first()
    cafe_reveille = Review.query.filter_by(place_id='ChIJ74VF-qaAhYARb0YeIN1ZqEA').first()
    sightglass = Review.query.filter_by(place_id='ChIJH3-XPzd-j4ARxc5pUq9X8CU').first()
    stable = Review.query.filter_by(place_id='ChIJDS_j2Tp-j4ARx1SqQlnrP4U').first()
    andytown = Review.query.filter_by(place_id='ChIJZTx2MVOBhYARcUzH3cTQN7I').first()
    arsicault = Review.query.filter_by(place_id='ChIJ90JImRKBhYARXrwUAyZIhqw').first()
    vesuvio = Review.query.filter_by(place_id='ChIJT2cmiPSAhYARwyhb3VgcriM').first()
    sprezzatura = Review.query.filter_by(place_id='ChIJU00uDM6BhYAR_ZOluZ0m4qA').first()
    latin_american = Review.query.filter_by(place_id='ChIJ10ug_D5-j4ARbGMq_MFoE7s').first()
    top_of_mark = Review.query.filter_by(place_id='ChIJp1S1Bo2AhYARewugVNy_l4g').first()
    absinthe = Review.query.filter_by(place_id='ChIJ1T-IlZiAhYAR5m-Mps4qLFk').first()
    pch = Review.query.filter_by(place_id='ChIJi2fwgI6AhYARglQgXX2A3WU').first()
    alamo_drafthouse = Review.query.filter_by(place_id='ChIJFyM_zj5-j4ARVy4Crc6cSdM').first()
    ice_rink = Review.query.filter_by(place_id='ChIJTx9N3n2AhYARYw-9OmioTfA').first()
    exploratorium = Review.query.filter_by(place_id='ChIJk2vl5NSGhYARwPGvs_ubIws').first()
    musee = Review.query.filter_by(place_id='ChIJCQAzVOKAhYARuOpiALmomu0').first()
    specs = Review.query.filter_by(place_id='ChIJr24VivSAhYARld0hcdpSwaI').first()
    filbert = Review.query.filter_by(place_id='ChIJXxpYQvaAhYARTxBaACPjYJM').first()

    coffee_reviews = [
        List_Review(
            review_id=bobs.id, list_id=coffee.id
        ),
        List_Review(
            review_id=cafe_reveille.id, list_id=coffee.id
        ),
        List_Review(
            review_id=sightglass.id, list_id=coffee.id
        ),
        List_Review(
            review_id=stable.id, list_id=coffee.id
        ),
        List_Review(
            review_id=andytown.id, list_id=coffee.id
        ),
        List_Review(
            review_id=arsicault.id, list_id=coffee.id
        ),
        List_Review(
            review_id=maison_nico.id, list_id=coffee.id
        ),
    ]

    bar_reviews = [
        List_Review(
            review_id=vesuvio.id, list_id=bars.id
        ),
        List_Review(
            review_id=sprezzatura.id, list_id=bars.id
        ),
        List_Review(
            review_id=latin_american.id, list_id=bars.id
        ),
        List_Review(
            review_id=top_of_mark.id, list_id=bars.id
        ),
        List_Review(
            review_id=absinthe.id, list_id=bars.id
        ),
        List_Review(
            review_id=pch.id, list_id=bars.id
        ),
        List_Review(
            review_id=specs.id, list_id=bars.id
        ),
    ]

    fun_reviews = [
        List_Review(
            review_id=alamo_drafthouse.id, list_id=fun.id
        ),
        List_Review(
            review_id=ice_rink.id, list_id=fun.id
        ),
        List_Review(
            review_id=exploratorium.id, list_id=fun.id
        ),
        List_Review(
            review_id=musee.id, list_id=fun.id
        ),
        List_Review(
            review_id=filbert.id, list_id=fun.id
        ),
    ]

    db.session.add_all(coffee_reviews)
    db.session.add_all(bar_reviews)
    db.session.add_all(fun_reviews)
    db.session.commit()

def undo_list_reviews():
    if environment == "production":
        db.session.execute(text(f"DELETE FROM {SCHEMA}.list_reviews WHERE list_id IN (SELECT id FROM {SCHEMA}.lists WHERE name IN ('Great Coffee & Pastries', 'Favorite Bars', 'Fun Stuff'))"))
    else:
        # For SQLite
        query = """
        DELETE FROM list_reviews
        WHERE list_id IN (SELECT id FROM lists WHERE name IN ('Great Coffee & Pastries', 'Favorite Bars', 'Fun Stuff'))
        """
        db.session.execute(text(query))

    db.session.commit()
