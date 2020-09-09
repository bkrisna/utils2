#!/usr/bin/python

from datetime import datetime, timedelta
from dateutil.relativedelta import *

date = datetime.now()
print(date.strftime("%m"))
print(date.strftime("%Y"))


date = date - relativedelta(months=+1)
print(date.strftime("%m"))
print(date.strftime("%Y"))