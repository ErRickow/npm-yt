import os
import sys
sys.path.insert(0, os.path.abspath("../src_for_doc./AutoDocAction"))

project = 'Documentation for Er-NPM'
copyright = '2025, er'
author = 'ErNewdev0'
release = '1.0'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

autosummary_generate = True

extensions = [
    "sphinx_js",
    "sphinx.ext.autosummary",
    "sphinx.ext.autodoc",
    "sphinx.ext.napoleon",
    "sphinx_copybutton",
    "sphinx_exec_code",
]
js_language = 'typescript'
js_source_path = '../src/*'
primary_domain = 'js'


templates_path = ['_templates']
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']



# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_rtd_theme'
html_static_path = ['_static']