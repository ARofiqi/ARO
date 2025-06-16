FROM nginx:alpine

COPY /disc /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]