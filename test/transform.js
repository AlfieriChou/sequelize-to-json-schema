const s2json = require('../')
const Sequelize = require('sequelize')
const chai = require('chai')
const expect = chai.expect

const sequelize = new Sequelize('test', 'root', '', {
  host: '127.0.0.1',
  dialect: 'mysql',
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  logging: false
})

describe('test transform!!!', () => {
  it('transform model!!', done => {
    const Project = sequelize.define('Project', {
      title: { type: Sequelize.STRING, comment: 'title' },
      bigint: { type: Sequelize.BIGINT, comment: 'test bigint' },
      number: { type: Sequelize.DOUBLE, comment: 'test double' },
      number_decimal: { type: Sequelize.DECIMAL, comment: 'test decimal' },
      uuid: { type: Sequelize.UUID, comment: 'test uuid' },
      description: { type: Sequelize.TEXT, comment: 'description' }
    })
    const transformModel = s2json.transform(Project)
    expect(transformModel).to.eql(
      {
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
      }
    )
    done()
  })

  it('transform model exclude!!', done => {
    const Project = sequelize.define('Project', {
      title: { type: Sequelize.STRING, comment: 'title' },
      description: { type: Sequelize.TEXT, comment: 'description' }
    })
    const transformModel = s2json.transform(Project, {
      exclude: ['title']
    })
    expect(transformModel).to.eql(
      {
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
      }
    )
    done()
  })
})
