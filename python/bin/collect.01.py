#!/usr/local/bin/python2.7

import requests
import xmltodict
import json
import urllib
import OpenSSL
import base64
import time as time_
import datetime

from datetime import date
from urllib import urlencode
from OpenSSL import crypto
from requests.packages.urllib3.exceptions import InsecureRequestWarning
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

#####################################
# calculate current milisecond
# return:
# - milisecond value
#####################################  
def millis():
    return int(round(time_.time() * 1000)) 

#####################################
# load private key from file
# return:
# - pkey object
#####################################  
def get_priv_key():
    priv_key_file = '/root/script/utils/bin/privkey.pem'
    key_file = open(priv_key_file, "r")
    key = key_file.read()
    key_file.close()
    password = ""

    if key.startswith('-----BEGIN '):
        pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, key, password)
    else:
        pkey = crypto.load_pkcs12(key, password).get_privatekey()
        
    return pkey
    
#####################################
# load public key from file
# return:
# - pkey object
#####################################  
def get_pub_key():
    public_key_file='/root/script/utils/bin/pubkey.pem'
    key_file = open(public_key_file, "r")
    key = key_file.read()
    key_file.close()
    password = ""
    #print key
    if key.startswith('-----BEGIN '):
        pkey = crypto.load_publickey(crypto.FILETYPE_PEM, key)
    else:
        pkey = crypto.load_pkcs12(key, password).get_publickey()
    return pkey

#####################################
# prepare query string for akm request
# return:
# - string query
#####################################  
def prep_akm_query (act, addact=None):
    vers = '1'
    timestamp = millis()
    exp = timestamp + 300000
    qs = {
        'Action' : act,
        'Version' : vers,
        'Timestamp' : timestamp,
        'Expires' : exp
    }
    
    if addact is not None:
        qs.update(addact)
        
    return urlencode(qs)

#####################################
# emoc akm call
# return:
# - result dict
#####################################  
def get_akm_request( usr, paswd, hst, act, addact=None ):
    s=requests.Session()
    s.verify=False #disables SSL certificate verification
    
    #baseUri='https://' + usr + ':' + paswd + '@' + hst + '/akm/?'
    
    if addact is not None:
        qs = prep_akm_query(act, addact)
    else:
        qs = prep_akm_query(act)
    
    baseUri='https://' + usr + ':' + paswd + '@' + hst + '/akm/?'+qs
        
    r=s.get(baseUri)
    itms = xmltodict.parse(r.content).get('result')
    return itms

#####################################
# sign request data for iaas call
# return:
# - string signed data
#####################################  
def get_iaas_signature (data):
    privkey = get_priv_key()
    sign = OpenSSL.crypto.sign(privkey, data, "sha512WithRSAEncryption") 
    return base64.b64encode(sign)

#####################################
# prepare query string for iaas request
# return:
# - string query
#####################################  
def prep_iaas_query (action, host, acc_key_id, addParam=None): 
    vers = '1'
    timestamp = millis()
    exp = timestamp + 300000
    dataqs = {
        'Action' : action,
        'Version' : vers,
        'Timestamp' : timestamp,
        'Expires' : exp,
        'AccessKeyId' : acc_key_id
    }
    
    if addParam is not None:
        dataqs.update(addParam)
    
    sign_data = 'POST\n' + host + '\n' + '/iaas/\n' + urlencode(dataqs) + '\n'
    sign = get_iaas_signature(sign_data) 
    
    signqs = {
        'SignatureMethod' : 'SHA512withRSA',
        'SignatureVersion' : vers,
        'Signature' : sign
    }

    dataqs.update(signqs)
    return urlencode(dataqs)
    
#####################################
# emoc iaas call
# return:
# - result dict
#####################################  
def get_iaas_request(action, host, acc_key_id, addParam=None ):
    s=requests.Session()
    s.verify=False #disables SSL certificate verification
    query = prep_iaas_query (action, host, acc_key_id, addParam)
    baseUri='https://'+ host + '/iaas/?' + query    
    r=s.get(baseUri)
    itms = xmltodict.parse(r.content).get('result')
    return itms

#####################################
# get public key from file
# return:
# - public key
#####################################  
def get_public_key():
    return base64.b64encode(crypto.dump_publickey(crypto.FILETYPE_ASN1, get_pub_key()))
    
#####################################
# register new access key
# return:
# - accessKeyId
#####################################  
def reg_new_key( usr, passwd, hst, acc_id, pubkey):
    act = 'RegisterAccessKey'
    #addact = '&account=' + acc_id + '&publicKey=' + pubkey
    addact = {
        'account' : acc_id,
        'publicKey' : pubkey
    }
    r = get_akm_request( usr, passwd, hst, act, addact )
    return r.get('accessKeyId')

#####################################
# delete access key
# return:
# - accessKeyId
#####################################  
def del_acc_key( usr, passwd, hst, acc_id):
    act = 'DeleteAccessKey'
    addact = {
        'accessKeyId' : acc_id,
    }
    r = get_akm_request( usr, passwd, hst, act, addact )
    return True if r else False

#####################################
# get account list
# return items:
# - account
# - name
# - description (if any)
#####################################
def get_account_list ( usr, passwd, hst ):
    act = 'DescribeAccounts'
    return get_akm_request( usr, passwd, hst, act )
    
#####################################
# get registered key
# return items:
# - accessKeyId
# - account
#####################################
def get_key_list ( usr, passwd, hst ):
    act = 'DescribeAccessKeys'
    return get_akm_request( usr, passwd, hst, act )


#####################################
# get emoc vservers
# return items:
# - accessKeyId
# - account
#####################################
def get_emoc_vserver ( hst, acc_key ):
    act = 'DescribeVservers'
    return get_iaas_request(act, hst, acc_key)

#####################################
# get ip addr
# return items:
# - ip addr
#####################################
def get_ip_addr (ipaddrs):
    ips = ''
    if ipaddrs is not None:
        for ip in ipaddrs:
            if not ip.startswith('172.'):
                if len(ips) > 0:
                    ips = ips + ' '
                ips = ips + ip
    return ips

#############################################################################
# pepare for request string                                                 #
# parameter                                                                 #
# - act : action string (string)                                            #
# - rdata : query data (array)                                              #
# return items:                                                             #
# - query string                                                            #
#############################################################################
def prep_req_query (act, rdata):
    return ('/' + act + '?' + urlencode(rdata)) if rdata else ('/' + act)


#############################################################################
# pepare for request string                                                 #
# parameter                                                                 #
# - act : action string (string)                                            #
# - rdata : query data (array)                                              #
# return items:                                                             #
# - query string                                                            #
#############################################################################
def get_utils_req (url, act, rdata):
    qs = prep_req_query(act, rdata)
    r = s.get(url + qs)
    return r.json()

#############################################################################
# request for login session                                                 #
# parameter                                                                 #
# - username : username (string)                                            #
# - password : password (array)                                             #
# return items:                                                             #
# - True / False                                                            #
#############################################################################
def req_logon (url, username, password):
    ldata= {"username": username, "password": password}
    res = s.post(url + '/auth/login', ldata)
    return res.json()['success']

#############################################################################
# function for create report on db                                          #
# parameter                                                                 #
# - m : month (number - mm)                                                 #
# - y : year (number - yyyy)                                                #
# return items:                                                             #
# - report_id / False                                                       #
#############################################################################
def create_report(url, m, y):
    rdata = { 'mm' : m, 'yy' : y }
    #report_id = ''
    r = get_utils_req(url, 'createReport', rdata)
    
    #if r['success']:
    #    report_id = r['items'].get('report_id')
    #else:
    #    report_id = False
        
    return r['items'].get('report_id') if r['success'] else False

#############################################################################
# function for get report id on db, if not found, then create the report    #
# parameter                                                                 #
# - m : month (number - mm)                                                 #
# - y : year (number - yyyy)                                                #
# return items:                                                             #
# - report_id                                                               #
#############################################################################
def get_report_id(url, m, y):
    rdata = { 'mm' : m, 'yy' : y }
    #qs = prep_req_query('getReportId', rdata)
    #r = s.get(url + qs)
    r = get_utils_req(url, 'getReportId', rdata)
    #is_success = r.json()['success']
    #report_id = ''
    
    #if is_success:
    #    report_id = r.json()['items'].get('report_id')
    #else:
    #    report_id = create_report(m,y)
    
    return r['items'].get('report_id') if r['success'] else create_report(url, m,y)

#############################################################################
# function for get data on db                                               #
# parameter                                                                 #
# - array :                                                                 #
#    - report_id,                                                           #
#    - servername,                                                          #
#    - vmname                                                               #
#    - vmhostname                                                           #
# return items:                                                             #
# - util data / False                                                       #
#############################################################################
def get_data(url, fdata):
    #qs = prep_req_query('getData', fdata)
    #r = s.get(baseUri + qs)
    
    r = get_utils_req(url, 'getData', fdata)
    #is_success = r.json()['success']
    
    #if is_success:
    #    return r.json()['items']
    #else:
    #    return False
    
    return r['items'] if r['success'] else False

#############################################################################
# function for get exabox info from db                                      #
# parameter                                                                 #
# - array :                                                                 #
#    - report url.                                                          #
# return items:                                                             #
# - exa box data / False                                                       #
#############################################################################
def get_exa_box(url):
    r = get_utils_req(url, 'getExaBoxes', False)
    return r['items'] if r['success'] else False

#############################################################################
# function for insert data on db                                            #
# parameter                                                                 #
# - array data.                                                             #
# return items:                                                             #
# - True/False                                                              #
#############################################################################
def insertData(url, rdata):
    r = get_utils_req(url, 'insertData', rdata)
    return r['success']


#############################################################################
# function for update data on db                                            #
# parameter                                                                 #
# - array data.                                                             #
# return items:                                                             #
# - True/False                                                              #
#############################################################################
def updateData(url, rdata):
    #qs = prep_req_query('updateData', rdata)
    #r = s.get(baseUri + qs)
    #is_success = r.json()['success']
    r = get_utils_req(url, 'updateData', rdata)
    return r['success'] 

#############################################################################
# function for insert zfssa usage on db                                     #
# parameter                                                                 #
# - array data.                                                             #
# return items:                                                             #
# - True/False                                                              #
#############################################################################
def insertZfssaData(url, rdata):
    r = get_utils_req(url, 'insertZfssaData', rdata)
    return r['success']

#############################################################################
# function for update data on db                                            #
# parameter                                                                 #
# - operations (str)                                                        #
# - operation status (true/false).                                          #
# - data (str).                                                             #
# return items: 0                                                           #
#############################################################################
def logger(ops, res, data):
    date = datetime.datetime.now();
    datestr = date.strftime("%Y/%m/%d %H:%M:%S.%f")
    print "[ " + datestr + " ][ " + ops + " ][ " + ( "success" if res else "failed" )+ " ][ " + data + " ]"
    return 0

#############################################################################
# function for get vserver data from exalogic - ovmm                        #
# parameter                                                                 #
# - report_id (string)                                                      #
# - exalogic data (array)                                                   #
# return items:                                                             #
# - vm array / False                                                        #
#############################################################################
def get_ovmm_request(action, host, user, passw):
    s.auth = (user, passw)
    s.headers.update({'Accept': 'application/json', 'Content-Type': 'application/json'})
    url = 'https://' + host + ':7002/ovm/core/wsapi/rest/' + action  
    r = s.get(url)
    if r:
        return r.json()['vm']
    else:
        return False


#############################################################################
# function for get vserver data from exalogic - ovmm                        #
# parameter                                                                 #
# - report_id (string)                                                      #
# - ovmm ip (string)                                                        #
# - ovmm user (string)                                                      #
# - ovmm password (string)                                                  #
# return items:                                                             #
# - True / False                                                            #
#############################################################################
def get_vserver_from_ovmm(report_id, rephost, ovmmip, user, passw):
    vms = get_ovmm_request('Vm', ovmmip, user, passw)
    if vms:
        for vm in vms:
            if vm['vmRunState'] == 'RUNNING':
                sdata = {
                    'report_id' : report_id,
                    'servername' : vm["serverId"].get("name"),
                    'vmname' : vm.get('name'),
                    'hostname' : vm.get('description')
                }
            
                vserver = {
                    'report_id': report_id,
                    'servername': vm["serverId"].get("name"),
                    'vmname': vm.get('name'),
                    'hostname': vm.get('description'),
                    'vcpu': vm.get('cpuCount'),
                    'memory': vm.get('memory'),
                    'osstor': '',
                    'attachedstor': '',
                    'ipaddress': '',
                    'os': vm.get('osType'),
                    'env': '',
                    'state': 1 if vm.get('vmRunState') == 'RUNNING' else 0,
                }
            
                is_data_exist = get_data(rephost, sdata)
                
                if is_data_exist:
                    ret = updateData(rephost, vserver)    
                else:
                    ret = insertData(rephost, vserver)
                
                logger (( "update" if is_data_exist else "insert" ) , ret, vm.get('name') + " - " + vm.get('description') + " - " + vm["serverId"].get("name"))     
    else:
        logger('collect', False, "Unable to get vserver detail from ovmm")
        return False
    return True

#############################################################################
# function for get vserver data from exalogic - emoc                        #
# parameter                                                                 #
# - report_id (string)                                                      #
# - exalogic data (array)                                                   #
# return items: 0                                                           #
#############################################################################        
def get_vserver_from_exalogic(report_id, rephost, emochost, username, password):
    accs = get_account_list (username, password, emochost)
    logger ('get', (True if accs else False), 'Success get account list on "' + emochost + '"')
    if accs:
        for acc in accs.get('items'):
            acc_key = reg_new_key (username, password, emochost, acc.get('account'), get_public_key())
            logger ('regist', (True if acc_key else False), 'Register account key for "' + acc.get('account') + '"')
            if acc_key:
                itms = get_emoc_vserver (emochost, acc_key)
                if itms.get('items') is not None:
                    for itm in itms.get('items'):
                        sdata = {
                            'report_id' : report_id,
                            'vmname' : itm.get('name'),
                            'hostname' : itm.get('description')
                        }
            
                        vserv = {
                            'report_id': report_id,  
                            'vmname': itm.get('name'),
                            'hostname': itm.get('description'),
                            'vcpu': itm.get('vcpu'),
                            'memory': itm.get('memoryMb'),
                            'osstor': itm.get('dedicatedStorageMb'),
                            'attachedstor': itm.get('attachedStorageMb'),
                            'ipaddress': get_ip_addr(itm.get('ipAddresses'))
                        }
            
                        retval = updateData(rephost, vserv)
                        logger ('update',retval, itm.get('name') + " - " + itm.get('description'))
                else:
                    logger('collect', False, "Unable to get vserver detail from exalogic")
            
            logger('collect', True, "vserver detail collection from account : " + acc.get('account'))
            r = del_acc_key( username, password, emochost, acc_key)
            logger ('unreg', (True if r else False), 'Unregister account key for "' + acc.get('account') + '"')
    else:
        logger ('collect', False, "Failed to list account")
        return False
    return True

def update_zfssa_usage(report_id, rephost, box_id):
    size = {
        "1" : {
            'total_size' : '24883',
            'used_size' : '4710',
            'free_size' : '20172'
        },
        "2" : {
            'total_size' : '23797',
            'used_size' : '18636',
            'free_size' : '5160'
        },
        "3" : {
            'total_size' : '24934',
            'used_size' : '15974',
            'free_size' : '8960'
        },
        "4" : {
            'total_size' : '65495',
            'used_size' : '7639',
            'free_size' : '57856'
        },
        "5" : {
            'total_size' : '65495',
            'used_size' : '7639',
            'free_size' : '57856'
        }   
    }
    
    #size = json.loads(size_itm)
    
    rdata = {
        'report_id': report_id,  
        'box_id': box_id,
        'total_size': size[box_id].get('total_size'),
        'used_size': size[box_id].get('used_size'),
        'free_size': size[box_id].get('free_size')
    }
    
    res = insertZfssaData(rephost, rdata)
    
    return res
#############################################################################
# main loop                                                                 #
#############################################################################

s=requests.Session()
s.verify=False #disables SSL certificate verification

baseUri='http://10.60.162.198:8888/utildata'
#ovmmUri='https://10.60.114.141:7002/ovm/core/wsapi/rest'

exaip = '10.60.114.141'

today = date.today()
mm = today.strftime("%m")
yy = today.strftime("%Y")

is_logged_on = req_logon('http://10.60.162.198:8888', "admin", "password")

if is_logged_on:
    report_id = get_report_id(baseUri, mm, yy)
    logger ('get', (False if report_id < 0 else True), 'Get report id :' + str(report_id))
    logger ('get', True, 'Get exalogic boxes')
    exas = get_exa_box(baseUri)
    if exas:
        for box in exas:
            logger ('collect', True, 'Start collecting vm data from ' + box.get('box_ip') + ' OVMM')
            res = get_vserver_from_ovmm(report_id, baseUri, box.get('box_ip'), box.get('ovmm_user'), box.get('ovmm_pass'))
            logger ('collect', res, 'OVMM vserver collection complete')
            logger ('collect', res, 'Start collecting vm data from ' + box.get('box_ip') + ' EMOC')
            res = get_vserver_from_exalogic(report_id, baseUri, box.get('box_ip'), box.get('iaas_user'), box.get('iaas_pass'))
            logger ('collect', res, "EMOC vserver collection complete")
            logger ('insert', True, "Start insert zfssa usage data")
            res = update_zfssa_usage(report_id, baseUri, box.get('id'))
            logger ('insert', res, "End insert zfssa usage data")
    else :
        logger('collect', False, 'Unable to get exalogic box on db')
else:
    logger('login', False, "Error login to server")

