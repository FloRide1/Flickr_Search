# Angular JS S6
## By Florian "FloRide" Reimat

## Tags
- [ROOT] : project architecture (.gitignore, CI/CD, README.md, etc...)
- [COMP] : components work
- [SERV] : services work


## How to use it
First install the server:
```sh
npm install
```

Next go to [./src/environments/environment.ts](./src/environments/environment.ts) and add your Flickr API (Public) key
```ts
flickr: { 
    key: "<HERE>",
}
```

Then you can launch it
```sh
# Launch developpment server
npm start
# OR
# Build server
npm build
```
