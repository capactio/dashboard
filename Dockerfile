FROM nginx:1.21-alpine

LABEL source=git@github.com:capactio/dashboard.git
LABEL app=dashboard

COPY ./build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]