#!/bin/bash
clear
cd ./src/server/requestHandler/
npm install express
echo "ho installato express"
npm install multer
echo "ho installato multer"
npm install body-parser
echo "ho installato body-parser"


cd ..
cd ./dataManager
npm install mysql
echo "ho installato mysql"

cd ..
cd ./codeGenerator/parser
npm install json-fn
echo "ho installato json-fn"

cd ..
cd ./builder
npm install mkdirp
echo "ho installato mkdirp"

cd ..
cd ./zipper
npm install archiver
echo "ho installato archiver"
