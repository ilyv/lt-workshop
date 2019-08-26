# lt-workshop
Load testing workshop project.

Проект-песочница для ознакомления с нагрузочным тестированием.

## Архитектура
<img src="./content/design.svg" width=300px>

Конфигурация приложения описана в [docker-compose.yml](./docker-compose.yml). В качестве веб-сервиса используется [goby-lang/sample-web-app](https://github.com/goby-lang/sample-web-app)

## Установка
Чтобы начать пользоваться проектом нужно установить Docker. Docker - это набор инструментов изолированного запуска программ, которые написаны для ОС Linux. Каждая программа (приложение) стартует в отдельном Docker-контейнере, которым можно управлять командами из терминала. Инструкции по установке для

- [Windows 10](https://docs.docker.com/docker-for-windows/install/)
- [Windows 7, 8](https://docs.docker.com/toolbox/toolbox_install_windows/). Вместе с Docker Toolbox будет установлен Virtualbox
- [Mac OS](https://docs.docker.com/docker-for-mac/install/)
- [Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/#install-docker-ce-1). Дополнительно нужно установить [docker-compose](https://docs.docker.com/compose/install/)

Также нужно склонировать этот репозиторий к себе.

### Дополнительно, если у вас Windows
Раскомментируйте в файле `docker-compose.yml` следующие строки
``` bash
#    environment:
#      - COMPOSE_CONVERT_WINDOWS_PATHS=1
```

и измените значение `volumes` в сервисе `tank` на абсолютный
путь к этому репозиторию на вашей машине. Часть `:/data` в конце оставляем. Например
``` bash
volumes:
  - C:\Users\developer\Documents\lt-workshop:/data
```

### Запуск
Запускаем Докер. В его терминале (Windows, Mac OS) переходим в каталог с этим репозиторием. Команда `cd`. Пример для Windows
``` bash
cd C:\Users\developer\Documents\lt-workshop 
```

Выполняем команды
``` bash
docker-compose build
```

``` bash
docker-compose up -d
```

Будут скачаны образы компонентов приложения и их контейнеры будут запущены в фоне

``` bash
Starting ltworkshop_postgres_1 ... done
Starting ltworkshop_web_1 ... done
Starting ltworkshop_tank_1 ... done
```

Когда контейнеры запустятся, можно открыть запущенное приложение в браузере. Оно находится на локальном IP-адресе. На Windows и Mac OS обычно это `192.168.99.100`. Узнать можно в командной строке, выполнив

##### Windows
``` bash
ipconfig
```

##### Mac OS, Linux
``` bash
ifconfig
```

и найти в выводе IP, начинающийся на 192.168.. или 10...

Открываем в браузере на порту 3000: `http://<IP ADDRESS>:3000`. Должен открыться сайт

<img src="./content/web-app-page.jpg" width=500px>

Приложение запущено.

## Использование
### Яндекс.Танк
Заходим в контейнер инструмента нагрузочного тестирования
``` bash
docker-compose exec tank bash
```

Должен быть примерно такой вывод
``` bash
Yandex.Tank Docker image
[tank]root@3cb5a857818d: /var/loadtest # 
```

Отсюда будем запускать тесты
``` bash
yandex-tank -c /data/load.yaml
```

Графики результатов НТ загружаются на сервис [OverLoad](https://overload.yandex.net)

<img src="./content/overload-test-page.jpg" width=500px>

Для автоматической отправки метрик требуется получить токен. Для этого нужно авторизоваться [на странице сервиса](https://overload.yandex.net/login/) через аккаунт Яндекса или Гитхаба. Далее нажать на область с юзерпиком → My api token. Значение токена нужно поместить в файл `token.txt` в этом каталоге.

<img src="./content/overload-get-token.jpg" width=200px>

### k6
Заходим в контейнер инструмента нагрузочного тестирования
``` bash
docker-compose exec k6 sh
```

Отсюда будем запускать тесты
``` bash
k6 run /data/k6-test.js
```

### Grafana
Открываем в браузере на порту 3001: `http://<IP ADDRESS>:3001`.
В Графане доступны 3 дашборда:
- Dashboard-Load-Test - для мониторинга тестов Яндекс.Танка
- k6 Load Testing Results - для мониторинга тестов k6
- Docker Monitoring - для просмотра используемых ресурсов веб-приложением


### Полезные команды
#### Внутри контейнера

Узнаем размер доступной оперативной памяти
``` bash
free -h
```

Узнаем объем использования дисков
``` bash
df -h
```

#### В среде запуска Докера
Проверяем, что все контейнеры запущены 
``` bash
docker-compose ps
```
State должен быть `Up`.
``` bash
        Name                 Command         State          Ports       
------------------------------------------------------------------------
ltworkshop_postgres_   docker-               Up      0.0.0.0:32768->5432
1                      entrypoint.sh                 /tcp               
                       postgres                                         
ltworkshop_tank_1      /bin/sh -c            Up                         
                       /tmp/startup.sh                                  
ltworkshop_web_1       /bin/sh -c service    Up      0.0.0.0:52022->22/t
                       ssh sta ...                   cp, 0.0.0.0:3000->3
                                                     000/tcp 

```

Перезапускаем контейнер `web` после изменения конфигурации в `docker-compose.yml`
``` bash
docker-compose up -d web
```

Останавливаем все контейнеры
``` bash
docker-compose stop
```

## Прочее

[Примеры результатов тестов](./docs/tests-analytics.md).

### Ссылки

- [Документация Яндекс.Танка](https://yandextank.readthedocs.io/en/latest/index.html)
- [Видео докладов про НТ](https://events.yandex.ru/lib/talks/?tech=tank) и [еще](https://www.youtube.com/watch?v=1idebTeMTqY)
- [Обзор инструментов НТ](https://geteasyqa.com/ru/blog/best-tools-load-testing/)
- [Список литературы по производительности](https://github.com/yandex/yandex-tank/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA-%D0%BB%D0%B8%D1%82%D0%B5%D1%80%D0%B0%D1%82%D1%83%D1%80%D1%8B-%D0%BF%D0%BE-%D0%BF%D1%80%D0%BE%D0%B8%D0%B7%D0%B2%D0%BE%D0%B4%D0%B8%D1%82%D0%B5%D0%BB%D1%8C%D0%BD%D0%BE%D1%81%D1%82%D0%B8)