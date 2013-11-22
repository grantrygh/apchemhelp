import os

from fabric.api import local


def deploy():
    print "Deploying APChemHelp branch 'master'."
    print "---> Updating static files..."
    try:
        os.environ['LOCAL_DEVELOPMENT'] = 'false'
        local('cd assets && rm -rf * && cd ..')
        local('python manage.py collectstatic')
        local('git push heroku master')
    except:
        print "Error while deploying."

    os.environ['LOCAL_DEVELOPMENT'] = 'true'
