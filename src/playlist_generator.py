import os
from flask import Flask, session 
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__) # AF 8/26/25 - Creating Flask session to hold our access token to interact with the Spotify API
app.config['SECRET_KEY'] = os.getenv('FLASK_SC')

client_id = os.getenv('CLIENT_ID')
client_secret = os.getenv('CLIENT_SCECRET')
redirect_uri = os.getenv('REDIRECT_URI')
scope = 'playlist-read-private' # AF 8/26/25 - Permissions we want our app to access

if __name__ == '__main__':
    app.run(debug=True)

# AF 8/26/25 - Start OAuth 