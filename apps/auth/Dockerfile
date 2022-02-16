FROM nginx:alpine

WORKDIR /var/www/html/auth

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4201

CMD ["nginx", "-g", "daemon off;"]

# docker run -d -p 4201:4201--rm --name auth_app --mount type=bind,source=c:/path/apps,target=/var/www/html/ IMG_ID