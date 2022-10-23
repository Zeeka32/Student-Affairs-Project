FROM python:3.8
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
ENV LISTEN_PORT=8000
EXPOSE 8000
RUN pip install -r requirements.txt
COPY . /code/
