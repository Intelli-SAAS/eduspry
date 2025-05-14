#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Setup script for the GCP Document AI Processor Module
"""

from setuptools import setup, find_packages

setup(
    name="gcp-documentai-processor",
    version="0.1.0",
    description="Python module for Google Cloud Document AI",
    author="EduSpry",
    packages=find_packages(),
    install_requires=[
        "google-cloud-documentai>=2.16.0",
        "google-api-core>=2.10.0",
        "google-auth>=2.6.0",
        "google-cloud-core>=2.3.0",
        "requests>=2.27.1",
    ],
    python_requires=">=3.7",
) 