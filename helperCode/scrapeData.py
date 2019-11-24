import requests
from bs4 import BeautifulSoup
import json

places_nagaland = []
desc_nagaland = []
places = {}

def web(page, weburl):
    if(page>0):
        url = weburl
        code = requests.get(url)
        plain = code.text
        s = BeautifulSoup(plain, "html.parser")
        
        for link in s.findAll('div', {'class': 'card content-card'}):
            for anchor in link.findAll('a'):
                for header in anchor.findAll('h2', {'class': 'card-heading'}):
                    res = ''.join([i for i in header.text if not i.isdigit()]) 
                    places_nagaland.append(res[3:len(res)-1])
            
            for para in link.findAll('p', {'class': 'card-text'}):
                # para = para.strip()
                desc_nagaland.append(para.text)
            # print(link)

        for i in range(0, len(places_nagaland)):
            places[places_nagaland[i]] = desc_nagaland[i]

        with open ("nagaland.txt", "w") as outfile:
            json.dump(places, outfile, indent=4)

web(1,'https://www.holidify.com/state/nagaland/top-destinations-places-to-visit.html')



