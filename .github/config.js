'use strict';

const config = async () => {
  const conventionalChangelogConfig = await import('conventional-changelog-conventionalcommits');

  return conventionalChangelogConfig.default({
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
    ],
    releaseRules: [
      { type: 'feat', release: 'minor' }, // Fitur baru -> minor update
      { type: 'fix', release: 'patch' }, // Perbaikan bug -> patch update
      { type: 'BREAKING CHANGE', release: 'major' } // Breaking changes -> major update
    ],
    parserOpts: {
      noteKeywords: ['BREAKING CHANGE', 'BREAKING CHANGES']
    }
  });
};

module.exports = config;