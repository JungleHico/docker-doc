# FROM node:18.7

# WORKDIR /usr/src/app

# COPY . .
# RUN npm install

# EXPOSE 3000

# CMD ["npm", "start"]


FROM ubuntu:20.04

RUN apt update && \
	apt install -y curl && \
	curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
	apt install -y nodejs

WORKDIR /usr/src/app
COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
