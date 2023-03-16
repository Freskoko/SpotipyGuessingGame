import spotipy
from spotipy.oauth2 import SpotifyOAuth
import dotenv
import random

def login():

    dotenv.load_dotenv()

    scope = "user-library-read user-modify-playback-state streaming user-top-read user-library-modify"

    sp = spotipy.Spotify(auth_manager=SpotifyOAuth(scope=scope))

    return sp

def get_artist_info(user,artist_name):

    artist_dict = {}
        
    results = user.search(q='artist:' + artist_name, type='artist')
    items = results['artists']['items']
    if len(items) > 0:
        
        artist = items[0]

        
        trackinfo = (user.artist_top_tracks(artist["uri"],country = "NO"))

        randomsong = random.choice(trackinfo["tracks"])

        #-----------------

        artist_dict["artist"] = artist["name"]
        artist_dict["name"] = randomsong["name"]
        artist_dict["popularity"] = randomsong["popularity"]
        artist_dict["image"] = artist['images'][0]['url']

    return artist_dict

def get_random_artist():
    with open("data/artists.txt","r", encoding='latin-1') as f:
        artist = random.choice(f.readlines())

        return artist
    

def guessing_game(artist1,artist2):
    
    print(1)
    print(artist1["artist"])
    print(artist1["name"])

    print("-----------")

    print(2)
    print(artist2["artist"])
    print(artist2["name"])
    print("-----------")

    userinp = input("What is the most popular one CURRENTLY ? 1 or 2?")

    if userinp == "1":
        if artist1["popularity"] >= artist2["popularity"]:
            print("correct!")
        else:
            print("nope")

    if userinp == "2":
        if artist2["popularity"] >= artist1["popularity"]:
            print("correct!")
        else:
            print("nope")

    print("-----------")
    print(artist1)
    print("-----------")
    print(artist2)
            

    
if __name__ == "__main__":

    user = login()

    randomArtist = get_random_artist()
    artist1 =get_artist_info(user,randomArtist)

    randomArtist = get_random_artist()
    artist2 =get_artist_info(user,randomArtist)

    guessing_game(artist1,artist2)




# for j in trackinfo["tracks"]:
#     # print(j["name"])
#     # print(j["popularity"])
#     # print(j["duration_ms"])
    

#     for n,m in j.items():
#         # print("\n")
#         print(n , m)

#     break
    


# print(artist)