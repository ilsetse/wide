from app import app
from flask import jsonify, request
from scripts.get_org_size_and_comat import *

@app.route('/query/<beginYear>/<endYear>/<keyword>')
def query(beginYear, endYear, keyword):
    #print(beginYear, endYear, keyword)
    bubble = {}
    comat = {}
    df = {}
    for year in range(int(beginYear), int(endYear)+1):
        print(year)
        df[str(year)] = get_entries(year, keyword)
        bubble[str(year)] = get_num_entry_by_org_size_scores(df[str(year)], year)
        comat[str(year)] = get_cooccurrence_matrix(df[str(year)])


    output = {
        "bubble" : bubble,
        "comat" : comat
    }
    return jsonify(output)


