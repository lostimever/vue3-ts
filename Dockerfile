FROM nginx
# LABEL maintainer "lingzi"
COPY ./dist/ /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/*
COPY ./nginx.conf /etc/nginx/conf.d/vue3-ts.conf
EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]