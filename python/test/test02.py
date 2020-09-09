#!/usr/bin/python
import requests
import urllib
import json

s=requests.Session()
s.auth=('admin','welcome1')
s.verify=False #disables SSL certificate verification
s.headers.update({'Accept': 'application/json', 'Content-Type': 'application/json'})
baseUri='https://10.60.114.141:7002/ovm/core/wsapi/rest'

#r=s.get(baseUri+'/Server')
r=s.get(baseUri+'/Vm')

#for server in r.json()['server']:
    # do something with the content
    #print '{name} is {state}'.format(name=i['name'],state=i['serverRunState'])
    #for vms in server['vmIds']:
        #print '{servername} - {vmname}'.format(servername=server['name'],vmname=vms['name'])
        
for vm in r.json()['vm']:
    #servs = json.load(vm['serverId'])
    if vm['vmRunState'] != 'TEMPLATE':
        print '{name} {state} {desc} '.format(name=vm['name'],state=vm['vmRunState'],desc=vm['description'])
    
