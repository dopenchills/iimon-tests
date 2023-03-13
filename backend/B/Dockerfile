FROM python:3.11-slim
RUN apt-get update && apt-get install -y libmariadb-dev gcc default-mysql-client build-essential vim gettext

ENV PYTHONUNBUFFERED 1

RUN mkdir /app
WORKDIR /app

COPY ./requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt

CMD ["/app/start.sh"]
