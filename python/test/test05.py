#!/usr/bin/python

import OpenSSL
from OpenSSL import crypto
import base64

key_file = open("/Users/bkrisna/Documents/05.other/ovm_tools/privkey.pem", "r")
key = key_file.read()
key_file.close()
password = ""

if key.startswith('-----BEGIN '):
    pkey = crypto.load_privatekey(crypto.FILETYPE_PEM, key, password)
else:
    pkey = crypto.load_pkcs12(key, password).get_privatekey()
print pkey
data = "data"
sign = OpenSSL.crypto.sign(pkey, data, "sha512WithRSAEncryption") 
print sign

data_base64 = base64.b64encode(sign)
print data_base64