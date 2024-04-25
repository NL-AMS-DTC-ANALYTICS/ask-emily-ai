# Build stage
FROM node:lts-alpine as build
WORKDIR /app
COPY package*.json ./

# ENVIRONMENT VARIABLES
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn install
COPY . .
RUN yarn build

# Production stage
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]