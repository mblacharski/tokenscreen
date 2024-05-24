FROM postgres

COPY db_init/init.sql /docker-entrypoint-initdb.d/
