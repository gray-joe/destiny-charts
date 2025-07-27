from flask import Flask, redirect, request, url_for
import requests
import os

app = Flask(__name__)

CLIENT_ID = os.getenv('BUNGIE_CLIENT_ID')
CLIENT_SECRET = os.getenv('BUNGIE_CLIENT_SECRET')
API_KEY = os.getenv('BUNGIE_API_KEY')

REDIRECT_URI = 'http://localhost:5000/callback'
TOKEN_URL = 'https://www.bungie.net/Platform/App/OAuth/Token/'
AUTH_URL = 'https://www.bungie.net/en/OAuth/Authorize'

@app.route('/')
def home():
    auth_redirect_url = f'{AUTH_URL}?client_id={CLIENT_ID}&response_type=code'
    return redirect(auth_redirect_url)

@app.route('/callback')
def callback():
    code = request.args.get('code')
    if not code:
        return "Authorization failed: No code in callback", 400

    data = {
        'grant_type': 'authorization_code',
        'code': code,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    }

    headers = {
        'Authorization': f'Bearer {access_token}',
        'X-API-KEY': API_KEY
    }

    user_info_resp = requests.get(
        'https://www.bungie.net/Platform/User/GetMembershipsForCurrentUser/',
        headers=headers
    )

    if user_info_resp.status_code != 200:
        return f"Failed to get user info: {user_info_resp.status_code}\n{user_info_resp.text}", 500

    user_data = user_info_resp.json()
    return {
        'access_token': access_token,
        'refresh_token': refresh_token,
        'user_memberships': user_data['Response']['destinyMemberships']
    }

if __name__ == '__main__':
    app.run(debug=True)

