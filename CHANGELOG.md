# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
It is maintained in [Markdown](https://www.markdownguide.org/).

## [Unreleased]
- move some packages from production to development
 - perhaps reduce bundled JS size; consider splitting: https://webpack.js.org/guides/code-splitting/
 - purge unused packages
- consider React Testing Library
 - https://reactjs.org/docs/testing.html
 - consider https://reactjs.org/docs/hooks-faq.html#how-to-test-components-that-use-hooks
- add oil/fat ingredient like salt
- replace usage of StarterLexicon with simply BreadLexicon; the prior is a subset of the latter
- consider/implement react-styleguidist or similar
 - https://www.nearform.com/blog/react-components-living-style-guides-overview/

## [1.0.0] - 2020-09-08
### Added
- a functioning Bread Calculator, powered by React and a background Ingredient/Mixture library