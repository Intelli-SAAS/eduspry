#!/bin/bash

# Script to install dependencies for Google Cloud Document AI processor

echo "===== Installing Document AI Dependencies ====="

# Create virtual environment if it doesn't exist
VENV_DIR="./docai-env"
if [ ! -d "$VENV_DIR" ]; then
  echo "Creating virtual environment in $VENV_DIR..."
  python3 -m venv "$VENV_DIR"
else
  echo "Virtual environment already exists at $VENV_DIR"
fi

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  # Windows
  source "$VENV_DIR/Scripts/activate"
else
  # Unix/Linux/MacOS
  source "$VENV_DIR/bin/activate"
fi

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies from requirements.txt
echo "Installing dependencies from requirements.txt..."
pip install -r requirements.txt

# Explicitly install Google Cloud libraries to ensure they're available
echo "Installing Google Cloud libraries..."
pip install google-cloud-documentai>=2.16.0 google-api-core>=2.10.0 google-auth>=2.6.0

# Verify installation
echo "Verifying installation..."
python -c "
try:
    import google.cloud.documentai_v1 as documentai
    import google.api_core.client_options
    print('✅ All dependencies installed successfully!')
except ImportError as e:
    print(f'❌ Error importing dependencies: {e}')
    exit(1)
"

echo "===== Installation Complete ====="
echo "To use the Document AI processor, activate the virtual environment:"
echo "source $VENV_DIR/bin/activate  # Unix/Linux/MacOS"
echo "source $VENV_DIR/Scripts/activate  # Windows" 