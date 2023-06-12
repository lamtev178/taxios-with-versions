# taxios-with-versions

[![npm version](https://badge.fury.io/js/taxios-with-versions.svg)](https://badge.fury.io/js/taxios-with-versions)

Wrapper over [@simplesmiler/taxios-generate](https://github.com/simplesmiler/taxios/tree/master/packages/taxios-generate) to auto publish generated types file depending on the package version.

This package exposes a node CLI command called `taxios-version-generate`.

## Instalation:

```
npm i taxios-with-versions
```

## Usage:

> NOTE: You you must be logged in to npm

```sh
npx taxios-version-generate -o PetStore.ts --package-version 1.0.0 -e PetStore https://petstore.swagger.io/v2/swagger.json
```

#

You can use environment variables in script

```
//.env
OUT_FILE=generated/PetStore.ts
URL=https://petstore.swagger.io/v2/swagger.json
```

```sh
npx taxios-version-generate -o OUT_FILE --package-version 1.0.6 -e PetStore URL
```

#

You can specify the package name yourself

```sh
npx taxios-version-generate --package-version 1.0.6 --package-name taxios_petstore_test -o OUT_FILE -e PetStore URL
```

Specifying `--registry` will generate a .npmrc file with your scope

```sh
npx taxios-version-generate --package-version 1.0.6 --package-name taxios_petstore_test --registry @myscope:registry=https://mycustomregistry.example.org -o OUT_FILE -e PetStore URL
```
