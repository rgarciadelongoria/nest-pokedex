<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar
```
npm i
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la BBDD
```
docker-compose up -d
```

5. Reconstruir BBDD con semilla
```
http://localhost:3000/api/v2/seed
```

## Stack usado
* MongoDB
* Nest