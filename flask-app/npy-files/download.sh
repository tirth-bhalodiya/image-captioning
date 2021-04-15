#!/bin/bash


NEW='https://bashupload.com/EIb7A/2rR-Y.npy'
INV='https://bashupload.com/XdQA1/qrl5x.npy'

cd npy-files

raw="$(curl $NEW -o new_dict.npy)"
raw1="$(curl $INV -o inv_dict.npy)"

$raw
$raw1


cd ..

