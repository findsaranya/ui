FROM nginx:alpine

WORKDIR /var/www/html/settings

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4202

CMD ["nginx", "-g", "daemon off;"]

# docker run -d -p 4202:4202--rm --name settings_app --mount type=bind,source=c:/path/apps,target=/var/www/html/ IMG_ID