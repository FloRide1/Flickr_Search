# Angular JS S6
## By Florian "FloRide" Reimat

## Tags
- [ROOT] : project architecture (.gitignore, CI/CD, README.md, etc...)
- [COMP] : components work
- [SERV] : services work
- [APP]  : app system


## How to Launch it
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
```

## How to Build it
The steps are nearly the same as for launching the development server, except this time you need to modify [environment.prod.ts](./src/environments/environment.prod.ts):
```ts
flickr: { 
    key: "<HERE>",
}
```

And you build it with
```sh
npm run-script build
```
