# -*- coding: utf-8 -*-

from django.conf.urls import *
from card_setting import views

urlpatterns = patterns('',
	(r'^$', views.card_setting),
	(r'^create_card/', views.create_card),
	(r'^list_cards/', views.list_cards),
	(r'^show_card/',views.show_card)
)