# taxios-with-versions

Wrapper over [@simplesmiler/taxios-generate](https://github.com/simplesmiler/taxios/tree/master/packages/taxios-generate) to auto publish generated types file depending on the package version.

This package exposes a node CLI command called `taxios-version-generate`.

## Instalation:

```
npm i taxios-with-versions

```

## Usage:

```sh
npx taxios-version-generate -o PetStore.ts --package-version 1.0.0 -e PetStore https://petstore.swagger.io/v2/swagger.json
```
