FROM nginx:1.21-alpine

LABEL source=git@github.com:capactio/dashboard.git
LABEL app=dashboard

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./build /var/public
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]