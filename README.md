# Docker

## 安装

```sh
sudo apt install curl
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

验证是否安装完成：

```sh
docker -v
```



## Dockerfile

```dockerfile
# 基于nginx镜像进行构建
FROM nginx:latest

# 拷贝nginx配置文件
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
# 拷贝./dist目录下的前端代码
COPY ./dist /usr/share/nginx/html

EXPOSE 80
```



## 构建镜像

进入到项目目录，运行以下命令构建 Docker 镜像

```sh
docker build -t <镜像名称> .
```

其中 `.` 表示使用当前目录下的 Dockerfile 文件进行构建。



## 查看已有镜像

```sh
docker images
```



## 其他镜像操作

搜索镜像：

```sh
docker search <镜像名称>
```

删除镜像（删除镜像需要保证没有对应的容器）：

```sh
docker rmi <镜像名称:标签>
```



## 基于镜像启动容器

```sh
docker run -d [-p <主机端口>:<容器端口>] [--name <容器名称>] [-v <宿主机路径>:<容器路径>] <镜像名称>
```

- `-d` 表示在后台运行
- `-p` 表示将主机的端口映射到容器的端口，注意主机的端口不能被占用，可以通过 `sudo lsof -i:<端口号>` 查看端口是否被占用，注意关闭防火墙或者防火墙开放对应的端口，否则其他机器无法访问
- `--name` 指定创建的容器名称，如果不指定 docker 会自动创建
- `-v` （Volume 数据卷）用于将宿主机的文件夹/文件映射到容器，相当于共享文件夹，注意必须使用绝对路径



## 容器其他操作

查看正在运行的容器：

```sh
docker ps
```

查看所有容器：

```sh
docker ps -a
```

运行/停止容器：

```sh
docker start <容器名或容器ID>
docker stop <容器名或容器ID>
```

删除容器（删除容器前需要先停止）：

```sh
docker rm <容器名或容器ID>
```

查看容器日志：

```sh
docker logs <容器名或容器ID>
```

以交互模式运行容器：

```sh
docker run -it <容器名称> [bash]
```

在正在运行的容器中执行命令：

```sh
docker exec -it <容器名称或容器ID> <命令>
docker exec -it <容器名称或容器ID> bash # 在docker容器打开命令行
```



## 导出

```sh
docker save -o <导出文件名.tar> <镜像名称>
```

默认会导出到当前文件夹



## 导入

```sh
docker load -i <文件名.tar>
```



## Docker Compose

Docker Compose 用于定义和管理多个 docker 容器

安装 Docker Compose：

```sh
# 可能需要梯子
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

验证安装是否完成（可能需要重启）：

```sh
docker-compose -version
```

编写 `docker-compose.yml` 配置文件：

```yaml
version: '3'

services:
  nginx-service:
    image: nginx-service:latest
    ports:
      - '80:80'

  node-service:
    image: node-service:latest
    ports:
      - '3000:3000'
```

> 注意：由于 web 应用是在浏览器中打开，无法通过 `localhost` 访问接口，需要通过 nginx 反向代理到对应容器的接口服务，目标地址为：`http://<后端服务名称>:<端口号>`，例如上面的例子指定为：`http://node-service:3000`

常用命令：

- `docker-compose up -d`：读取当前文件夹中的 `docker-compose.yml` 配置，构建对应镜像和启动容器，`-d` 参数表示在后台运行
- `docker-compose ps`：查看 docker-compose 创建的服务
- `docker-compose stop`：停止已创建服务的容器，不会删除这些容器
- `docker-compose start`：启动已创建服务的容器，不会重新构建
- `docker-compose down`：停止并删除所有容器
- `docker-compose restart`：重启已创建服务的容器
