FROM collinestes/docker-node-oracle:8

COPY . .
RUN npm install \ 
  && npm cache clean --force

ENV PORT 3131
EXPOSE 3131

CMD ["npm", "start"]
