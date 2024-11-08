type Point = { x: number; y: number };

export function generateCirclePathSVGRelative(radius: number, numPoints: number  , circleR:number , moreLine :boolean = true): string {
  const angleIncrement = (-2 * Math.PI) / numPoints;
  let path = `M ${radius * 2 + circleR },${radius + circleR  } `; // Start at the initial point on the circle
  
  for (let i = 1; i < numPoints; i++) {
    const angle = i * angleIncrement;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    // Calculate relative x and y distances from the previous point
    const prevAngle = (i - 1) * angleIncrement;
    const prevX = radius * Math.cos(prevAngle);
    const prevY = radius * Math.sin(prevAngle);
    const dx = x - prevX;
    const dy = y - prevY;

    path += `l ${dx},${dy} `;
  }

  path += moreLine? " l 0 0 -370 -0" : ""; // Close the path

  return path;
}


