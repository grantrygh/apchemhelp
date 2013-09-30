from django.conf.urls import patterns, url
from django.views.generic import TemplateView

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='index.html')),
    url(r'^about/$', TemplateView.as_view(template_name='about.html')),
    url(r'^contact/$', TemplateView.as_view(template_name='contact.html')),
    url(r'^license/$', TemplateView.as_view(template_name='license.html')),
    url(r'^calculator/mass/$', TemplateView.as_view(template_name='MassCalc.htm')),
    url(r'^calculator/titration/$', TemplateView.as_view(template_name='TitrationApp.htm')),
    url(r'^formulas/thermo/$', TemplateView.as_view(template_name='FormulasThermo.htm')),
    url(r'^formulas/kinetics/$', TemplateView.as_view(template_name='FormulasKin.htm')),
    url(r'^formulas/gases/$', TemplateView.as_view(template_name='FormulasGas.htm')),
    url(r'^formulas/equilibrium/$', TemplateView.as_view(template_name='FormulasEq.htm')),
    url(r'^flashcard/thermo/$', TemplateView.as_view(template_name='FlashcardThermodynamics.htm')),
    url(r'^flashcard/periodic/$', TemplateView.as_view(template_name='FlashcardPeriodicStructure.html')),
    url(r'^flashcard/acidbase/$', TemplateView.as_view(template_name='FlashcardAcidBase.htm')),
)
