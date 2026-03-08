/**
 * Custom shiki theme matching Supabase's "Supabase 2" code block colors.
 * Dark mode hex values from their code-block-variables.css.
 *
 * Green:  #3ecf8e — functions, constants, properties, tags
 * Tan:    #ffcda1 — strings, string expressions, imports
 * Purple: #bda4ff — keywords, storage, return types
 * Gray:   #7e7e7e — comments (italic)
 * White:  #ffffff — foreground, punctuation, parameters, variables
 */
export const supabaseTheme = {
  name: 'supabase',
  displayName: 'Supabase Theme',
  type: 'dark' as const,
  colors: {
    'editor.background': '#171717',
    'editor.foreground': '#ffffff',
    'editor.lineHighlightBackground': '#232323',
    'editorCursor.foreground': '#ffffff',
    'editor.selectionBackground': '#232323',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment', 'string.comment'],
      settings: { foreground: '#7e7e7e', fontStyle: 'italic' },
    },
    {
      scope: ['constant', 'entity.name.constant', 'variable.other.constant', 'constant.language'],
      settings: { foreground: '#3ecf8e' },
    },
    {
      scope: ['entity', 'entity.name', 'entity.name.type', 'support.type', 'support.class'],
      settings: { foreground: '#3ecf8e' },
    },
    {
      scope: ['variable', 'support.variable', 'variable.parameter'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control'],
      settings: { foreground: '#bda4ff' },
    },
    {
      scope: ['string', 'constant.other.symbol', 'constant.other.key', 'string.quoted'],
      settings: { foreground: '#ffcda1' },
    },
    {
      scope: ['support.function', 'entity.name.function', 'meta.function-call', 'meta.method-call'],
      settings: { foreground: '#3ecf8e' },
    },
    {
      scope: ['punctuation', 'punctuation.separator', 'meta.brace', 'punctuation.definition'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['meta.tag', 'declaration.tag', 'markup.deleted'],
      settings: { foreground: '#3ecf8e' },
    },
    {
      scope: ['markup.inserted'],
      settings: { foreground: '#ffcda1' },
    },
    {
      scope: ['markup.changed', 'meta.embedded'],
      settings: { foreground: '#ffcda1' },
    },
    {
      scope: [
        'support.type.property-name',
        'entity.other.attribute-name',
        'meta.object-literal.key',
        'entity.other.inherited-class',
      ],
      settings: { foreground: '#3ecf8e' },
    },
    {
      scope: ['meta.return-type'],
      settings: { foreground: '#bda4ff' },
    },
    {
      scope: [
        'meta.import',
        'string.quoted.single.js',
        'string.quoted.double.js',
        'string.quoted.single.ts',
        'string.quoted.double.ts',
        'string.quoted.single.tsx',
        'string.quoted.double.tsx',
        'string.quoted.single.jsx',
        'string.quoted.double.jsx',
      ],
      settings: { foreground: '#ffcda1' },
    },
    {
      scope: ['meta.var.expr'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['meta.block', 'meta.delimiter.period', 'meta.brace.round', 'meta.paren.expr'],
      settings: { foreground: '#ffffff' },
    },
    {
      scope: ['invalid', 'invalid.deprecated'],
      settings: { foreground: '#ffffff' },
    },
  ],
};
