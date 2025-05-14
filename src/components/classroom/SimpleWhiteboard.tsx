import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Pencil, 
  Eraser, 
  Square, 
  Circle, 
  Type, 
  Download,
  Trash2,
  ScreenShare,
  Calculator 
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

interface SimpleWhiteboardProps {
  readOnly?: boolean;
  onSave?: (data: string) => void;
  className?: string;
}

interface ShapeData {
  startX: number;
  startY: number;
  endX?: number;
  endY?: number;
}

const SimpleWhiteboard: React.FC<SimpleWhiteboardProps> = ({
  readOnly = false,
  onSave,
  className = ''
}) => {
  // Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  
  // State
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pencil' | 'eraser' | 'rectangle' | 'circle' | 'text'>('pencil');
  const [color, setColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState(2);
  const [showTextInput, setShowTextInput] = useState(false);
  const [textInput, setTextInput] = useState('');
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [shapeData, setShapeData] = useState<ShapeData | null>(null);
  const [formulaInput, setFormulaInput] = useState('');
  const [showFormulaDialog, setShowFormulaDialog] = useState(false);
  
  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set canvas to full size of container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Setup canvas context
    const context = canvas.getContext('2d');
    if (!context) return;
    
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;
    
    // Handle window resize
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Save the current drawing
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      
      // Resize canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore context properties
      context.lineCap = 'round';
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      
      // Restore the drawing
      context.putImageData(imageData, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [color, lineWidth]);
  
  // Start drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (readOnly) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    if (tool === 'text') {
      setTextPosition({ x, y });
      setShowTextInput(true);
      return;
    }
    
    if (tool === 'rectangle' || tool === 'circle') {
      setShapeData({ startX: x, startY: y });
      setIsDrawing(true);
      return;
    }
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };
  
  // Draw
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || readOnly) return;
    
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const context = contextRef.current;
    
    if (tool === 'rectangle' || tool === 'circle') {
      // Update end position for shape
      setShapeData(prev => prev ? { ...prev, endX: x, endY: y } : null);
      
      // Redraw canvas with current shape preview
      if (shapeData) {
        // Create a copy of the canvas to restore after preview
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        // Draw shape preview
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        
        if (tool === 'rectangle' && shapeData.startX !== undefined && shapeData.startY !== undefined) {
          const width = x - shapeData.startX;
          const height = y - shapeData.startY;
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.putImageData(imageData, 0, 0);
          context.strokeRect(shapeData.startX, shapeData.startY, width, height);
        } else if (tool === 'circle' && shapeData.startX !== undefined && shapeData.startY !== undefined) {
          const radius = Math.sqrt(Math.pow(x - shapeData.startX, 2) + Math.pow(y - shapeData.startY, 2));
          
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.putImageData(imageData, 0, 0);
          context.beginPath();
          context.arc(shapeData.startX, shapeData.startY, radius, 0, 2 * Math.PI);
          context.stroke();
        }
      }
      
      return;
    }
    
    if (tool === 'pencil') {
      context.strokeStyle = color;
      context.lineTo(x, y);
      context.stroke();
    } else if (tool === 'eraser') {
      context.strokeStyle = '#FFFFFF';
      context.lineTo(x, y);
      context.stroke();
    }
  };
  
  // Stop drawing
  const stopDrawing = () => {
    if (!isDrawing || readOnly) return;
    
    const context = contextRef.current;
    const canvas = canvasRef.current;
    if (!context || !canvas) return;
    
    if (tool === 'rectangle' && shapeData && shapeData.endX !== undefined && shapeData.endY !== undefined) {
      // Draw final rectangle
      const width = shapeData.endX - shapeData.startX;
      const height = shapeData.endY - shapeData.startY;
      
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.strokeRect(shapeData.startX, shapeData.startY, width, height);
      setShapeData(null);
    } else if (tool === 'circle' && shapeData && shapeData.endX !== undefined && shapeData.endY !== undefined) {
      // Draw final circle
      const radius = Math.sqrt(
        Math.pow(shapeData.endX - shapeData.startX, 2) + 
        Math.pow(shapeData.endY - shapeData.startY, 2)
      );
      
      context.strokeStyle = color;
      context.lineWidth = lineWidth;
      context.beginPath();
      context.arc(shapeData.startX, shapeData.startY, radius, 0, 2 * Math.PI);
      context.stroke();
      setShapeData(null);
    } else {
      context.closePath();
    }
    
    setIsDrawing(false);
  };
  
  // Add text to canvas
  const addText = () => {
    if (!textInput.trim() || readOnly) return;
    
    const context = contextRef.current;
    if (!context) return;
    
    context.font = '16px Arial';
    context.fillStyle = color;
    context.fillText(textInput, textPosition.x, textPosition.y);
    
    setShowTextInput(false);
    setTextInput('');
  };
  
  // Add formula to canvas
  const addFormula = () => {
    if (!formulaInput.trim() || readOnly) return;
    
    const context = contextRef.current;
    if (!context) return;
    
    try {
      // For a real implementation, you would use KaTeX or MathJax
      // Here we're just displaying it in a more mathematical format
      
      // Create a temporary div to render the formula
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.visibility = 'hidden';
      tempDiv.style.fontSize = '16px';
      tempDiv.style.fontFamily = 'serif';
      tempDiv.style.padding = '10px';
      document.body.appendChild(tempDiv);
      
      // Format the formula in a more mathematical way
      let displayFormula = formulaInput
        .replace(/\^(\d+)/g, '&sup$1;')  // Superscripts
        .replace(/\_(\d+)/g, '&sub$1;')  // Subscripts
        .replace(/sqrt\(([^)]+)\)/g, '√($1)')  // Square roots
        .replace(/pi/g, 'π')  // Pi
        .replace(/theta/g, 'θ')  // Theta
        .replace(/delta/g, 'Δ')  // Delta
        .replace(/alpha/g, 'α')  // Alpha
        .replace(/beta/g, 'β')  // Beta
        .replace(/gamma/g, 'γ')  // Gamma
        .replace(/lambda/g, 'λ')  // Lambda
        .replace(/sigma/g, 'σ')  // Sigma
        .replace(/infinity/g, '∞')  // Infinity
        .replace(/\*\*/g, '^')  // Replace ** with ^
        .replace(/\*/g, '×')  // Replace * with ×
        .replace(/\//g, '÷');  // Replace / with ÷
      
      tempDiv.innerHTML = displayFormula;
      
      // Draw the formula on canvas
      const canvasX = 50;
      const canvasY = 50;
      
      // Draw a background
      context.fillStyle = 'rgba(255, 255, 255, 0.8)';
      context.fillRect(canvasX - 5, canvasY - 20, tempDiv.offsetWidth + 10, 30);
      
      // Draw the formula text
      context.font = 'italic 16px serif';
      context.fillStyle = color;
      context.fillText(`f(x) = ${displayFormula}`, canvasX, canvasY);
      
      // Clean up
      document.body.removeChild(tempDiv);
      
      setShowFormulaDialog(false);
      setFormulaInput('');
      
      toast({
        title: 'Formula Added',
        description: 'Mathematical formula has been added to the whiteboard',
      });
    } catch (error) {
      console.error('Error adding formula:', error);
      toast({
        title: 'Error Adding Formula',
        description: 'There was a problem rendering the formula',
        variant: 'destructive',
      });
    }
  };
  
  // Clear canvas
  const clearCanvas = () => {
    if (readOnly) return;
    
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;
    
    context.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  // Save canvas as image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Create an image from the canvas
    const dataUrl = canvas.toDataURL('image/png');
    
    // Call onSave prop if provided
    if (onSave) {
      onSave(dataUrl);
    } else {
      // Create download link
      const link = document.createElement('a');
      link.download = `whiteboard-${new Date().toISOString().split('T')[0]}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Toolbar */}
      <div className="flex justify-between items-center py-2 px-4 bg-gray-100 dark:bg-gray-800 border-b">
        <div className="flex items-center gap-2">
          <Button
            variant={tool === 'pencil' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('pencil')}
            disabled={readOnly}
          >
            <Pencil className="h-4 w-4 mr-1" />
            Pencil
          </Button>
          
          <Button
            variant={tool === 'eraser' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('eraser')}
            disabled={readOnly}
          >
            <Eraser className="h-4 w-4 mr-1" />
            Eraser
          </Button>
          
          <Button
            variant={tool === 'text' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('text')}
            disabled={readOnly}
          >
            <Type className="h-4 w-4 mr-1" />
            Text
          </Button>
          
          <Button
            variant={tool === 'rectangle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('rectangle')}
            disabled={readOnly}
          >
            <Square className="h-4 w-4 mr-1" />
            Rectangle
          </Button>
          
          <Button
            variant={tool === 'circle' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTool('circle')}
            disabled={readOnly}
          >
            <Circle className="h-4 w-4 mr-1" />
            Circle
          </Button>
          
          <div className="flex items-center gap-1 ml-2">
            <label htmlFor="colorPicker" className="text-xs">Color:</label>
            <input
              id="colorPicker"
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              disabled={readOnly}
              className="w-8 h-6"
            />
          </div>
          
          <div className="flex items-center gap-1 ml-2">
            <label htmlFor="lineWidth" className="text-xs">Width:</label>
            <input
              id="lineWidth"
              type="range"
              min="1"
              max="20"
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              disabled={readOnly}
              className="w-20"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={clearCanvas}
            disabled={readOnly}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Clear
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={saveCanvas}
          >
            <Download className="h-4 w-4 mr-1" />
            Save
          </Button>
          
          <Dialog open={showFormulaDialog} onOpenChange={setShowFormulaDialog}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={readOnly}
              >
                <Calculator className="h-4 w-4 mr-1" />
                Formula
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Mathematical Formula</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Label htmlFor="formula" className="mb-2 block">Enter formula:</Label>
                <Input
                  id="formula"
                  placeholder="e.g., x^2 + 2x + 1"
                  value={formulaInput}
                  onChange={(e) => setFormulaInput(e.target.value)}
                  className="mb-4"
                />
                <div className="flex justify-end gap-2">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={addFormula}>Add to Whiteboard</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      {/* Canvas */}
      <div className="flex-1 relative bg-white">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
        
        {/* Text input popup */}
        {showTextInput && (
          <div
            className="absolute bg-white border rounded-md p-2 shadow-md"
            style={{ left: textPosition.x, top: textPosition.y }}
          >
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="border rounded px-2 py-1 mb-2 w-full"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTextInput(false)}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={addText}
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleWhiteboard; 