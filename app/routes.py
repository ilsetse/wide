from app import app
from flask import jsonify
from scripts.get_org_size_and_comat import *


@app.route('/')
@app.route('/index')
def index():
    df = get_entries(2017)
    bubble = get_num_entry_by_org_size_scores(df, 2017)
    tst = {"data": [bubble]}
    return jsonify(tst)

@app.route('/?query=<data>')
def query():
    result = { "data" : []}
    return jsonify(result)
