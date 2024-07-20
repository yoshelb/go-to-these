from app.models import db, User, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    demo = User.query.filter_by(username='Demo').first()
    reviews = [
        Review(
            place_id='ChIJTel9dGCAhYARQGwrTfGZ07M', user_id=demo.id, review="Kokkari is seriously so good and such a beautiful homey space.", rating=4
        ),
        Review(
            place_id='ChIJj-FdH-uAhYARIp6mvqK3HNM', user_id=demo.id, review="Bob's is absolutely killer. Hot fresh donuts at midnight on your way home from being out is perfection. Get the boston cream.", rating=5
        ),
        Review(
            place_id='ChIJJ5BEyYqAhYAR2Xim_Tv4XhE', user_id=demo.id, review="Really really good pastries. Beautiful space.", rating=4
        ),
        Review(
            place_id='ChIJ74VF-qaAhYARb0YeIN1ZqEA', user_id=demo.id, review="I love the iced matcha, and the hamloumi salad. The outdoor seating is so pretty.", rating=4
        ),
        Review(
            place_id='ChIJH3-XPzd-j4ARxc5pUq9X8CU', user_id=demo.id, review="Sightglass is a classic. Really nice coffee and beautiful spaces", rating=4
        ),
        Review(
            place_id='ChIJDS_j2Tp-j4ARx1SqQlnrP4U', user_id=demo.id, review="Such a beautiful outdoor space and all the food is really good.", rating=5
        ),
        Review(
            place_id='ChIJZTx2MVOBhYARcUzH3cTQN7I', user_id=demo.id, review="The snowy plover is so odd and so good. Enjoy walking around salesforce park.", rating=4
        ),
        Review(
            place_id='ChIJ90JImRKBhYARXrwUAyZIhqw', user_id=demo.id, review="Rated the best croissant in the country. This location isn't so cute but it's a shorter line.", rating=4
        ),
        Review(
            place_id='ChIJT2cmiPSAhYARwyhb3VgcriM', user_id=demo.id, review="The best most vibey bar. I used to do my homework in the upstairs and drink dark and stormies. It's a truly beloved spot", rating=5
        ),
        Review(
            place_id='ChIJU00uDM6BhYAR_ZOluZ0m4qA', user_id=demo.id, review="Very very fancy bar/ restaurant. It's beautifully done and very close to my house.", rating=3
        ),
        Review(
            place_id='ChIJ10ug_D5-j4ARbGMq_MFoE7s', user_id=demo.id, review="One margarita and you're down for the count. Such a fun classic sf spot", rating=4
        ),
        Review(
            place_id='ChIJp1S1Bo2AhYARewugVNy_l4g', user_id=demo.id, review="Expensive drinks, beautiful view and very fun when they have a big band", rating=4
        ),
        Review(
            place_id='ChIJ1T-IlZiAhYAR5m-Mps4qLFk', user_id=demo.id, review="Get the french 75, sit at the bar and people watch. It's a favorite of the SF Symphony, SF Opera. Such an old school classic spot", rating=4
        ),
        Review(
            place_id='ChIJi2fwgI6AhYARglQgXX2A3WU', user_id=demo.id, review="Voted some of the best cocktails in SF", rating=4
        ),
        Review(
            place_id='ChIJFyM_zj5-j4ARVy4Crc6cSdM', user_id=demo.id, review="It's a chain but it's a great chain. Play some pinball get a boozy shake", rating=4
        ),
        Review(
            place_id='ChIJTx9N3n2AhYARYw-9OmioTfA', user_id=demo.id, review="Ice skating and bowling right down town. It's great", rating=4
        ),
        Review(
            place_id='ChIJk2vl5NSGhYARwPGvs_ubIws', user_id=demo.id, review="I love love love the Thursday night drinks and science experiments. Such a fun place to bring friends", rating=5
        ),
        Review(
            place_id='ChIJCQAzVOKAhYARuOpiALmomu0', user_id=demo.id, review="One of those tourist things that's a genuine golden classic. It was in Princess Diaries. It's super interesting and cheap and fun.", rating=5
        ),
        Review(
            place_id='ChIJr24VivSAhYARld0hcdpSwaI', user_id=demo.id, review="Specs is so perfect. It's in a cute alley. They have a great vibe and music and the culture is 👨🏻‍🍳💋👌. Get a big slice off the cheese wheel.", rating=5
        ),
        Review(
            place_id='ChIJXxpYQvaAhYARTxBaACPjYJM', user_id=demo.id, review="Steepest and most beautiful set of stairs. If you're lucky there will be parrots.", rating=5
        ),
    ]

    db.session.add_all(reviews)
    db.session.commit()


def undo_reviews():
    demo_user = User.query.filter_by(username='Demo').first()
    if demo_user:
        if environment == "production":
            db.session.execute(text(f"DELETE FROM {SCHEMA}.reviews WHERE user_id = :user_id"), {'user_id': demo_user.id})
        else:
            db.session.execute(text("DELETE FROM reviews WHERE user_id = :user_id"), {'user_id': demo_user.id})

        db.session.commit()
    else:
        print("Demo user not found. No reviews to delete.")
