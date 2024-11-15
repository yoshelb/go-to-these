import os
from flask import Flask,  Response, render_template, request, session, redirect, jsonify, url_for
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager
from .models import db, User, List, List_Review, Review
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.reviews_routes import reviews_routes
from .seeds import seed_commands
from .config import Config
from .api.list_routes import list_routes
from sqlalchemy.orm import joinedload
from .models.place import Place
import requests
import os

API_KEY = os.environ.get('GOOGLE_API_KEY')


template_folder_path = os.path.join(os.path.dirname(__file__), 'templates')
print(f"Template folder path: {template_folder_path}")

app = Flask(__name__, static_folder='../react-vite/dist', static_url_path='/', template_folder=template_folder_path)

print(f"List of templates: {os.listdir(template_folder_path)}")

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(reviews_routes, url_prefix='/api/reviews')
app.register_blueprint(list_routes, url_prefix='/api/lists')
db.init_app(app)
Migrate(app, db)

# Application Security
CORS(app)
def fetch_place_photo(place_id):
    url = f"https://places.googleapis.com/v1/places/{place_id}?fields=photos&key={API_KEY}"

    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        photo = data.get("photos")[0].get("name")
        # print(photo)
        photo_uri = f"https://places.googleapis.com/v1/{photo}/media?maxWidthPx=800&maxHeightPx=800&key={API_KEY}"

        return photo_uri
    else:
        print(f"Error: {response.status_code}")
        return None


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.cli.command("run-script")
def run_script():
    # Place your script logic here
    print("Running custom script...")
    # Example: accessing the database or doing some task
    # db.session.add(...) or any other operations

    places = Place.query.all()
    for place in places:
        place_data = place.to_dict()
        # previewImage = place_data.get("previewImage")
        # try:
        #     response = requests.get(previewImage)
        #     if response.status_code == 400:
        #         print(f"Image URL for Place {place.id} returned 400. Updating image...")
        #         # Update image logic here (e.g., setting a default image)
        #         place.previewImage = "https://cdn.pixabay.com/photo/2024/01/31/10/02/kitten-8543762_960_720.jpg"  # Set a fallback image URL
        new_preview_image = fetch_place_photo(place_data.get("id"))
        place.previewImage = new_preview_image
        db.session.commit()  # Save the changes to the database
        # except requests.exceptions.RequestException as e:
        #     print(f"Error accessing image URL for Place {place.id}: {e}")



@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list

@app.route('/lists/<int:list_id>')
def list_detail(list_id):
    print("HITTING LISTS ROUTE========================>")
    """
    This route handles requests for specific list details.
    """

    list = List.query.options(
        joinedload(List.list_review).joinedload(List_Review.review).joinedload(Review.place)
    ).get(list_id)

    if not list:
        return jsonify("No List by that Id exists"), 404

    list_dict = list.to_dict(include_reviews=True)
    print("LIST DICT DESCRIPTION===========>", list_dict['description'])

    file_path = os.path.join(app.static_folder, 'index.html')

    with open(file_path, 'r') as file:
        content = file.read()

    if not list_dict['shareable_by_link']:

        meta_tags = f"""
        <meta property="og:title" content="Places list" />
        <meta property="og:description" content="Check out these places" />
        <meta property="og:image" content="https://www.gotothese.com/default-list.png" />
        <meta property="og:url" content="{request.url}" />
        """
    else:
        preview_image = list_dict['reviews'][0]['place']['previewImage'] if list_dict['reviews'] else 'https://www.gotothese.com/default-list.png'

        meta_tags = f"""
        <meta property="og:title" content="{list_dict['name']}" />
        <meta property="og:description" content="{list_dict['description']}" />
        <meta property="og:image" content="{preview_image}" />
        <meta property="og:url" content="{request.url}" />
        """

    modified_content = content.replace('</head>', f'{meta_tags}</head>')

    return Response(modified_content, mimetype='text/html')



@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """

    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')

        # Check if the path matches the pattern /lists/<list_id>

    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
