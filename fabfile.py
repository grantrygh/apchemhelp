import os
import sys

from fabric.api import local

def deploy():
    print "Deploying APChemHelp branch 'master'."
    print "---> Updating static files..."
    local('cd assets && rm -rf * && cd ..')
    local('python manage.py collectstatic')
    local('git push heroku master')
