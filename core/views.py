import smtplib
import os

from django.shortcuts import render

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText


def contact(request):

    if request.method == 'GET':
        context = None
        return render(request, 'contact.html', context)

    if request.method == 'POST':
        # Collect the submitted data and email it to administrator.
        subName = request.POST['realname']
        subEmail = request.POST['email']
        subSubject = request.POST['subject']
        subBody = request.POST['body']
        msg = MIMEMultipart('alternative')
        msg['Subject'] = "You have a new message on APChemHelp!"
        msg['From'] = subEmail
        msg['To'] = 'grantrygh@gmail.com'
        text = "Name: %s \nSubject: %s \nMessage: %s" % (subName, subSubject, subBody)
        part1 = MIMEText(text, 'plain')
        username = os.getenv('MAND_SMTP_USER')
        password = os.getenv('MAND_SMTP_PASS')
        msg.attach(part1)
        s = smtplib.SMTP('smtp.mandrillapp.com', 587)
        s.login(username, password)
        s.sendmail(msg['From'], msg['To'], msg.as_string())
        s.quit()

        context = {'contactComplete': True}
        return render(request, 'contact.html', context)
