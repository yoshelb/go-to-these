FROM python:3.9.18-alpine3.18

RUN apk add build-base
RUN apk add postgresql-dev gcc python3-dev musl-dev

ARG FLASK_APP
ARG FLASK_ENV
ARG DATABASE_URL
ARG SCHEMA
ARG SECRET_KEY

# Change the working directory to /var/www/backend
WORKDIR /var/www/backend

# Copy requirements.txt from the backend directory
COPY backend/requirements.txt .

RUN pip install -r requirements.txt
RUN pip install psycopg2

# Copy the backend directory contents to the working directory
COPY backend/ .

# Ensure environment variables are set for Flask
ENV FLASK_APP=$FLASK_APP
ENV FLASK_ENV=$FLASK_ENV
ENV DATABASE_URL=$DATABASE_URL
ENV SCHEMA=$SCHEMA
ENV SECRET_KEY=$SECRET_KEY

RUN flask db upgrade
RUN flask seed all

# Change the CMD to point to the application in the backend directory
CMD gunicorn backend.app:app
