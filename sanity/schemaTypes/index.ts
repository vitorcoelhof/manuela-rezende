import { SchemaTypeDefinition } from 'sanity'
import { imovelType } from './imovel'
import { corretoraType } from './corretora'

export const schemaTypes: SchemaTypeDefinition[] = [imovelType, corretoraType]
