FROM node:10.13-alpine
ENV NODE_ENV development
WORKDIR /usr/src/app
COPY ["src/", "package.json", "tsconfig.json", "./"]
RUN npm install -g typescript
RUN npm install
RUN tsc
RUN ls
EXPOSE 3000
CMD npm start