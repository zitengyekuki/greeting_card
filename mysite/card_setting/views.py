# -*- coding: utf-8 -*-

from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, Http404
from django.template import Context, RequestContext
from django.contrib.auth.decorators import login_required
from django.conf import settings
from django.shortcuts import render_to_response, render
from django.contrib.auth.models import User
from django.contrib import auth
from jsonresponse import *
from card_setting.models import *
import sys
import traceback

HOME_SECOND_NAVS = [{
	'navs': [{
		'name': 'card_setting',
		'title': u'发送贺卡',
		'url': '/card_setting/',
	},{
		'name': 'list_cards',
		'title': u'贺卡发送记录',
		'url': '/card_setting/list_cards/',
	}]
}]
#===============================================================================
# card_setting : 设置贺卡
#===============================================================================
def card_setting(request):
	c = RequestContext(request, {
		'second_navs': HOME_SECOND_NAVS,
		'second_nav_name': 'card_setting',
	})
	return render_to_response('card_setting/card_setting.html', c)

def create_card(request):
	post = request.POST
	name = post.get('name','')
	year = post.get('year','')
	try:
		CardProfile.objects.create(
			name = name,
			year = year,
		)
		response = create_response(200)
		response.data.name = name
		response.data.year = year
	except:
		print_stack_trace()
		response = create_response(500)
		response.errMsg = u'创建贺卡失败'
	return response.get_response()

def show_card(request):
	name = request.GET.get('name','')
	year = request.GET.get('year','')
	c = RequestContext(request, {
		'name': name,
		'year': year,
	})
	return render_to_response('card_setting/card.html', c)

def list_cards(request):
	cards = CardProfile.objects.all()

	c = RequestContext(request, {
		'cards': cards,
		'second_navs': HOME_SECOND_NAVS,
		'second_nav_name': 'list_cards'
	})
	return render_to_response('card_setting/list_cards.html', c)

def print_stack_trace():
	"""
	DEBUG模式下打印详细的错误堆栈信息
	"""
	if settings.DEBUG:
		error_type,error_value,error_trace = sys.exc_info()
		traceback.print_exception(error_type,error_value,error_trace)