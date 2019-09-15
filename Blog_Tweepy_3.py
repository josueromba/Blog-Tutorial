#!/usr/bin/env python
# coding: utf-8

# # Import Module

# In[12]:


# -*- coding: utf-8 -*-
print ("Import Module ...")

import argparse
import tweepy
from tweepy import OAuthHandler
from pandas import DataFrame
import pandas as pd
import csv
import time
import json
import pycountry
from countryinfo import CountryInfo
from googletrans import Translator
import ast
import folium
import sys


# # Credentials

# In[2]:


print ("Twitter Authentification ...")

consumer_key = "SUzS76myMblKwcqITIjT74vWH"
consumer_secret = "10SxYJB5109kpHlKaXJUgBmNOue9wqPYlw0yiENzGC0okberM9"
access_token = "2539847237-jLJzRJsAd4OVN92vypXp5BLGCWK8KK2IsmNndj7"
access_secret = "aHbIT1paj7v29eGQHZW4NTDqpuGRkQHa9XfHgevoy1FZM"

auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)
api = tweepy.API(auth, wait_on_rate_limit=True)


# # Command Line

# In[ ]:


parser = argparse.ArgumentParser(prog="tweet-map", description="Number of Tweet by Country on Map")
parser.add_argument("--user", type=str, help="Twitter's Username", required=True)
args = parser.parse_args()


# # Number of Tweet by Country

# In[20]:


print ("Download Tweet ...")
tweet_country = {}
#args.user
for tweet in tweepy.Cursor(api.user_timeline,screen_name='SolomonJnr' ,tweet_mode='extended').items(12000):

    if tweet.place == None:
        pass
    elif tweet.place.country_code in tweet_country:
         tweet_country[tweet.place.country_code] = int(tweet_country[tweet.place.country_code]) + 1
    else:
        tweet_country[tweet.place.country_code] = 1
        
if bool(tweet_country) == False:
    print ("No Geolocation Tweet for User : " + args.user)
    sys.exit()


# In[18]:


for i in tqdm(range(10)):
    pass


# # Get All Info for each Tweet Country

# In[4]:


print ("Get GeoJSON Data by Country ...")

tweet_country_allinfo = []
tweet_delete_country = []
translator = Translator()
for keys in tweet_country:
    country = pycountry.countries.get(alpha_2=keys)
    translation = translator.translate(country.name)
    translation = translation.text
    countryInfo = CountryInfo(translation)
    try:
        tweet_country_allinfo.append(countryInfo.info())
    except:
        tweet_delete_country.append(keys)


# # Delete Country where GeoJSON Data in not available

# In[5]:


delete = tweet_country_allinfo.copy()

for keys in tweet_delete_country:
    tweet_country.pop(keys)

for a in delete:
    if bool(a.get("geoJSON")) == False:
        tweet_country.pop(str(a.get("altSpellings")[0]))
        tweet_country_allinfo.remove(a)


# # Create Country By Number Of Tweet DataFrame - Export To CSV

# In[6]:


print ("Checking Number of Tweet by Country ...")

country_list = []
number_of_tweet_list = []
tweet_country_full_name = tweet_country.copy()

for keys in tweet_country:

    pays = pycountry.countries.get(alpha_2=keys)
    translation = translator.translate(pays.name)
    pays.name = translation.text
    tweet_country_full_name[pays.name] = tweet_country_full_name[keys]
    del tweet_country_full_name[keys]

for key, value in tweet_country_full_name.items():
    country_list.append(key)
    number_of_tweet_list.append(value)

tweet_country_full_name = {"country" : country_list, "number_of_tweet": number_of_tweet_list}

df = pd.DataFrame(tweet_country_full_name)
filename_NbTC = "NbTweet_by_Country_" + args.user + ".csv"
df.to_csv('data/' + filename_NbTC , index=False, encoding='utf-8')


# # Country Data GeoJSON File

# In[7]:


print ("Generate Country Data GeoJSON File ...")
filename_CJson = "country_" + args.user + ".json"
f = open("data/" + filename_CJson, "a")
entete = """{"type":"FeatureCollection","features":[\n"""
f.write(entete)

index = 0
nb_country = len(tweet_country)

for keys in tweet_country_allinfo:
    country_json = keys.get("geoJSON")
    country_json = str(country_json['features'][0])
    country_json = ast.literal_eval(country_json)
    country_json = json.dumps(country_json)
    f.write(str(country_json))
    if (nb_country != 1):
        f.write(',' + '\n')
        nb_country = nb_country - 1

f.write('\n ]}')
f.close()


# # Generate Map of Tweet

# In[11]:


print ("Generate Map of Tweet ...")
state_geo = f'data/'+ filename_CJson
NbTweet_by_Country = f'data/' + filename_NbTC
state_data = pd.read_csv(NbTweet_by_Country, encoding='utf-8')

m = folium.Map(location=[-8.7832, 34.5085], zoom_start=3)

folium.Choropleth(
    geo_data=state_geo,
    name='choropleth',
    data=state_data,
    columns=['country', 'number_of_tweet'],
    key_on='feature.properties.name',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.2,
    legend_name='Nombre de  Tweets (%)'
).add_to(m)

folium.LayerControl().add_to(m) 
filename = "TweetMap_" + args.user + ".html"
m.save("data/" + filename)

print ("Map generated, go to the data folder to display your map ")

