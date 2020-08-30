FROM node:12-alpine
# The action uses the last released version of hacktoberfestify
RUN npm install hacktoberfestify -g && hacktoberfestify -v
COPY .github/action/entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]