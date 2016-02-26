SchoolLunchHackathon-RPG
===========

##### DEMO
[Form](http://school-lunch-hackathon.herokuapp.com/)

[Admin](http://school-lunch-hackathon.herokuapp.com/static/pub/admin.html)

##### SETUP
```
- Install heroku toolbelt (https://toolbelt.heroku.com/)
- Install git
- Install python 2.7.6
- Install pip (e.g. sudo easy_install pip)
```

```
<clone our app to a local git repository>
$ sudo pip install -r requirements.txt
$ heroku apps:create hackathon-demo 
$ heroku config:set IS_HEROKU_SERVER=1
$ git push heroku master
```

Run migrations
```
$ python manage.py migrate
```

##### Run Server
```
$ python manage.py runserver
Visit http://127.0.0.1:8000/
```

##### Admin Panel
Create a superuser for Django admin panel
```
$ python manage.py createsuperuser
Visit http://127.0.0.1:8000/admin/
```
