from django.contrib import sitemaps
from django.core.urlresolvers import reverse


class StaticSitemap(sitemaps.Sitemap):
    priority = 1.0
    changefreq = 'weekly'
    protocol = 'http'

    def items(self):
        return ['index', 'about', 'contact', 'license', 'masscalc',
                'titration', 'form_thermo', 'form_kinetics', 'form_gases',
                'form_eq', 'flash_thermo', 'flash_periodic', 'flash_acidbase']

    def location(self, item):
        return reverse(item)
