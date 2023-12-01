FROM icr.io/codeengine/node:12-alpine
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]