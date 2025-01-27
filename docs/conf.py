# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))
import json

js_source_path = '../src/'
primary_domain = 'js'

project = 'Er-NPM'
copyright = '2025, er'
author = 'ErNewdev0'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration
# The full version, including alpha/beta/rc tags
# read the version from package.json
with open('../package.json', 'r') as read_file:
    package = json.load(read_file)
    release = package['version']

master_doc = 'index'

extensions = [
    "sphinx_js",
    "sphinx_copybutton",
]


templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'furo'
# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".

napoleon_include_special_with_doc = False
napoleon_use_rtype = False
napoleon_use_param = True
html_show_copyright = True
html_show_sphinx = False