FROM node:12-alpine

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="Manage your Hacktoberfest issues!"
LABEL "com.github.actions.description"="Manage your Hacktoberfest issues!"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="octagon"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="purple"

# The action uses the last released version of hacktoberfestify
RUN npm install hacktoberfestify -g && hacktoberfestify -v
COPY ./entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]