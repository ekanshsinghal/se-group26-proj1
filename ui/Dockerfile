FROM  --platform=linux/amd64 node:latest
RUN mkdir -p /code/ui/
WORKDIR /code/ui/
COPY . /code/ui/
RUN npm install
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s" ,"build" ,"-l","3000"]