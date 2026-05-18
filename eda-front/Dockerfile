FROM 172.18.0.197/library/circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY ./ ./

RUN tar zxvf node_modules.tar.gz
RUN chmod 777 -R  node_modules/

# RUN yarn --registry=http://172.18.0.66:8081/repository/npm-group/ --sass_binary_site=http://172.18.0.66:8081/repository/node-sass/

RUN npm run build:prod

FROM 172.18.0.197/library/nginx
# FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/edu.conf


COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/


EXPOSE 8090

CMD ["nginx", "-g", "daemon off;"]
