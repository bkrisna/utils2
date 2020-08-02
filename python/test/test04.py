#!/usr/bin/python
import requests
import xmltodict
import json

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)


user='cloudadmin'
passwd='cloudadmin'

s=requests.Session()
#s.auth=('admin','welcome1')
s.verify=False #disables SSL certificate verification
s.headers.update({'Accept': 'application/json', 'Content-Type': 'application/json'})
baseUri='https://' + user + ':' + passwd + '@10.60.114.141/akm/?Action=DescribeAccounts&Version=1&Timestamp=1509692638&Expires=1609692638'
#r=s.get(baseUri+'/Server')
r=s.get(baseUri)

itms = xmltodict.parse(r.content).get('result')
print itms.get('items')
#print itms
for itm in itms['items']:
    #print itm.get('name')
    print itm.get('name') + ' ' + itm.get('account')
