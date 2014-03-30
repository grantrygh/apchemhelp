from django.conf.urls import patterns, url
from django.views.generic import TemplateView
from .sitemaps import StaticSitemap


sitemaps = {
    'static': StaticSitemap,
}

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='index.html'), name='index'),
    url(r'^about/$', TemplateView.as_view(template_name='about.html'), name='about'),
    url(r'^contact/$', 'core.views.contact', name='contact'),
    url(r'^license/$', TemplateView.as_view(template_name='license.html'), name='license'),

    url(r'^calculator/mass/$', TemplateView.as_view(template_name='MassCalc.htm'), name='masscalc'),
    url(r'^calculator/titration/$', TemplateView.as_view(template_name='TitrationApp.htm'), name='titration'),
    url(r'^formulas/thermo/$', TemplateView.as_view(template_name='FormulasThermo.htm'), name='form_thermo'),
    url(r'^formulas/kinetics/$', TemplateView.as_view(template_name='FormulasKin.htm'), name='form_kinetics'),
    url(r'^formulas/gases/$', TemplateView.as_view(template_name='FormulasGas.htm'), name='form_gases'),
    url(r'^formulas/equilibrium/$', TemplateView.as_view(template_name='FormulasEq.htm'), name='form_eq'),
    url(r'^flashcard/thermo/$', TemplateView.as_view(template_name='FlashcardThermodynamics.htm'), name='flash_thermo'),
    url(r'^flashcard/periodic/$', TemplateView.as_view(template_name='FlashcardPeriodicStructure.html'), name='flash_periodic'),
    url(r'^flashcard/acidbase/$', TemplateView.as_view(template_name='FlashcardAcidBase.htm'), name='flash_acidbase'),

    url(r'^robots\.txt$', TemplateView.as_view(template_name='robots.txt', content_type='text/plain')),
    url(r'^sitemap\.xml$', 'django.contrib.sitemaps.views.sitemap', {'sitemaps': sitemaps})
)
