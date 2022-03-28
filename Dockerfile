FROM node:14-alpine AS build
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
ADD . /app/
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
COPY --from=build /app/build/ /app/

EXPOSE 8080
