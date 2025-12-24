import os
from flask import Flask, session, redirect, url_for, request
from dotenv import load_dotenv  # AF 12/23/25 - Allows us to import variables from .env file
from spotipy import Spotify
from spotipy.oauth2 import SpotifyOAuth
from spotipy.cache_handler import FlaskSessionCacheHandler

load_dotenv()

app = Flask(__name__) # AF 8/26/25 - Creating Flask session to hold our access token to interact with the Spotify API
app.config['SECRET_KEY'] = os.getenv('FLASK_SC') # AF 12/23/25 - Use secret key to encrypt session data  

_client_id = os.getenv('CLIENT_ID')
_client_secret = os.getenv('CLIENT_SECRET')
_redirect_uri = os.getenv('REDIRECT_URI')
_scope = 'playlist-read-private' # AF 8/26/25 - Permissions we want our app to access


#-------- OAUTH W/ Spotipy Wrapper --------#

_cache_handler = FlaskSessionCacheHandler(session)  # AF 8/27/25 - We store access token in the Flask session

# AF 8/27/25 - Parameters are passed to authenticate with the Spotify API

oauth_manager = SpotifyOAuth(
    client_id=_client_id,
    client_secret=_client_secret,
    redirect_uri=_redirect_uri,
    scope=_scope,
    cache_handler=_cache_handler,
    show_dialog=True
)

sp = Spotify(auth_manager=oauth_manager)


#-------- Endpoints --------#


@app.route('/')
def home():
    # AF 8/27/25 - Checked if user is logged in/check if we have a token in the session that we can use to interact with API
    if not oauth_manager.validate_token(_cache_handler.get_cached_token()):
        auth_url = oauth_manager.get_authorize_url() # AF 8/27/25 - Get the URL to log in with Spotify
        return redirect(auth_url)
    return redirect(url_for('get_playlists'))


@app.route('/callback')
def callback():
    oauth_manager.get_access_token(request.args['code']) # AF 8/27/25 - Stores code from Spotify used to get access token/refesh access token
    return redirect(url_for('get_playlists'))


@app.route('/get_playlists')
def get_playlists():
    if not oauth_manager.validate_token(_cache_handler.get_cached_token()):
        auth_url = oauth_manager.get_authorize_url() # AF 8/27/25 - Get the URL to log in with Spotify
        return redirect(auth_url)
    
    playlists = sp.current_user_playlists()
    playlists_info = [(pl['name'], pl['external_urls']) for pl in playlists['items']]
    playlists_html ='<br>'.join([f'{name}:{url}' for name, url in playlists_info]) 
    
    return playlists_html


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('home'))



if __name__ == '__main__': 
    app.run(debug=True)

