FROM node:14.17.6
# Create app directory
WORKDIR /Users/Andrea/Desktop/vita-bucolica/vita-bucolica/client
COPY package*.json ./
# Bundle app source
COPY . .
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]