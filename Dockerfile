FROM node:14-alpine AS build
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn install
ADD . /app/
RUN yarn build

FROM node:14-alpine
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/build/ /app/

# FROM nginx:alpine
# # Set working directory to nginx asset directory
# WORKDIR /usr/share/nginx/html
# # Remove default nginx static assets
# RUN rm -rf ./*
# # Copy static assets from builder stage
# COPY --from=build /app/build .
# # Containers run nginx with global directives and daemon off
# CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine
ENV PORT 8080

COPY --from=build /app/build/ /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
