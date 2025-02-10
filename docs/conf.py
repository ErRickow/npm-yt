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

js_source_path = ['../src/', '../src/ia/']
root_for_relative_js_paths = "."
primary_domain = 'js'

project = 'Er-NPM'
copyright = '2025, ErNewdev0'
author = 'ErNewdev0'
release = '1.1'
html_title = f"Documentations Er-NPM"

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
    "sphinx.ext.intersphinx",
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

html_theme_options = {
    "announcement": '''
    <div style="
        overflow: hidden;
        white-space: nowrap;
        width: 100%;
        background: transparent;
        padding: 5px 0;
        font-weight: bold;
        position: relative;
    ">
        <span style="
            display: inline-block;
            padding-left: 100%;
            animation: marquee 10s linear infinite, blink 0.5s step-start infinite alternate;
            color: red;
        ">
            <em>PENTING!!</em> pindah memakai er-api.biz.id! Library @er-npm/updatenya sangat lambat soalnya
        </span>
        <style>
            @keyframes marquee {
                from { transform: translateX(100%); }
                to { transform: translateX(-100%); }
            }
            @keyframes blink {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
        </style>
    </div>
    ''',
}