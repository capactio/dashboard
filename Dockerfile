# Stage 1: Build app
FROM node:17.3.0-alpine3.14 as build-app
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
ENV SKIP_POSTINSTALL=true
RUN npm install --no-optional
COPY ./src ./src
COPY ./public ./public
RUN npm run build

# Stage 2: Serve built app static files as nginx server
FROM nginx:1.21-alpine

LABEL source=git@github.com:capactio/dashboard.git
LABEL app=dashboard

COPY --from=build-app /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]