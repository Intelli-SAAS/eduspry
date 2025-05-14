#!/bin/bash
# Script to fix VS Code integration for Document AI module

echo "===== Setting up VS Code Integration ====="

# Create .vscode directory if it doesn't exist
mkdir -p .vscode

# Create settings.json
cat > .vscode/settings.json << 'EOL'
{
  "python.defaultInterpreterPath": "${workspaceFolder}/docai-env/bin/python",
  "python.analysis.extraPaths": [
    "${workspaceFolder}/docai-env/lib/python3.8/site-packages",
    "${workspaceFolder}/docai-env/lib/python3.9/site-packages"
  ],
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.analysis.diagnosticMode": "workspace",
  "python.analysis.typeCheckingMode": "basic"
}
EOL

# Create pyrightconfig.json
cat > pyrightconfig.json << 'EOL'
{
  "venvPath": ".",
  "venv": "docai-env",
  "extraPaths": [
    "./docai-env/lib/python3.8/site-packages",
    "./docai-env/lib/python3.9/site-packages"
  ],
  "reportMissingImports": false,
  "reportMissingTypeStubs": false
}
EOL

echo "===== VS Code Integration Setup Complete ====="
echo ""
echo "To fix the import errors in VS Code:"
echo "1. Reload your VS Code window"
echo "2. Select the Python interpreter by pressing Cmd+Shift+P (Mac) or Ctrl+Shift+P (Windows/Linux)"
echo "   and typing 'Python: Select Interpreter'"
echo "3. Choose the interpreter from the docai-env virtual environment"
echo ""
echo "If you still see import errors, try running:"
echo "./install_dev_dependencies.sh" 