# Dockerfile for Nginx with Vim installed and index.html file replacement
FROM nginx:1.27.0

RUN apt-get update
RUN apt-get -y install vim

# /usr/share/nginx/html/index.html file will be replaced by Dockerfile COPY command
COPY index.html /usr/share/nginx/html/index.html

# 403 error comes then changing file ownership to nginx user
RUN chown nginx:nginx /usr/share/nginx/html/index.html