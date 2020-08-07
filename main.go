package main

import (
  "crypto/sha256"
  "crypto/sha512"
  "github.com/docker/distribution/reference"
)

func main() {
  sha256.New()
  sha512.New()
  reference.Parse("debian:latest")
}
