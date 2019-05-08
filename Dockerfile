FROM node:10-alpine

WORKDIR /usr/src/app

COPY package*.json .

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN npm install

HEALTHCHECK --interval=5s \
            --timeout=5s \
            --retries=6 \
            CMD curl -fs http://localhost:$PORT/_health || exit 1

COPY . .

EXPOSE 3030
CMD ["npm", "run", "start"]

