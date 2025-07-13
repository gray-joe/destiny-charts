import requests
import zipfile
import io
import sqlite3
import os

API_KEY = os.getenv("BUNGIE_API_KEY")
HEADERS = {
    "X-API-Key": API_KEY
}

manifest_url = "https://www.bungie.net/Platform/Destiny2/Manifest/"
response = requests.get(manifest_url, headers=HEADERS)
manifest_data = response.json()

sqlite_path = manifest_data['Response']['mobileWorldContentPaths']['en']
db_zip_url = f"https://www.bungie.net{sqlite_path}"
print("Downloading from:", db_zip_url)

zip_response = requests.get(db_zip_url)
with zipfile.ZipFile(io.BytesIO(zip_response.content)) as zipped_file:
    sqlite_filename = zipped_file.namelist()[0]
    zipped_file.extract(sqlite_filename)
    print(f"Extracted DB file: {sqlite_filename}")

conn = sqlite3.connect(sqlite_filename)
cursor = conn.cursor()

cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tables in DB:", tables)
