#!/bin/bash


NEW=''
INV=''

cd npy-files

raw="$(curl $NEW -o new_dict.npy)"
raw1="$(curl $INV -o inv_dict.npy)"

$raw
$raw1


cd ..
