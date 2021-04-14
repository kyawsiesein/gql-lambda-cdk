import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as BlogProject from '../lib/blog-project-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new BlogProject.BlogProjectStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
