#!/bin/bash


NEW=''
INV=''

cd npy-files

raw="$(curl $NEW -o new_dict.h5)"
raw1="$(curl $INV -o inv_dict.h5)"

$raw
$raw1


cd ..
