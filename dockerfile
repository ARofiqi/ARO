# Gunakan image dasar dari nginx
FROM nginx:alpine

# Salin file aplikasi web ke direktori default nginx
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Perintah untuk menjalankan nginx
CMD ["nginx", "-g", "daemon off;"]