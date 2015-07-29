# -*- coding: utf-8 -*-

import os
import json
from hashlib import md5

from django.db import models
from django.contrib import admin
from django.contrib.auth.models import Group, User


#===============================================================================
# CardProfile ： 贺卡信息
#===============================================================================
class CardProfile(models.Model):
	name = models.CharField(max_length=32) #姓名
	year = models.IntegerField(default=0) #入党周年数
	created_at = models.DateTimeField(auto_now_add=True) #创建时间
	
	class Meta(object):
		db_table = 'card_profile'
		ordering=['-id']