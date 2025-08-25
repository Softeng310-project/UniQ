# Contributing to UniQ

Firstly, we would like to give you a warm welcome and a thank you for deciding to contribute to UniQ! It is due to contributors like you that UniQ is able to become a reality.

This document outlines the contribution guidelines for UniQ.

## Bugs!

If you find a bug within the codebase, complete the following steps:

1. Search for **[existing issues](https://github.com/Softeng310-project/UniQ/issues)** and make sure the bug has not already been reported.

2. If not found, **[create a new issue](https://github.com/Softeng310-project/UniQ/issues/new)** and include the following:
    - A short paragraph **clearly and concisely** describing the problem.
    - Steps to reproduce the bug.
    - Screenshots of the bug (if applicable).
    - Your software environment (browser, OS, etc.).

Please make sure you stay up to date on any issues you create as others will likely be commenting on them for follow up questions etc.

## New Features!

Bring your bright ideas to life! When suggesting a feature:

1. **[Open a feature request issue](https://github.com/Softeng310-project/UniQ/issues/new?labels=enhancement)**.

2. Include the following in your description:
    - A **clear and concise** description of the feature.
    - What problem(s) the feature would solve.
    - How this feature would interact and work within the app (examples, screenshots, illustrations, etc.).
    - Why it would improve the project.

We heavily encourage you to be creative, bring out your wild side when suggesting!

## Setting Up! 

To get yourself set up and be able to contribute to UniQ, follow these steps:

1. **Fork** this repository to your account.

2. **Clone** your forked repository.

3. Set the **upstream** as the original repository with:

    `git remote add upstream https://github.com/Softeng310-project/UniQ.git`

4. Install dependencies with:

    `npm install`

5. Run the server with:

    `npm run dev`

## Pull Requests!

Before making any changes to your code:

- Create a new branch with: `git checkout -b <type>/<short-descriptive-name>`.
- Examples for branch names are **“feature/footer”** or **“issue/bug-with-navbar”**.

Once you have made your changes:

- Make sure the code works and the project works as intended.
- Commit using a short descriptive message: `git commit -m "added feature for the Navigation Bar"`.
- Push to your forked repository with: `git push origin <type>/<short-descriptive-name>`.
- Make a pull request on your forked repository.
- Add additional details within the description of the Pull Request and make sure to **reference the ticket number** that the Pull Request solves. For example, **"added x feature, this completes ticket #42"**.

## Accepted Contributions? 

Confused if your contributions are allowed or not? Here are a few types of **accepted contributions**:

- Improvements to the code base (features, bug fixes, overall optimization).
- Test improvements (increasing test coverage, better test parameters).
- Feedback for the design of the project.
- Documentation updates (missing vital information, inline comments, etc.).

We do **NOT** accept the following:

- Changes unrelated to UniQ (adding features that have nothing to do with UniQ).
- Disregarding the guidelines (making changes on main, not following naming conventions).

While we do try to keep our guidelines loose to encourage creativity within our community, please do not take advantage and keep within the guidelines listed out within this document.

## Beginner Contributors!

We understand that being a new contributor is a daunting task, so we have compiled some easy issues for beginners to take on. These issues are labeled with **['good first issue'](https://github.com/Softeng310-project/UniQ/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22)**.

## Technical Requirements!

To accodomate all our wonderful contributors and their different skill levels, we have decided to keep our technical requirements loose:

### 1. Code Style

To keep this requirement simple, we have decided to make use of **Sonar** (SonarLint, SonarQube, and SonarCloud) to make sure our codebase adheres to conventional code styles. Thus, please make sure you are using SonarLint within your desired IDE while making contributions.

### 2. Code Vulnerabilities.

To make sure that UniQ has as little vulnerabilities within it as possible, all contributors are required to be using **Snyk** within their desired IDEs. These should be available as simple plugins on these IDEs; JetBrains IDEs, Visual Studio, VS Code, Eclipse.

### 3. Documentation

If any changes you made to the codebase causes the project's behaviour to change, you are required to document this behaviour in the **[README.md](README.md)** file.

## Vision!

We would like to be able to get UniQ up and running before the start of the **2026 academic year**. We wish to provide the students of UoA a centralized marketplace for their much needed academic supplies while bringing forth the many **benefits of e-commerce**.

## Architecture!

### Front-End:

- React
- Next.js 14 
- TypeScript
- Tailwind CSS

### Back-End:

- MongoDB (native driver)
- Mongoose
- Next.js API routes

## Ground Rules. 🪨

We urge everyone to follow the **[Code of Conduct](CODE_OF_CONDUCT.md)** as we have a zero-tolerance policy for anyone blatantly disregarding our ground rules.

## Contact Information!

Daniel: dkim848@aucklanduni.ac.nz

Kieran: kmck133@aucklanduni.ac.nz

Meara: mkee115@aucklanduni.ac.nz

Minseo: mkim719@aucklanduni.ac.nz

Muhammad: mmoh314@aucklanduni.ac.nz

Nathan: ntur101@aucklanduni.ac.nz

## Thank You!

We would like to once again thank you for taking an interest in contributing to UniQ! We hope you have a good time within our community and we wish you the best of luck with your programming adventures!