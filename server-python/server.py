
import urllib
import requests
from bs4 import BeautifulSoup
from flask import Flask, send_from_directory, current_app, request, render_template
from nocache import nocache
import json

app = Flask(__name__,  static_url_path='/public/')

TPB_URL = 'https://thepiratebay.org'

app.config['RESULT_STATIC_PATH'] = "public/"

# Takes in query
# Returns BeautifulSoup object
def tpb_search(query):

    print('Search Start')
    #req = urllib.request.Request(TPB_URL + query, headers={'User-Agent' : "Magic Browser"})
    print('Search Finished')
    search = bytes.decode(urllib.request.urlopen(req).read())
    print('Search Decoded')

    return BeautifulSoup(search, 'lxml')

# Takes in query
# Returns BeautifulSoup object
def tpb_torrent(query):
    req = urllib.request.Request(TPB_URL + '/search/' + query + '/0/99/0', headers={'User-Agent' : "Magic Browser"}) 
    search = bytes.decode(urllib.request.urlopen(req).read())

    return BeautifulSoup(search, 'lxml')

@app.route('/')
@nocache
def get_index():
    return render_template('index.html')

@app.route('/bundle.js')
def get_bundle():
    return send_from_directory('templates', 'bundle.js')

@app.route("/api/tpb/search")
def api_tpb_movies():
    req = urllib.request.Request(TPB_URL + '/search/' + request.args.get('query') + '/0/99/0', headers={'User-Agent' : "Magic Browser"})
    search = bytes.decode(urllib.request.urlopen(req).read())
    parsed_search = BeautifulSoup(search, 'lxml')

    if (not parsed_search.find('table')):
        return []

    rows = parsed_search.find('table').find_all('tr')
    rows.pop(0)
    return_list = []

    for torrent in rows:
        torrent = torrent.findChildren()[5:]

        inner_info = list(filter(lambda x: x != '\n', torrent[0]))

        torrent_time_size = torrent[len(torrent) - 4].contents[0]

        if (not inner_info[3].find('img')):
            torrent_user_status = 'NONE'
        else:
            torrent_user_status = inner_info[3].find('img')['title'] 

        return_data = {
            "name": inner_info[0].find('a').contents[0],
            "info_link" : inner_info[0].find('a')['href'].split('/')[2],
            "magnet": inner_info[1]['href'],
            "user": torrent[len(torrent) - 3].contents[0],
            "user_status": torrent_user_status,
            "seeders": torrent[len(torrent) - 2].contents[0],
            "leechers": torrent[len(torrent) - 1].contents[0],
            "time": torrent_time_size.split(',')[0].replace('Uploaded ', ''),
            "size": torrent_time_size.split(',')[1].replace('Size ', '')[1:],
        }

        return_list.append(return_data)

    return json.dumps(return_list)

@app.route("/api/tpb/torrent")
def api_tpb_torrent():
    req = urllib.request.Request(TPB_URL + '/torrent/' + request.args.get('query'), headers={'User-Agent' : "Magic Browser"})
    search = bytes.decode(urllib.request.urlopen(req).read())
    parsed_search = BeautifulSoup(search, 'lxml')

    details = parsed_search.find(id='details')

    if (not details):
        return []

    print(details)

    col1 = details.find(class_='col1').find_all('dd')
    col2 = details.find(class_='col2').find_all('dd')

    if (col2):
        date = col2[0].contents[0]
    else:
        date = 'unknown'

    return_data = {
        "description": details.find('pre').contents[0],
        "files": col1[1].find('a').contents[0],
        "size": col1[2].contents[0].split('(')[1].replace('Bytes)', '')[:-1],
        "spoken_language" : col1[3].contents[0],
        "texted_language" : col1[4].contents[0],
        "date": date,
    }
    
    return json.dumps(return_data)