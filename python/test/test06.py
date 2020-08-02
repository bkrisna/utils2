#!/usr/bin/python

import OpenSSL
from OpenSSL import crypto
import base64

key_file = open("/Users/bkrisna/Documents/05.other/ovm_tools/pubkey.pem", "r")
key = key_file.read()
key_file.close()
password = ""

print key

if key.startswith('-----BEGIN '):
    pkey = crypto.load_publickey(crypto.FILETYPE_PEM, key)
else:
    pkey = crypto.load_pkcs12(key, password).get_publickey()
print pkey

print base64.b64encode(crypto.dump_publickey(crypto.FILETYPE_ASN1, pkey))

