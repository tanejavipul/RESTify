#!/bin/sh

cd backend
python3 manage.py runserver & 
cd ../restify
npm start