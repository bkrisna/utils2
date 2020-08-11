#!/usr/bin/python

#########################################################################
# PURPOSE: To collect vserver list accross compute node                 #
# As this is a custom script, use it with your own risk.                #
# Any issue or difficulty, feel free to contact me.                     #
# @2020 - bkrisna - bayu.krisnamurti@sigma.co.id                        #
#########################################################################

import requests
import xmltodict
import json
import urllib
import OpenSSL
import base64
import time as time_
import datetime

from datetime import datetime, timedelta
from datetime import date
from dateutil.relativedelta import *
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

#############################################################################
# function logger for show log                                              #
# parameter                                                                 #
# - operations (str)                                                        #
# - operation status (true/false).                                          #
# - data (str).                                                             #
# return items: -                                                           #
#############################################################################
def logger(ops, res, data):
    date = datetime.now();
    datestr = date.strftime("%Y/%m/%d %H:%M:%S.%f")
    state = "success" if res else "failed"
    print ('[{0:s}][{1:<7s}][{2:^9s}][{3:s}]'.format(datestr, ops, state, data))
    return True


#####################################
# load private key from file
# return:
# - pkey object
#####################################  
def get_priv_key():
    priv_key_file = wdir+'/privkey.pem'
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
    public_key_file = wdir+'/pubkey.pem'
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
    
    try:    
        r=s.get(baseUri)
        itms = xmltodict.parse(r.content).get('result')
        return itms
    except:
        return False

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
    try:
        r=s.get(baseUri)
        itms = xmltodict.parse(r.content).get('result')
        return itms
    except:
        return False

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
    return r.get('accessKeyId') if r else False

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
    #print qs
    try:
        r = s.get(url + qs)
        return r.json()
    except:
        return False

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
    try:
        res = s.post(url + '/auth/login', ldata)
        return res.json()['success']
    except:
        False

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
    r = get_utils_req(url, 'createReport', rdata)    
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
    r = get_utils_req(url, 'getReportId', rdata)
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
    r = get_utils_req(url, 'getData', fdata)
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
    return r['success'] if r['success'] else False

#############################################################################
# function for update data on db                                            #
# parameter                                                                 #
# - array data.                                                             #
# return items:                                                             #
# - True/False                                                              #
#############################################################################
def updateData(url, rdata):
    r = get_utils_req(url, 'updateData', rdata)
    return r['success'] if r['success'] else False

#############################################################################
# function for get zfssa usage on db                                        #
# parameter                                                                 #
# - array :                                                                 #
#    - report url.                                                          #
# return items:                                                             #
# - exa box data / False                                                    #
#############################################################################
def getZfssaData(url, rdata):
    r = get_utils_req(url, 'getZfssaData', rdata)
    return r['items'] if r['success'] else False

#############################################################################
# function for insert zfssa usage on db                                     #
# parameter                                                                 #
# - array data.                                                             #
# return items:                                                             #
# - True/False                                                              #
#############################################################################
def insertZfssaData(url, rdata):
    r = get_utils_req(url, 'insertZfssaData', rdata)
    return r['success'] if r['success'] else False

#############################################################################
# function for update zfssa usage on db                                     #
# parameter                                                                 #
# - array :                                                                 #
#    - report url.                                                          #
# return items:                                                             #
# - exa box data / False                                                       #
#############################################################################
def updateZfssaData(url, rdata):
    r = get_utils_req(url, 'updateZfssaData', rdata)
    return r['success'] if r['success'] else False

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
    
    try:
        r = s.get(url)
        return r.json()['vm'] if r else False
    except:
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
    func = 'ovmm'
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
                
                hname = vm.get('description').replace('\n','')
                hname = hname.replace('\t','')
                
                vserver = {
                    'report_id': report_id,
                    'servername': vm["serverId"].get("name"),
                    'vmname': vm.get('name'),
                    'hostname': hname,
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
                
                logger (func , ret, ("Update :" if is_data_exist else 'Insert: ')+vm.get('name') + " - " + hname + " - " + vm["serverId"].get("name"))     
    else:
        logger(func, False, "Unable to get vserver detail from ovmm")
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
    func='emoc'
    accs = get_account_list (username, password, emochost)
    logger (func, (True if accs else False), 'Success get account list on "' + emochost + '"')
    if accs:
        for acc in accs.get('items'):
            acc_key = reg_new_key (username, password, emochost, acc.get('account'), get_public_key())
            logger (func, (True if acc_key else False), 'Register account key for "' + acc.get('name') + '"')
            if acc_key:
                itms = get_emoc_vserver (emochost, acc_key)
                if itms.get('items') is not None:
                    for itm in itms.get('items'):
                        sdata = {
                            'report_id' : report_id,
                            'vmname' : itm.get('name'),
                            'hostname' : itm.get('description')
                        }
                        
                        hname = itm.get('description').replace('\n','')
                        hname = hname.replace('\t','')
                        
                        vserv = {
                            'report_id': report_id,  
                            'vmname': itm.get('name'),
                            'hostname': hname,
                            'vcpu': itm.get('vcpu'),
                            'memory': itm.get('memoryMb'),
                            'osstor': itm.get('dedicatedStorageMb'),
                            'attachedstor': itm.get('attachedStorageMb'),
                            'ipaddress': get_ip_addr(itm.get('ipAddresses'))
                        }
            
                        retval = updateData(rephost, vserv)
                        logger (func,retval, "Update :"+itm.get('name') + " - " + hname)
                else:
                    logger(func, False, "Unable to get vserver detail from account : "+acc.get('name'))
            
            logger(func, True, "Vserver detail collection from account : " + acc.get('name'))
            r = del_acc_key( username, password, emochost, acc_key)
            logger (func, (True if r else False), 'Unregister account key for "' + acc.get('name') + '"')
    else:
        logger (func, False, "Failed to list account")
        return False
    return True

#############################################################################
# function for get zfssa usage data from exalogic                           #
# parameter                                                                 #
# - report_id (string)                                                      #
# - exalogic data (array)                                                   #
# return items:                                                             #
# - vm array / False                                                        #
#############################################################################
def get_zfssa_request(action, host1, host2, user, passw):
    s.auth = (user, passw)
    s.headers.update({'Accept': 'application/json', 'Content-Type': 'application/json'})
    url = 'https://' + host1 + ':215/api' + action  
    try: 
        r = s.get(url)
        if r.status_code == 200:
            return r.json()
        else:
            url = 'https://' + host2 + ':215/api' + action  
            r = s.get(url)
            if r.status_code == 200:
                return r.json()
            else:
                return False
    except:
        return False
    
def collect_zfssa_data(zfssa1_ip, zfssa2_ip, zfssa_user, zfssa_pass):
    res  = get_zfssa_request('/storage/v1/pools/exalogic', zfssa1_ip, zfssa2_ip, zfssa_user, zfssa_pass)
    if res: 
        return res.get('pool').get('usage')
    else:
        return False

def get_zfssa_usage(report_id, rephost, box_id, zfssa1_ip, zfssa2_ip, zfssa_user, zfssa_pass):
    usage_data = collect_zfssa_data(zfssa1_ip, zfssa2_ip, zfssa_user, zfssa_pass)
    if usage_data:
           
        rdata = {
            'report_id': report_id,  
            'box_id': box_id,
            'total_size': usage_data.get('total')/(1024*1024*1024),
            'used_size': usage_data.get('usage_total')/(1024*1024*1024),
            'free_size': usage_data.get('free')/(1024*1024*1024)
        }
        
        is_data_exist = getZfssaData(rephost, rdata)
        if is_data_exist:
            ret = updateZfssaData(rephost, rdata)    
        else:
            ret = insertZfssaData(rephost, rdata)
            
        logger (( "zfssa" if is_data_exist else "insert" ) , ret, 'Update zfssa data for box id : ' + str(box_id) + ' and report id : ' + str(report_id))
    else:
        logger ('zfssa' , usage_data, 'Unable to get zfssa data for box id : ' + str(box_id))
        return False
    
    return True
    
    
#############################################################################
# main loop                                                                 #
#############################################################################

s=requests.Session()
s.verify=False #disables SSL certificate verification
repSrv = '10.60.162.198:8888'
baseUri ='http://'+ repSrv+'/utildata'
wdir = '/root/script/utils/bin'

today = date.today()
#mm = today.strftime("%m")
#yy = today.strftime("%Y")

date = datetime.now()
date = date - relativedelta(months=+1)
mm = date.strftime("%m")
yy = date.strftime("%Y")

logger ('misc', True, 'Collection scrip started')

logger ('misc', True, 'Try to login to report server :' + repSrv)
logger ('report', True, 'Try to login to report server :' + repSrv)
is_logged_on = req_logon('http://'+repSrv, "admin", "password")

if is_logged_on:
    logger ('report', is_logged_on, ('Successfuly logged on to report server :' + repSrv))
    report_id = get_report_id(baseUri, mm, yy)
    logger ('report', (False if report_id < 0 else True), 'Report id :' + str(report_id))
    logger ('report', True, 'Get exalogic boxes information')
    exas = get_exa_box(baseUri)
    if exas:
        for box in exas:
            logger ('ovmm', True, 'Start collecting vm data from ' + box.get('box_ip') + ' - OVMM')
            #res = get_vserver_from_ovmm(report_id, baseUri, box.get('box_ip'), box.get('ovmm_user'), box.get('ovmm_pass'))
            #logger ('ovmm', res, 'OVMM vserver collection complete')
            logger ('emoc', True, 'Start collecting vm data from ' + box.get('box_ip') + ' - EMOC')
            #res = get_vserver_from_exalogic(report_id, baseUri, box.get('box_ip'), box.get('iaas_user'), box.get('iaas_pass'))
            #logger ('emoc', res, "EMOC vserver collection complete")
            logger ('zfssa', True, "Start collecting zfssa usage data")
            res = get_zfssa_usage(report_id, baseUri, box.get('id'), box.get('zfssa1_ip'), box.get('zfssa2_ip'), box.get('zfssa_user'), box.get('zfssa_pass'))
            logger ('zfssa', res, "Zfssa usage data collection completed")
    else :
        logger('report', False, 'Unable to get exalogic box information from server')
else:
    logger ('report', is_logged_on, 'Failed to logged on to report server :' + repSrv)

end = datetime.now()
elapsed = date
logger ('misc', True, 'Collection scrip ended')
