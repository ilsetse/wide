from app import app
from flask import jsonify, request
from scripts.get_org_size_and_comat import *


@app.route('/query/<beginYear>/<endYear>/<keyword>')
def query(beginYear, endYear, keyword):
    #search_query = request.args.get('query')
    print(beginYear, endYear, keyword)
    bubble = {}
    years = [2016, 2017]
    for year in years:
        print(year)
        df = get_entries(year, keyword)
        tmp = get_num_entry_by_org_size_scores(df, year)
        bubble[str(year)] = tmp

    tst = {"data": [bubble]}
    return jsonify(tst)


