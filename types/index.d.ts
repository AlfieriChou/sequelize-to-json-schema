import * as Sequelize from 'sequelize'
import { JSONSchema4 } from 'json-schema'

interface Field {
  type: Sequelize.DataType
  comment?: string
}

interface KeyField {
  [key: string]: Field
}

interface FieldProperty {
  type: Sequelize.DataType
  comment?: string
  keys?: KeyField
  items?: KeyField
}

interface Convert {
  [key: string]: FieldProperty
}

export interface JsonSchema {
  convert: (data: Convert) => JSONSchema4 | Promise<JSONSchema4>
  transform: (model: Sequelize.Model) => JSONSchema4 | Promise<JSONSchema4>
}
