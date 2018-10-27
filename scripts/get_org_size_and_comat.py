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


def get_entries():
    total_entries_in_yr = get_total_entries_by_yr(year)

    total_pages = 0
    results = []
    while True:
        try:
            response = get_response(total_pages)
            results += response['records']
            total_pages += 1

            # stopping condition
            if len(results) >= response['resultCount']:
                break     
                
        except:
            print("num collected entries: ", len(results))
            print("num expected entries: ", response['resultCount'])
            break
    
    num_search_queries = len(results)
            
    data = json.dumps(results)
    df = pd.read_json(data)
    
    return df

def get_num_entry_by_org_size_scores(df, year):
    num_search_queries = len(df)
    
    buildings = []

    for i in range(num_search_queries):
        buildings.append(df['buildings'][i][0]['translated'])

    unique_org = Counter(buildings).keys() # equals to list(set(words))
    num_entries_by_org = Counter(buildings).values() # counts the elements' frequency
    by_org_size_scores = [np.sqrt(x/num_search_queries)*100 for x in num_entries_by_org]

    num_entry_by_org_size_scores = list(zip(unique_org, by_org_size_scores))

    return num_entry_by_org_size_scores


# co-occurrence matrix, work from 2000 - 2018
def get_cooccurrence_matrix(df):
    #df['subjects'].apply(pd.Series).stack().unique()
    #list(set([a for b in df.val.tolist() for a in b]))

    # toy example
    # sample = [[[1]],[[1,1]],[[1,1,1]]]
    # pd.DataFrame(sample).values.argmax()

    #num_search_queries = len(df)
    #idx_of_max_num_subjects = df['subjects'].values.argmax()
    #len(df.loc[idx_of_max_num_subjects]['subjects'])

    # to lowercase and strip ( . )
    # toy example
    # sample = [[[["Aa"]]],[[["Bb"]]],[[["Cc."],["Dd"]]]]
    # pd.DataFrame(sample).loc[2][0][0][0].lower().replace('.','')

    subjects = [a[0].lower().replace('.','') for b in df['subjects'].tolist() for a in b]

    unique_subject_list = list(set(subjects))
    len(unique_subject_list)

    subject_frequency = Counter(subjects).most_common() # counts the elements' frequency

    # more data cleaning -> plural cases

    # get the top commonly seen keywords occurring with the search query
    TOP_VALUES = 10

    key_subjects = []
    for i in range(TOP_VALUES):
        key_subjects.append(subject_frequency[i][0])

    mat = np.zeros((len(df['subjects']), len(key_subjects)))


    #subjects_by_publication
    for x in range(len(df['subjects'])):
        for y in range(len(key_subjects)):
            for idx in range(len(df['subjects'][x])):
                if df['subjects'][x][idx][0].lower().replace('.','') == key_subjects[y]:
                    mat[x][y] += 1

    co_mat = pd.DataFrame(mat.T.dot(mat), columns=key_subjects).astype(int)
    np.fill_diagonal(co_mat.values, 0) # fill diagonal with 0

    return co_mat

#df = get_entries()
#get_num_entry_by_org_size_scores(df, year)
#get_cooccurrence_matrix(df)

if __name__ == '__main__':
    res = []
    for year in range( 2010, 2019):
        res.append(  get_num_entry_by_org_size_scores(year))

    print(res)
