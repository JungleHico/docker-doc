FROM nginx:latest
# 拷贝nginx配置文件
COPY ./default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
# 拷贝./dist目录下的前端代码
COPY ./dist /usr/share/nginx/html

EXPOSE 80
