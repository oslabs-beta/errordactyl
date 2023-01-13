FROM denoland/deno:1.29.1
EXPOSE 3000
WORKDIR usr/src
USER deno
COPY . .
RUN deno cache edact.ts
CMD ["install", "--allow-all", "edact.ts"]