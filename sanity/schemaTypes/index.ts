import { SchemaTypeDefinition } from 'sanity'
import { imovelType } from './imovel'
import { corretoraType } from './corretora'
import { consultaType } from './consulta'

export const schemaTypes: SchemaTypeDefinition[] = [imovelType, corretoraType, consultaType]
