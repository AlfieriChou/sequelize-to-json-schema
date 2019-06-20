# sequelize-to-json-schema

[![standard][standard-image]][standard-url]

[![Package Quality][quality-image]][quality-url]
[![Build Status][travis-image]][travis-url]
[![codecov][codecov-image]][codecov-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![license][license-image]][license-url]

Sequelize model generate to json schema.

## get started

* install

  ```bash
  npm install sequelize-model-to-json-schema --save
  ```

## how to use

* transform

  * demo

    ```javascript
    const s2json = require('sequelize-model-to-json-schema')
    const Project = sequelize.define('Project', {
      title: { type: Sequelize.STRING, comment: 'title' },
      bigint: { type: Sequelize.BIGINT, comment: 'test bigint' },
      number: { type: Sequelize.DOUBLE, comment: 'test double' },
      number_decimal: { type: Sequelize.DECIMAL, comment: 'test decimal' },
      uuid: { type: Sequelize.UUID, comment: 'test uuid' },
      description: { type: Sequelize.TEXT, comment: 'description' }
    })
    const transformModel = s2json.transform(Project)
    <!-- {
    type: 'object',
      properties:
      {
        id: { type: 'integer', format: 'int32', description: undefined },
        title: { type: 'string', maxLength: 255, description: 'title' },
        bigint: { type: 'integer', format: 'int32', description: 'test bigint' },
        number: { type: 'number', format: 'double', description: 'test double' },
        number_decimal: { type: 'number', description: 'test decimal' },
        uuid: { type: 'string', format: 'uuid', description: 'test uuid' },
        description: { type: 'string', description: 'description' },
        createdAt:
        { type: 'string', format: 'date-time', description: undefined },
        updatedAt:
        { type: 'string', format: 'date-time', description: undefined }
      }
    } -->
    ```

  * exclude

    ```javascript
    const s2json = require('sequelize-model-to-json-schema')
    const Project = sequelize.define('Project', {
      title: { type: Sequelize.STRING, comment: 'title' },
      description: { type: Sequelize.TEXT, comment: 'description' }
    })
    const transformModel = s2json.transform(Project, {
      exclude: ['title']
    })
    <!-- {
      type: 'object',
      properties:
      {
        id: { type: 'integer', format: 'int32', description: undefined },
        description: { type: 'string', description: 'description' },
        createdAt:
          { type: 'string', format: 'date-time', description: undefined },
        updatedAt:
          { type: 'string', format: 'date-time', description: undefined }
      }
    } -->
    ```

* convert

  * string

    ```javascript
    const convertStr = {
      test: {
        type: Sequelize.STRING,
        comment: 'test field'
      }
    }
    const convertJson = s2json.convert(convertStr)
    <!-- {
      type: 'object',
      properties: {
        test: { type: 'string', description: 'test field' }
      }
    } -->
    ```

  * object

    ```javascript
    const convertObj = {
      test: {
        type: Sequelize.JSON(),
        keys: {
          test: {
            type: Sequelize.STRING,
            comment: 'test field'
          }
        }
      }
    }
    const convertJson = s2json.convert(convertObj)
    <!-- {
      type: 'object',
      properties: {
        test: {
          type: 'object',
          properties: {
            test: { type: 'string', description: 'test field' }
          }
        }
      }
    } -->
    ```

  * array

    ```javascript
    const convertArr = {
      test: {
        type: Sequelize.ARRAY(),
        items: {
          test: {
            type: Sequelize.STRING,
            comment: 'test field'
          }
        }
      }
    }
    const convertJson = s2json.convert(convertArr)
    <!-- {
      type: 'object',
      properties: {
        test: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              test: { type: 'string', description: 'test field' }
            }
          }
        }
      }
    } -->
    ```

[quality-image]: http://npm.packagequality.com/shield/sequelize-model-to-json-schema.svg
[quality-url]: http://packagequality.com/#?package=sequelize-model-to-json-schema
[travis-image]: https://travis-ci.org/AlfieriChou/sequelize-to-json-schema.svg?branch=master
[travis-url]: https://travis-ci.org/AlfieriChou/sequelize-to-json-schema
[codecov-image]: https://codecov.io/gh/AlfieriChou/sequelize-to-json-schema/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/AlfieriChou/sequelize-to-json-schema
[daviddm-image]: https://david-dm.org/AlfieriChou/sequelize-to-json-schema.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/AlfieriChou/sequelize-to-json-schema
[license-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[license-url]: https://opensource.org/licenses/MIT
[standard-image]:
https://cdn.rawgit.com/standard/standard/master/badge.svg
[standard-url]:
https://github.com/standard/standard
