## Builder
FROM gliderlabs/herokuish:master as builder
COPY . /tmp/app

ENV USER=herokuishuser
ARG APP_PORT=5000
ENV PORT ${APP_PORT}
ENV APP_PORT ${APP_PORT}

RUN /bin/herokuish buildpack build

EXPOSE ${APP_PORT}

CMD ["/bin/herokuish", "procfile", "start", "web"]
