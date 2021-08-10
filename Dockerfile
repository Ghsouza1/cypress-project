FROM cypress/base:10
WORKDIR /myapp
COPY app .
COPY cypress .
COPY npm_start.sh .
RUN chmod +x npm_start.sh
ENTRYPOINT ["npm_start.sh"]