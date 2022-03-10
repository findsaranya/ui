FROM nginx:alpine

WORKDIR /var/www/html/settings

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4202

CMD ["nginx", "-g", "daemon off;"]
