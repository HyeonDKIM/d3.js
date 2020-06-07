#!/bin/bash

for file in $(find . -name "*.json")
do
    topojson "$file" -p > "$file"2
done

ls | grep '.json2' | cut -d. -f 1 | while read line; do mv $line.json2 $line-topo.json; done