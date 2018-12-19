FROM node:10.13-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["src/", "package.json", "tsconfig.json", "./"]
RUN npm install -g typescript
RUN npm install
RUN tsc
CMD npm start