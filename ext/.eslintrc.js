module.exports = {
    parser: '@typescript-eslint/parser', //定义ESLint的解析器
    extends: ['plugin:@typescript-eslint/recommended'],//定义文件继承的子规范
    plugins: ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
    rules: {
        // @fixable 必须使用 === 或 !==，禁止使用 == 或 !=，与 null 比较时除外
        'eqeqeq': [
            'error',
            'always',
            {
                null: 'ignore'
            }
        ],
        '@typescript-eslint/no-var-requires': 'off', 
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/class-name-casing': 'off'
    },
    env: {                          //指定代码的运行环境
        browser: true,
        node: true,
    },
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: false,
        }
    }
}
