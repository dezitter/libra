#!/usr/bin/env bash

CERTS_DIR=./certs

rm -rf $CERTS_DIR
mkdir -p $CERTS_DIR/{ca,server}

CA_KEY=$CERTS_DIR/ca/key.pem
CA_CRT=$CERTS_DIR/ca/crt.pem
CA_SERIAL=$CERTS_DIR/ca/.srl

SERVER_KEY=$CERTS_DIR/server/key.pem
SERVER_CSR=$CERTS_DIR/server/csr.pem
SERVER_CRT=$CERTS_DIR/server/crt.pem

function log {
    N=${#1}
    DELIMITER=`yes = | head -"$N" | paste -s -d "" -`

    echo $DELIMITER
    echo -e $1
    echo $DELIMITER
}

log "Creating CA key..."
openssl genrsa -out "$CA_KEY" 2048

log "Creating CA cert..."
openssl req -x509 \
            -new \
            -nodes \
            -days 365 \
            -key "$CA_KEY" \
            -out $CA_CRT \
            -subj "/C=FR/ST=IDF/L=Paris/O=Libra Signing Authority Inc/CN=localhost"

log "Creating server key..."
openssl genrsa -out "$SERVER_KEY" 2048

log "Creating server Certificate Signing Request (CSR)"
openssl req -new \
            -key "$SERVER_KEY" \
            -out "$SERVER_CSR" \
            -subj "/C=FR/ST=IDF/L=Paris/O=Libra Tech Inc/CN=localhost"

log "Signing the server csr request with ROOT CA"
openssl x509 -req -in "$SERVER_CSR" \
             -CA "$CA_CRT" \
             -CAkey "$CA_KEY" \
             -CAcreateserial \
             -CAserial $CA_SERIAL \
             -out "$SERVER_CRT" \
             -days 365

