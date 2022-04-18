#!/bin/sh
cd backend
pip3 install virtualenv
virtualenv -p `which python3.10` venv
source venv/bin/activate
pip install -r requirements.txt

chmod 777 manage.py

python3 manage.py makemigrations
python3 manage.py migrate

cd ../restify/
npm install
cd ..

./run.sh
