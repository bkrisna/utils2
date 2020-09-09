#!/usr/bin/python
import requests
import json

from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

s=requests.Session()
s.auth=('admin','welcome1')
s.verify=False #disables SSL certificate verification
s.headers.update({'Accept': 'application/json', 'Content-Type': 'application/json'})
baseUri='https://10.60.114.141:7002/ovm/core/wsapi/rest'

#r=s.get(baseUri+'/Server')
r=s.get(baseUri+'/Vm')
ovm_list = []
for vm in r.json()['vm']:
    if vm['vmRunState'] != 'TEMPLATE':
        vserver = {
            'srvname': vm["serverId"].get("name"),
            'name': vm.get('name'),
            'description': vm.get('description'),
            'status': vm.get('vmRunState'),
            'vcpu': vm.get('cpuCount'),
            'memoryMb': vm.get('memory'),
            'dedicatedStorageMb': '',
            'attachedStorageMb': '',
            'ipAddresses': '',
            'vmos': vm.get('osType'),
            'env': ''
        }
        
        #sname = ""
        print json.dumps(vm, indent=4)
        #print "=================================="
        ovm_list.append(vserver)
        
    #if "serverId" in vm:
        #sname = vm["serverId"].get("name")
    #if "description" in vm:    
        #print '{srvname},{name},{cpu},{mem},{os},{env},{ded_stor},{att_stor},{ipaddr},{desc},{state}'.format(srvname=vm["serverId"].get("name"),name=vm['name'],cpu=vm['cpuCount'],mem=vm['memory'],os=vm['osType'],env="",ded_stor="",att_stor="",ipaddr="",desc=vm['description'],state=vm['vmRunState'])
    
print json.dumps(ovm_list, indent=4)