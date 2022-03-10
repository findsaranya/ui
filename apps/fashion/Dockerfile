FROM nginx:alpine

WORKDIR /var/www/html/fashion

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
