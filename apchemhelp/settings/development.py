from .base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.getenv('SQLITE_DB_PATH'),
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    }
}

# Enable AWS settings to upload static files during deployment.
try:
    if os.environ['DEPLOYING']:
        DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'
        STATICFILES_STORAGE = DEFAULT_FILE_STORAGE
        AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
        AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
        AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
        S3_URL = 'https://%s.s3.amazonaws.com/' % AWS_STORAGE_BUCKET_NAME
        STATIC_URL = S3_URL
except KeyError as k:
    print k
