export function generateBottomToTopSineWaveSVGPath(frequency: number, amplitude: number, numPoints: number, height: number): string {
    const yIncrement = height / numPoints;
    let path = `M 0,${height} `; // Start at the bottom (0, height)
    
    for (let i = 1; i <= numPoints; i++) {
      const y = height - i * yIncrement; 
      const x = amplitude * Math.sin(frequency * y);
  
      // Calculate relative x and y distances from the previous point
      const prevY = height - (i - 1) * yIncrement;
      const prevX = amplitude * Math.sin(frequency * prevY);
      const dx = x - prevX;
      const dy = y - prevY;
  
      path += `l ${dx},${dy} `;
    }
  
    return path
  }
  