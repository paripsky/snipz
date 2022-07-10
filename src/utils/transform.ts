import { transform as BabelTransform } from '@babel/standalone';

export function transform(code: string) {
  return BabelTransform(code, {
    presets: ['react', 'typescript'],
    filename: 'file.tsx',
    // presets: ['es2015', 'stage-0', 'react'],
    // plugins: [
    //   'transform-decorators-legacy',
    //   'transform-class-properties',
    //   'transform-object-rest-spread',
    // ],
  }).code;
}
