FROM nginx:alpine

WORKDIR /var/www/html/auth

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]
