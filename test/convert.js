const s2json = require('../')
const Sequelize = require('sequelize')
const chai = require('chai')
const expect = chai.expect

describe('test convert!!!', () => {
  it('convert string!!', (done) => {
    const convertStr = {
      test: {
        type: Sequelize.STRING,
        comment: 'test field'
      }
    }
    const convertJson = s2json.convert(convertStr)
    expect(convertJson).to.eql(
      {
        type: 'object',
        properties: {
          test: { type: 'string', description: 'test field' }
        }
      }
    )
    done()
  })

  it('convert boolean!!', (done) => {
    const convertStr = {
      test: {
        type: Sequelize.BOOLEAN,
        comment: 'test field'
      }
    }
    const convertJson = s2json.convert(convertStr)
    expect(convertJson).to.eql(
      {
        type: 'object',
        properties: {
          test: { type: 'boolean', description: 'test field' }
        }
      }
    )
    done()
  })

  it('convert integer!!', (done) => {
    const convertStr = {
      test: {
        type: Sequelize.INTEGER,
        comment: 'test field'
      }
    }
    const convertJson = s2json.convert(convertStr)
    expect(convertJson).to.eql(
      {
        type: 'object',
        properties: {
          test: { type: 'integer', description: 'test field' }
        }
      }
    )
    done()
  })

  it('convert object!!', (done) => {
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
    expect(convertJson).to.eql(
      {
        type: 'object',
        properties: {
          test: {
            type: 'object',
            properties: {
              test: { type: 'string', description: 'test field' }
            }
          }
        }
      }
    )
    done()
  })

  it('convert array!!', (done) => {
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
    expect(convertJson).to.eql(
      {
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
      }
    )
    done()
  })
})
