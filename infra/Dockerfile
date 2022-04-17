# FROM node:16-alpine as build
# RUN apk add --no-cache binutils gcc g++ python3 make linux-headers
# RUN npm install -g caxa
# 
# COPY . /usr/local/app/source
# WORKDIR /usr/local/app/source
# RUN npm rebuild
# 
# RUN caxa --input "/usr/local/app/source" --output "/usr/bin/crypto-shell" -- "{{caxa}}/node_modules/.bin/node" "{{caxa}}/app.mjs"
# 
# FROM scratch
# 
# COPY --from=build /lib/ld-musl-x86_64.so.1    /lib/libz.so.1 /lib/
# COPY --from=build /usr/bin/app /usr/bin/ld /usr/bin/
# COPY --from=build \
#         /usr/lib/libstdc++.so \
#         /usr/lib/libstdc++.so.6.0.28 \
#         /usr/lib/libstdc++.so.6 \
#         /usr/lib/libgcc_s.so.1 \
#         /usr/lib/libbfd-2.37.so \
#         /usr/lib/libctf.so.0 \
#             /usr/lib/
# EXPOSE 3000
# CMD [ "/usr/bin/crypto-shell" ]



##Simplest that works
FROM node:16-alpine
RUN apk add --no-cache binutils gcc g++ python3 make linux-headers
COPY . /usr/local/app/source
WORKDIR /usr/local/app/source
RUN npm rebuild
EXPOSE 3000
CMD ["node", "app.mjs"]
# ###