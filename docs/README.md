
## How to deploy to pypi

1. Pull the project
2. Login to the `fourdigits` account on www.pypi.org 
3. Go to `Account Settings` and scroll down till you see `API tokens`
4. Add an API token: Give it a name and for `scope` select `Project: wagtail-external-link-richtext` 
and follow the instructions on how to use it
5. Run the following commands in your project folder:
   1. `python -m build`
   2. `twine check dist/*`
   3. `twine upload --repository pypi dist/* --verbose`