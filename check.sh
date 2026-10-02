#!/bin/sh
# Builds with REACT_COMPILER=$1 and prints the Lingui messages that ended up in the build output.
set -u
cd /work
rm -rf .next
REACT_COMPILER="$1" npx next build > "build-$1.log" 2>&1 || { tail -20 "build-$1.log"; exit 1; }
echo "REACT_COMPILER=$1:"
grep -rhoE 'message:"[^"]*"' .next/static .next/server | sort -u
