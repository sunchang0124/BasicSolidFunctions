# Basic Solid Functions
This repo provides basic SOLID functions which can be integrated to other framework.



Step 0: Download this git repo and go to the home folder

Step 1: install packages:

``` shell
npm i -s rdflib
npm i -s solid-auth-cli
npm i -s fs
npm i -s js-yaml
```

Step 2: configure your solid login info

```shell
SOLID_IDP: #your solid provider # e.g., "https://inrupt.net" or "https://solid.community"
SOLID_USERNAME: # your SOLID webid # e.g. "https://chang.inrupt.net/profile/card#me" 
SOLID_PASSWORD: # your password #
```

Step 3: run the script:

``` shell
node index.js 
```

If it runs successfully, you will see your SOLID WebID and your name on SOLID on console. 

