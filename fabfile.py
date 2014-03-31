import os
from fabric.api import local


def deploy():
    print "Deploying APChemHelp branch 'master'."
    print "---> Updating static files..."
    os.environ['DEPLOYING'] = "TEMPORARILY_ACTIVE"
    local('python manage.py collectstatic')
    local('cd assets && rm -rf * && cd ..')
    local('git push heroku master')
