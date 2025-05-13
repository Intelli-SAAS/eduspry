#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Python script to install dependencies for GCP Document AI Processor Module
This provides an alternative to the shell script for cross-platform compatibility
"""

import sys
import subprocess
import importlib.util
import os
import platform

def check_python_version():
    """Check if Python version is 3.6+"""
    if sys.version_info < (3, 6):
        print(f"Error: Python 3.6+ required. You're using {platform.python_version()}")
        return False
    return True

def install_package(package_name):
    """Install a single package using pip"""
    try:
        print(f"Installing {package_name}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package_name])
        return True
    except subprocess.CalledProcessError:
        print(f"Error: Failed to install {package_name}")
        return False

def install_from_requirements():
    """Install packages from requirements.txt"""
    req_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "requirements.txt")
    if not os.path.exists(req_path):
        print("Error: requirements.txt not found")
        return False
    
    try:
        print(f"Installing packages from {req_path}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", req_path])
        return True
    except subprocess.CalledProcessError:
        print("Error: Failed to install from requirements.txt")
        return False

def check_package_installed(package_name):
    """Check if a package is installed"""
    return importlib.util.find_spec(package_name) is not None

def verify_installation():
    """Verify that required packages are installed"""
    required_packages = {
        "google.cloud.documentai_v1": "google-cloud-documentai",
        "google.api_core.client_options": "google-api-core"
    }
    
    all_installed = True
    
    for module, package in required_packages.items():
        parts = module.split('.')
        try:
            # Try importing the module
            current = __import__(parts[0])
            for part in parts[1:]:
                current = getattr(current, part)
            print(f"✅ {module} is properly installed")
        except (ImportError, AttributeError):
            print(f"❌ {module} is not installed or importable")
            all_installed = False
            
    return all_installed

def main():
    """Main function to install and verify dependencies"""
    print("==== GCP Document AI Dependency Installer ====")
    print(f"Python version: {platform.python_version()}")
    print(f"Platform: {platform.system()} {platform.release()}")
    
    if not check_python_version():
        sys.exit(1)
    
    # Try installing from requirements.txt first
    if install_from_requirements():
        if verify_installation():
            print("\n✅ All dependencies successfully installed!")
            sys.exit(0)
    
    # If installation or verification failed, try individual packages
    print("\nAttempting to install packages individually...")
    key_packages = [
        "google-cloud-documentai>=2.16.0",
        "google-api-core>=2.10.0",
        "google-auth>=2.6.0",
        "google-cloud-core>=2.3.0"
    ]
    
    for package in key_packages:
        install_package(package)
    
    # Final verification
    if verify_installation():
        print("\n✅ All dependencies successfully installed!")
        sys.exit(0)
    else:
        # Try user-level installation
        print("\nAttempting user-level installation...")
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "--user", "-r", 
                                  os.path.join(os.path.dirname(os.path.abspath(__file__)), "requirements.txt")])
        except subprocess.CalledProcessError:
            pass
        
        if verify_installation():
            print("\n✅ All dependencies successfully installed (user-level)!")
            sys.exit(0)
        else:
            print("\n❌ Installation failed. Please try manually:")
            print(f"{sys.executable} -m pip install --user google-cloud-documentai google-api-core google-auth")
            print("\nIf you're using VS Code, try:")
            print("1. Create a virtual environment: python -m venv docai-env")
            print("2. Activate it: source docai-env/bin/activate  (or docai-env\\Scripts\\activate on Windows)")
            print("3. Install packages: pip install -r requirements.txt")
            print("4. Reload VS Code window after installation")
            sys.exit(1)

if __name__ == "__main__":
    main() 