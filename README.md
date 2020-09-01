# Star Notary v2

Star Notary v2 is a Udacity project made at the Blockchain Developer Nanodegree.
This is a newer version of the code presented at the Lesson 3 of the chapter 2 since the code provided by Udacity is not updated.

Node version: v12.6.0


## Installation

```bash
git clone https://github.com/marioBZ7/starNotaryv2.git
cd starNotaryv2
npm install openzeppelin-solidity@2.1.2
npm i -g truffle@nodeLTS 
```

## Usage

```bash
truffle develop
```

One you are in the truffle console:
```bash
truffle develop
compile
migrate --reset
test
```

To use the frontend application go to the app directory
```bash
cd app
npm run dev
```

The application should be available at:
```bash
http://localhost:8080
```
