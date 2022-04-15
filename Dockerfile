FROM alpine:latest
#FROM scratch

COPY crypto-shell /bin/crypto-shell

CMD ["/bin/crypto-shell"]

#Things to try: build in Linux? 