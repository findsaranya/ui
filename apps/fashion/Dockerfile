FROM nginx:alpine

WORKDIR /var/www/html/fashion

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# docker run -d -p 80:80 --rm --name tt --mount type=bind,source=c:/path/apps,target=/var/www/html/ IMG_ID