from app import app
from flask import jsonify

@app.route('/')
@app.route('/index')
def index():
    tst = {"data": [1]}
    return jsonify(tst)