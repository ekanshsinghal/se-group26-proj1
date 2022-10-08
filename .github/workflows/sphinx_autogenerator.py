name: sphinx-autogenerator

on:
  push:
    branches: 
      - main
  pull_request:
    branches: 
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
#     - uses: actions/checkout@v1
#     # Standard drop-in approach that should work for most people.
#     - uses: ammaraskar/sphinx-action@master
#       with:
#         build-command: "make html"
#         docs-folder: "docs/"
#     # Great extra actions to compose with:
#     # Create an artifact of the html output.
#     - uses: actions/upload-artifact@v1
#       with:
#         name: DocumentationHTML
#         path: docs/_build/html/
#     - uses: stefanzweifel/git-auto-commit-action@v4
#       with:
#         commit_message: Updated documentation
#         branch: main
    - uses: actions/checkout@v2
    - name: Build documentation and commit
      run: |
          git pull
          cd docs/
          sudo apt-get install python3-sphinx
          sudo rm backend.rst
          sudo rm modules.rst
          sphinx-apidoc -o . ../backend/
          make html
          cd ..
          git config --global user.name "gowtham-sathyan"
          git config --global user.email "gowthamsathyan@gmail.com"
          git add .
          git commit -m "Updated documentation" -a || true
          git push
    # ===============================
