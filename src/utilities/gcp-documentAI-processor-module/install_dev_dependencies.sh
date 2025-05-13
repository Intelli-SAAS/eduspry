#!/bin/bash
# Script to install dependencies globally for development

echo "===== Installing Document AI Development Dependencies ====="

# Check if running in a virtualenv
if python3 -c "import sys; exit(0 if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix) else 1)" ; then
    # In virtualenv
    echo "Detected virtualenv, installing dependencies directly..."
    pip3 install google-cloud-documentai>=2.16.0 google-api-core>=2.10.0 google-auth>=2.6.0 google-cloud-core>=2.3.0
else
    # Not in virtualenv
    echo "Installing Google Cloud libraries with --user flag..."
    pip3 install --user google-cloud-documentai>=2.16.0 google-api-core>=2.10.0 google-auth>=2.6.0 google-cloud-core>=2.3.0
fi

# Verify installation
echo "Verifying installation..."
python3 -c "
try:
    import google.cloud.documentai_v1 as documentai
    import google.api_core.client_options
    print('✅ All dependencies installed successfully!')
except ImportError as e:
    print(f'❌ Error importing dependencies: {e}')
    exit(1)
"

echo "===== Installation Complete ====="
echo "Your IDE should now recognize the Google Cloud imports."
echo ""
echo "If you still see import errors in your IDE:"
echo "1. Reload your VS Code window"
echo "2. Select the Python interpreter by pressing Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)"
echo "   and typing 'Python: Select Interpreter'"
echo ""
echo "Note: For runtime, you should still use the virtual environment with install_dependencies.sh" 