# API service deployment
## install requirements
```
$ pip install -r requirements.txt
```

## Configure Supervisor
Create supervisor config file:
```
$ sudo vim /etc/supervisor/conf.d/fastapi-app.conf
```

There copy and paste the following:
```
[program:letsplit-api-service]
command=/home/fastapi-user/LetSplit/backend/fastapi-nginx-gunicorn/gunicorn_start
user=fastapi-user
autostart=true
autorestart=true
redirect_stderr=true
stdout_logfile=/home/fastapi-user/LetSplit/backend/fastapi-nginx-gunicorn/logs/gunicorn-error.log
startsecs=0
```

## nginx
Create a new NGINX configuration file for your project:

```
$ sudo vim /etc/nginx/sites-available/letsplit-api-service
```

Open the NGINX configuration file and paste the following content:

```
upstream app_server {
    server unix:/home/fastapi-user/LetSplit/backend/fastapi-nginx-gunicorn/run/gunicorn.sock fail_timeout=0;
}

server {
    listen 80;

    server_name 35.187.157.35;

    keepalive_timeout 5;
    client_max_body_size 4G;

    access_log /home/fastapi-user/LetSplit/backend/fastapi-nginx-gunicorn/logs/nginx-access.log;
    error_log /home/fastapi-user/LetSplit/backend/fastapi-nginx-gunicorn/logs/nginx-error.log;

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_redirect off;
                        
        if (!-f $request_filename) {
            proxy_pass http://app_server;
            break;
        }
    }
}
```

Enable the configuration of your site by creating a symbolic link from the file in sites-available into sites-enabled by running this command:
```
$ sudo ln -s /etc/nginx/sites-available/fastapi-app /etc/nginx/sites-enabled/
```

Test that the configuration file is OK and restart NGINX:
```
$ sudo nginx -t
$ sudo systemctl restart nginx
```