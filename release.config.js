module.exports = {
  branches: [
    { name: "alpha", prerelease: true },
    { name: "beta", prerelease: true },
    { name: "development", prerelease: true },
    "master",
    "main",
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tarballDir: "release",
      },
    ],
    [
      "@semantic-release/github",
      {
        assets: "release/*.tgz",
      },
    ],
    "@semantic-release/git",
  ],
  preset: "angular",
};
