import pandas as pd
import numpy as np

import json
from collections import Counter

from finna_client import FinnaClient as fc
from finna_client import FinnaSearchType as fst

#################################


#### USER INPUT / PARAMETERS ####
search_query = "EEG"
year = 2017              # SLIDER
#################################


fc = fc()
# input: int year
# output: int total entries by year
def get_total_entries_by_yr(year):
    return fc.search(lookfor="",
           search_type=fst.Subject,
           fields=["year"],
           filters=[("main_date_str:"+str(year))],
           page=1,
           limit=100)['resultCount']


def get_response(pg):
    return fc.search(lookfor=search_query,
           search_type=fst.Subject,
           fields=["title", "buildings", "subjects"],
           facets=["author"],
           page=pg,
           limit=100)


def get_num_entry_by_org_size_scores(year):

    total_entries_in_yr = get_total_entries_by_yr(year)

    total_pages = 0
    results = []
    while True:
        response = get_response(total_pages)
        results += response['records']
        total_pages += 1

        # stopping condition
        if len(results) == response['resultCount']:
            break

    num_search_queries = len(results)

    data = json.dumps(results)
    df = pd.read_json(data)

    buildings = []

    for i in range(num_search_queries):
        buildings.append(df['buildings'][i][0]['translated'])

    unique_org = Counter(buildings).keys() # equals to list(set(words))
    num_entries_by_org = Counter(buildings).values() # counts the elements' frequency
    by_org_size_scores = [np.sqrt(x/num_search_queries)*100 for x in num_entries_by_org]

    num_entry_by_org_size_scores = list(zip(unique_org, by_org_size_scores))

    return num_entry_by_org_size_scores




if __name__ == '__main__':
    res = []
    for year in range( 2010, 2019):
        res.append(  get_num_entry_by_org_size_scores(year))

    print(res)
