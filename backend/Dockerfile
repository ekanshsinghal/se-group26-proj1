FROM ubuntu:latest

RUN apt-get update -y
RUN apt-get install -y python3-pip python3

RUN mkdir -p /code/backend
WORKDIR /code/backend

COPY requirements.txt /code/backend/
RUN pip3 install -r requirements.txt

ENTRYPOINT [ "flask" ]
CMD [ "run" , "--host=0.0.0.0" ,"--port=8000"]