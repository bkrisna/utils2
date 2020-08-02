#!/usr/bin/python
import requests
import xmltodict
import json
import OpenSSL
import base64
import time as time_
import urllib

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
    priv_key_file = '/Users/bkrisna/Documents/05.other/ovm_tools/privkey.pem'
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
    public_key_file='/Users/bkrisna/Documents/05.other/ovm_tools/pubkey.pem'
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
    #addact = '&account=' + acc_id + '&publicKey=' + pubkey
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

def get_ip_addr (ipaddrs):
    ips = ''
    if ipaddrs is not None:
        for ip in ipaddrs:
            if not ip.startswith('172.'):
                if len(ips) > 0:
                    ips = ips + ' '
                ips = ips + ip
    return ips

##########################################################################
# main sequence
##########################################################################
username = 'cloudadmin'
password = 'cloudadmin'
emochost = '10.60.114.141'

res = get_account_list (username, password, emochost)
if res is not None:
    for acc in res.get('items'):
        print acc.get('account') + ' ' + acc.get('name')
        acc_key = reg_new_key (username, password, emochost, acc.get('account'), get_public_key())
        print acc_key
        r = del_acc_key( username, password, emochost, acc_key)
        if r:
            print acc_key + " deleted"
        else:
            print acc_key + " deletion failed"

res = get_key_list ( username, password, emochost)
print json.dumps(res, indent=4)


#emoc_list = []
#acc_key='AK_1'
#res=get_emoc_vserver (emochost, acc_key)
#for itm in res.get('items'):
#    vserv = {
#        'name': itm.get('name'),
#        'description': itm.get('description'),
#        'status': itm.get('status'),
#        'vcpu': itm.get('vcpu'),
#        'memoryMb': itm.get('memoryMb'),
#        'dedicatedStorageMb': itm.get('dedicatedStorageMb'),
#        'attachedStorageMb': itm.get('attachedStorageMb'),
#        'ipAddresses': get_ip_addr(itm.get('ipAddresses')),
#        'srvname': '',
#        'vmos': '',
#        'env': ''
#    }
#    emoc_list.append(vserv);
    #print json.dumps(itm, indent=4)
    #print '====================================='


#print json.dumps(emoc_list, indent=4)
