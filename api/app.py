from flask import Flask, jsonify
from flask_cors import CORS
from backend import login
from backend import get_random_artist
from backend import get_artist_info

app = Flask(__name__)
CORS(app)

# Global variable to store the logged-in user
user = None

# Login only once when the application starts
def initialize():
    global user
    user = login()

# Call the initialize function when the application starts
initialize()

@app.route('/data')
def data():
    global user
    artist = get_random_artist()
    data = get_artist_info(user, artist)
    return jsonify(data)

if __name__ == '__main__':
    CORS(app, origins=['http://localhost:3000'])
    app.run(debug=True, port=5000)