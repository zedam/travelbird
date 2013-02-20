travelbird
==========

test for travelbird

HOW TO INSTALL:

"name_of_the_project" it will be the folder where you will want to install this project.

1.- First go to your workspace where you install your projects and create a new folder to contain this project.
mkdir name_of_the_project

2.- Enter into this new folder
cd name_of_the_project/

3.- Edit VIRTUAL_ENV location
VIRTUAL_ENV="/Users/izigelbaum/Documents/workspace/app/travelbird/my_env"

3.- Link it to virtualenv
source ../my_env/bin/activate

4.- Run the server
./manage.py runserver

you can also change the server port to : ./manage.py runserver 0.0.0.0:8001
in case the port 8000 (default) is taken

go to http://localhost:8000 in your browser (if you didn't change the port, of course.)

