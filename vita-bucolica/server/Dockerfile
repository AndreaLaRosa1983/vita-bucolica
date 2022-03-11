FROM node:14.17.6
# Create app directory inside docker file
WORKDIR /Users/Andrea/Desktop/vita-bucolica/vita-bucolica/
COPY package*.json ./
# Bundle app source code
COPY . .
RUN npm install
EXPOSE 5000
CMD [ "npm", "start" ]