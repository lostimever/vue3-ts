FROM nginx
# LABEL maintainer "lingzi"
COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/vue3-ts.conf
EXPOSE 80