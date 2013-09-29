from django.shortcuts import render


def home(request):
    context = None
    return render(request, 'index.html', context)
