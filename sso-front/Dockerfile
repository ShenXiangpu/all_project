
# FROM circleci/node:latest-browsers as builder
FROM 172.18.0.64/library/circleci/node:latest-browsers as builder

WORKDIR /usr/src/app/
USER root
COPY ./ ./
RUN yarn --registry=http://172.18.0.66:8081/repository/npm-group/ --sass_binary_site=http://172.18.0.66:8081/repository/node-sass/
#RUN yarn --registry=https://registry.npm.taobao.org/

#RUN yarn --registry=https://registry.npmjs.org/

RUN npm run build

FROM 172.18.0.64/library/nginx
# FROM nginx

WORKDIR /usr/share/nginx/html/

COPY ./docker/nginx.conf /etc/nginx/conf.d/edaCloud.conf


COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/

COPY ./iccad.html  /usr/share/nginx/html/

COPY ./lottery  /usr/share/nginx/html/lottery

EXPOSE 80 443 8090

CMD ["nginx", "-g", "daemon off;"]
