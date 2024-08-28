import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';

// Flat Config (ESLint v9+)
export default [
  {
    // ESLint 적용할 파일 종류
    files: ['**/*.{js,mjs,cjs,jsx}'],
  },
  {
    // 사용할 ESLint 플러그인들
    plugins: {
      react: pluginReact,
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh,
    },
  },
  {
    settings: {
      // React 설정
      react: {
        // 프로젝트의 React 버전을 자동으로 감지
        version: 'detect',
      },
    },
    languageOptions: {
      // 파서 옵션을 지정
      parserOptions: {
        // 사용하려는 ECMAScript 기능을 지정
        ecmaFeatures: {
          jsx: true, // JSX 구문 분석 활성화
        },
      },
      // 글로벌 변수 설정
      globals: {
        // 브라우저의 글로벌 변수
        ...globals.browser,
        // Node.js의 글로벌 변수
        ...globals.node,
      },
    },
  },
  // ESLint의 기본 권장 설정
  pluginJs.configs.recommended,
  // React 플러그인의 권장 설정
  pluginReact.configs.flat.recommended,
  {
    // ESLint 규칙 설정
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': 'warn', // 파일에서 React 컴포넌트만을 export하도록 경고
      'react/react-in-jsx-scope': 'off', // React 17버전 이후 jsx API를 사용하기 때문에 import React 안해도 됨
      'react/prop-types': 'warn', // propTypes 작성하지 않으면 경고
      'no-unused-vars': 'warn', // 사용되지 않은 변수 경고
    },
  },
];
