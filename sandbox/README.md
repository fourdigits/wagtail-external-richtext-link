# How the sandbox project works

-----

This project is a sandbox for testing the `wagtail-external-link-richtext` package.


## Installation

```console
$ pip install -r requirements.txt
```

## Usage

Run migrations and create a superuser:

```console
$ python manage.py migrate
```

```console
$ python manage.py createsuperuser
```

Run the server:

```console
$ python manage.py runserver
```

-----

Go to http://127.0.0.1:8000/admin/ and login with the superuser you created.

Create a new page of type `Home Page` and add some content to the `body` field.
If you don't understand how to add the new link, read the `Usage` section in the [README.md](../README.md) file.