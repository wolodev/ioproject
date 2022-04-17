import pandas as pd

data = pd.read_csv('crawler_output.csv', sep = ";", encoding='cp1252')
description = data['desc'].str.replace(',', '').str.split(' ')

for i in range(2463, 3031):
    data.loc[i, 'straight'] = 1 if 'Straight' in description[i] else 0
    data.loc[i, 'wavy'] = 1 if 'Wavy' in description[i] else 0
    data.loc[i, 'curly'] = 1 if 'Curly' in description[i] else 0
    data.loc[i, 'coily'] = 1 if 'CoilyHair' in description[i] else 0
    data.loc[i, 'coily'] = 1 if 'Coily' in description[i] else 0
    data.loc[i, 'fine'] = 1 if 'Fine' in description[i] else 0
    data.loc[i, 'medium'] = 1 if 'Medium' in description[i] else 0
    data.loc[i, 'thick'] = 1 if 'Thick' in description[i] else 0

for i in range(32, 915):
    data.loc[i, 'oily'] = 1 if 'Oily' in description[i] else 0
    data.loc[i, 'dry'] = 1 if 'Dry' in description[i] else 0
    data.loc[i, 'normal'] = 1 if 'Normal' in description[i] else 0

skincare_products = data[data['category'] == 'Skincare'].filter(["type","name","brand","img_link","oily","dry","normal"], axis=1)
hair_products = data[data['category'] == 'Hair'].filter(["type","name","brand","img_link",'straight','wavy', 'curly', 'coily', 'fine', 'medium', 'thick'], axis=1)

skincare_products.to_json('./products_data/skincare_products.json', orient='split', index=False)
hair_products.to_json('./products_data/hair_products.json', orient='split', index=False)



