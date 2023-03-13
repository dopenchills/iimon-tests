#!/bin/bash
set -e

pip install --no-cache-dir -r /app/requirements.txt

python /app/manage.py migrate
python /app/manage.py runserver 0.0.0.0:8000
