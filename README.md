# Tariff Comparison

An API to compare basic and packaged electricity products based on consumption

## Sample Request

http://localhost:8082/tariff/api/fetch?consumption=3500

## Sample Response

```
  {
    "success":true,
    "data":{
      "packaged":{"tariffName":"Packaged Tariff","annualCosts":800},
      "basic":{"tariffName":"basic electricity tariff","annualCosts":830}
      }
  }

```

---

## Requirements

For development, you will only need Node.js and npm installed in your environment.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.16.1

    $ npm --version
    6.14.12

## Install

    $ npm install

## Running the project

    $ npm run start

## Test the project

    $ npm run test

## Contribution Guide

- Fork the repository
- Clone your fork
- Add upstream repository to your remote:
  `git remote add upstream git@github.com:adelinegayle/tariff-comparison.git`
- Create new branch off of master: `git checkout -b _myBranchName_`
- Make changes, add to stage: `git add \<file_name\> or all files git add .`
- Track to remote: `git push -u origin _myBranchName_`
- Open a pull request to the upstream repo master branch (Compare across forks, select myBranchName from your repo)
