FROM node:16.13
RUN mkdir -p /src/app

WORKDIR /src/app

COPY . .

EXPOSE 3000

CMD ["npm", "start"]