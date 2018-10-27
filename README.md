# Welcome to Wide-Challenge-ACI!


venv\Scripts\activate
pip install -r requirements.txt
flask db upgrade
flask run

Create a user:
username: tester
pw:mothaiba

Get auth token:
http --auth <username>:<password> POST http://localhost:5000/api/tokens

API call with auth token:
http GET http://localhost:5000/api/users/1 \
    "Authorization:Bearer <your token>"
