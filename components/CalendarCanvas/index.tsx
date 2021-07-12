import React from 'react';
import Canvas from './canvas';

interface CalendarCanvasProps {
    width: number,
    height: number
}

const CalendarCanvas =({ width, height }: CalendarCanvasProps) => {
    return (
        <Canvas width={width} height={height}/>
    );
}

export default CalendarCanvas;
