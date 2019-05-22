module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  parser: 'babel-eslint', //使用babel-eslint来作为eslint的解析器
  extends: [
    'airbnb',
    'react-app'
    // 'eslint:recommended',
    // 'prettier',
    /* , 'plugin:jsx-a11y/recommended' */
  ],
  // globals: {
  // Atomics: 'readonly',
  // SharedArrayBuffer: 'readonly'
  // },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    project: 'tsconfig.json',
    tsconfigRootDir: './'
    // "extraFileExtensions": [".vue"]
  },
  // parserOptions: {
  //   ecmaFeatures: {
  //     jsx: true
  //   },
  //   ecmaVersion: 2015,
  //   sourceType: 'module'
  // },
  plugins: ['react', 'jsx-a11y' /* , 'prettier' */ /* ,  */],
  settings: {
    'import/resolver': {
      // webpack:{},
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },

  rules: {
    // "ignoreTemplateLiterals": true 忽略包含模板文字的行纠错
    // "ignoreRegExpLiterals": true 忽略包含 RegExp 文字的行
    // 'operator-linebreak': [2, "none"],
    // "indent": ["error", 4],
    // 'prettier/prettier': 'error',
    // code: 180,
    // 'max-len': ["error", 180, 2]',

    'object-shorthand': 0,
    'max-len': 0,
    'dot-notation': 0,
    'import/no-extraneous-dependencies': 0,
    'no-debugger': 0,
    'generator-star-spacing': 0,
    semi: 0,
    'implicit-arrow-linebreak': 0,
    'prefer-const': 0,
    'no-plusplus': 0,
    'prefer-template': 0,
    'prefer-destructuring': 0,
    'import/no-mutable-exports': 0,
    'space-before-function-paren': 0,
    'func-names': 0,
    'destructuring-assignment': 0,
    'max-len': ['error', { code: 180 }],
    'no-lone-blocks': 0,
    'operator-linebreak': 0,
    indent: 0,
    'no-unused-vars': 1,
    'object-curly-newline': 0,
    comments: 'code',
    'no-tabs': 0,
    'linebreak-style': ['error', 'unix'],
    'react/jsx-boolean-value': 1,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'no-underscore-dangle': 0,
    'no-return-assign': 0,
    'import/no-unresolved': 0,
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    // 'import/no-extraneous-dependencies': [
    // 	'error',
    // 	{
    // 		devDependencies: false,
    // 		optionalDependencies: false,
    // 		peerDependencies: false,
    // 	},
    // ],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],

    'react/jsx-boolean-value': 0,
    'react/destructuring-assignment': 0,
    'react/forbid-prop-types': 0,
    'react/require-default-props': 0,
    'react/jsx-closing-bracket-location': 0,
    /*
		对齐 换行开始标签 ex:
		<a
			bb={}
			cc={}
		> */
    'react/jsx-indent-props': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-wrap-multilines': 0,
    'react/jsx-indent': 0,
    'react/prop-types': 0,
    'react/jsx-uses-vars': 1,
    'react/jsx-uses-react': 1,
    'react/jsx-filename-extension': 0
  }
}
