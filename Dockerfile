FROM postgres:latest

COPY db_init/init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432

HEALTHCHECK --interval=1s --timeout=5s --retries=10 \
  CMD pg_isready -d ${POSTGRES_DB} -U ${POSTGRES_USER} || exit 1
