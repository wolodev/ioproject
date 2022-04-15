import scrapy
from time import sleep
import random


class QuotesSpider(scrapy.Spider):
    name = "sephora_products"
    handle_httpstatus_list = [500]
    def start_requests(self):
        file = 'C:/Users/Wiktoria/OneDrive - Uniwersytet Łódzki (1)/semestr VI/inżynieria oprogramowania/links.txt'
        with open(file, 'r') as f:
            urls = f.readlines()
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)
            sleep(random.randint(0, 7))

    def parse(self, response):
        # hair_type = (response.xpath('/html/body/div[2]/main/div[1]/div[6]/div[2]/div/div/text()::text').getall())[
        #                 2].split(', '|', and '),
        desc = (response.xpath('/html/body/div[2]/main/div[1]/div[6]/div[2]/div/div/text()').get()).split(', '|', and ')
        yield {
            'product_name': response.css(
                'body > div:nth-child(3) > main > div:nth-child(1) > div.css-9q6f95.e65zztl0 > div:nth-child(1) > h1 > span::text').get(),
            'category': response.css(
                'body > div:nth-child(3) > main > div:nth-child(1) > nav > ol > li:nth-child(1) > a::text').get(),
            'type': response.css(
                'body > div:nth-child(3) > main > div:nth-child(1) > div.css-9q6f95.e65zztl0 > div:nth-child(1) > h1 > a::text').get(),
            'straight': 1 if 'Straight' in desc  else 0,
            'wavy': 1 if 'Wavy' in desc else 0,
            'curly': 1 if 'Curly' in desc else 0,
            'coily': 1 if 'Coily' in desc else 0,
            'fine': 1 if 'Fine' in desc else 0,
            'medium': 1 if 'Medium' in desc else 0,
            'thick': 1 if 'Thick' in desc else 0
        }
