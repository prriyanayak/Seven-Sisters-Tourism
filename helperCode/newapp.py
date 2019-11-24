
import requests
import json
from flask import Flask, request
import operator
import collections

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

def getSimilarPlaces(place, state):
    places = open(state+".txt", "r")
    places = places.read()
    places = json.loads(places)

    # app.logger.warning(places[place])
    
    sw = stopwords.words('english')
    
    original = word_tokenize(places[place])
    original_set = {w for w in original if not w in sw}

    similarities = {}
    for area in places:
        area_list = word_tokenize(places[area])
        area_set = {w for w in area_list if not w in sw}
        l1 = []
        l2 = []

        rvector = original_set.union(area_set)  
        for w in rvector: 
            if w in original_set: l1.append(1) # create a vector 
            else: l1.append(0) 
            if w in area_set: l2.append(1) 
            else: l2.append(0) 
        c = 0
    
        # cosine formula  
        for i in range(len(rvector)): 
                c+= l1[i]*l2[i] 
        cosine = c / float((sum(l1)*sum(l2))**0.5) 
        similarities[area] = cosine
    similarities = sorted(similarities.items(), key=operator.itemgetter(1))
    return similarities

app = Flask(__name__)




@app.route("/getData", methods=['POST', 'GET'])
def time():
    state = request.get_json()
    state = json.loads(state)
    app.logger.warning(state)
    
    data = open(state['state']+".txt", "r")
    data = data.read()
    data = json.loads(data)
    places = list(data.keys())
    app.logger.warning(places)
    return json.dumps(places), 200


@app.route("/getRec", methods=['POST'])
def rec():
    data = request.get_json()
    places = getSimilarPlaces(data['place'], data['state'])
    
    placesforyou = []
    for i in range(len(places)-1, 0, -1):
        placesforyou.append(places[i][0])
    placesforyou = placesforyou[1:4]
    return json.dumps(placesforyou), 200

if __name__ == '__main__':
    app.run(host='127.0.0.1',port=5000,debug=False)
