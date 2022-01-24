# Cashless-System
## Datbase
```
psql -Upostgres
password: devel (use only devel)

create database cashless
```
## Laravel
```
composer install
php artisan migrate
php artisan serve --port=5000
http://localhost:5000/api/reseed (on your browser or postman)
Seeded / Initial Admin User:
Admin: admin@localhost.com
Password: admin
```
## React
```
npm install
npm start
```
