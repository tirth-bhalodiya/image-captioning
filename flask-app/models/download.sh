#!/bin/bash


MODEL='https://bashupload.com/nu1vn/CRKuG.h5'
WEIGHTS='https://bashupload.com/kRe3t/BFGRr.h5'

cd /var/www/flask-app/models

raw="$(sudo curl $MODEL -o model.h5)"
raw1="$(sudo curl $WEIGHTS -o model_weights.h5)"

$raw
$raw1


cd ..

