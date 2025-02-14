'use strict';

const config = require('conventional-changelog-conventionalcommits');

module.exports = config({
  issuePrefixes: ['#'],
  issueUrlFormat: 'https://github.com/ErRickow/npm-yt/issues/{{id}}',
  commitUrlFormat: 'https://github.com/ErRickow/npm-yt/commit/{{hash}}',
  userUrlFormat: 'https://github.com/{{user}}',
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'docs', section: 'Documentation' },
    { type: 'style', section: 'Styles' },
    { type: 'refactor', section: 'Code Refactoring' },
    { type: 'perf', section: 'Performance Improvements' },
    { type: 'test', section: 'Tests' },
    { type: 'chore', section: 'Chores' },
    { type: 'revert', section: 'Reverts' }
  ]
});