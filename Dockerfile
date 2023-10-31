FROM node:alpine
COPY ./ ./
RUN npm ci --only=production && npm cache clean --force 
RUN apk add --no-cache chromium
ENV CHROMIUM_PATH /usr/bin/chromium-browser
CMD ["npm","start"]