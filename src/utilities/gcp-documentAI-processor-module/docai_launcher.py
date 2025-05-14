#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Document AI Launcher Script

This script properly sets up the Python environment and path
to ensure all imports work correctly regardless of how/where
the script is executed from.
"""

import os
import sys
import subprocess
import importlib.util
import platform

# Add the current directory to sys.path
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, SCRIPT_DIR)

# Check if virtual environment exists and activate it programmatically
VENV_DIR = os.path.join(SCRIPT_DIR, "docai-env")
VENV_PYTHON = os.path.join(VENV_DIR, 
                          "bin" if platform.system() != "Windows" else "Scripts",
                          "python" + (".exe" if platform.system() == "Windows" else ""))

def is_venv_active():
    """Check if a virtual environment is active"""
    return hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix)

def check_imports():
    """Check if required modules can be imported"""
    try:
        import google.cloud.documentai_v1
        import google.api_core.client_options
        return True
    except ImportError as e:
        print(f"Import error: {e}")
        return False
        
def try_install_dependencies():
    """Try to install dependencies if they're missing"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", 
                              os.path.join(SCRIPT_DIR, "requirements.txt")])
        return True
    except subprocess.CalledProcessError:
        return False

def run_in_venv(config_path=None):
    """Run the process_document_sample.py in the virtual environment"""
    if os.path.exists(VENV_PYTHON):
        script_path = os.path.join(SCRIPT_DIR, "process_document_sample.py")
        # Check if a config file was provided
        if config_path:
            os.execl(VENV_PYTHON, VENV_PYTHON, script_path, config_path)
        else:
            os.execl(VENV_PYTHON, VENV_PYTHON, script_path)
    else:
        print("Virtual environment not found. Creating one...")
        try:
            if platform.system() != "Windows":
                subprocess.check_call([sys.executable, "-m", "venv", VENV_DIR])
            else:
                subprocess.check_call([sys.executable, "-m", "venv", VENV_DIR])
                
            print("Installing dependencies in virtual environment...")
            pip_cmd = os.path.join(VENV_DIR, 
                                  "bin" if platform.system() != "Windows" else "Scripts",
                                  "pip" + (".exe" if platform.system() == "Windows" else ""))
            
            subprocess.check_call([pip_cmd, "install", "-r", 
                                  os.path.join(SCRIPT_DIR, "requirements.txt")])
            
            print("Virtual environment setup complete, launching Document AI processor...")
            if config_path:
                os.execl(VENV_PYTHON, VENV_PYTHON, os.path.join(SCRIPT_DIR, "process_document_sample.py"), config_path)
            else:
                os.execl(VENV_PYTHON, VENV_PYTHON, os.path.join(SCRIPT_DIR, "process_document_sample.py"))
        except subprocess.CalledProcessError as e:
            print(f"Failed to set up virtual environment: {e}")
            sys.exit(1)

def main():
    """Main function to run the Document AI processor"""
    print("===== Document AI Processor Launcher =====")
    print(f"Python version: {platform.python_version()}")
    print(f"Platform: {platform.system()} {platform.release()}")
    print(f"Script directory: {SCRIPT_DIR}")
    
    # Check if a config file was provided
    config_path = None
    if len(sys.argv) > 1 and os.path.exists(sys.argv[1]):
        config_path = sys.argv[1]
        print(f"Using configuration from: {config_path}")
    
    if is_venv_active():
        print("Running in virtual environment")
        if check_imports():
            print("All imports available, running processor...")
            try:
                # If a config file was provided, use it
                if config_path:
                    from process_document_sample import process_from_config
                    process_from_config(config_path)
                else:
                    from process_document_sample import process_sample_document
                    process_sample_document()
            except Exception as e:
                print(f"Error running Document AI processor: {e}")
                sys.exit(1)
        else:
            print("Missing imports, trying to install dependencies...")
            if try_install_dependencies() and check_imports():
                print("Dependencies installed, running processor...")
                try:
                    if config_path:
                        from process_document_sample import process_from_config
                        process_from_config(config_path)
                    else:
                        from process_document_sample import process_sample_document
                        process_sample_document()
                except Exception as e:
                    print(f"Error running Document AI processor: {e}")
                    sys.exit(1)
            else:
                print("Failed to install dependencies, trying to run in virtual environment...")
                run_in_venv(config_path)
    else:
        print("Not running in virtual environment, launching in venv...")
        run_in_venv(config_path)

if __name__ == "__main__":
    main() 