FROM --platform=linux/amd64 python:3.8-slim-buster

RUN mkdir -p /code/backend
WORKDIR /code/backend

COPY requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0", "--port=8000"]