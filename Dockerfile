FROM denoland/deno:2.1.10 as base
WORKDIR /usr/app
COPY . /usr/app

FROM base AS scaffold
RUN apt-get update
RUN apt-get upgrade -y
RUN apt-get install unzip

FROM scaffold AS cache
RUN deno cache src/server.ts

# Fallback and compilation has broken in some instances
#ENTRYPOINT ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--allow-sys", "src/server.ts"]

FROM cache AS build
RUN deno check src/server.ts
RUN deno compile --allow-net --allow-env --allow-read --allow-sys --output=/usr/on-the-edge src/server.ts 

FROM build AS final
RUN rm -r /usr/app
WORKDIR /usr

ENTRYPOINT ["/usr/on-the-edge"]
