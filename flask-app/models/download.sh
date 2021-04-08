#!/bin/bash


MODEL='https://bashupload.com/Lv9Rx/model.txt'
WEIGHTS='https://bashupload.com/Lv9Rx/ypsIG.txt'

cd models

raw="$(curl $MODEL -o model.h5)"
raw1="$(curl $WEIGHTS -o model_weights.h5)"

$raw
$raw1


cd ..

