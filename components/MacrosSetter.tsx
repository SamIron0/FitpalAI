'use client';
import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Button } from './ui/button';
import { Minus, Plus } from 'lucide-react';
ChartJS.register(ArcElement, Tooltip, Legend);

interface MacroSetterProps {
  setMacros: any;
}
export function MacrosSetter({ setMacros }: MacroSetterProps) {
  const [protein, setProtein] = React.useState(200);
  const [carbs, setCarbs] = React.useState(200);
  const [fat, setFat] = React.useState(200);
  function onClickProtein(adjustment: number) {
    setProtein(adjustment + protein);
  }
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => onClickProtein(-10)}
        disabled={isLoading}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="flex-1 text-center">
        <div className="text-7xl font-bold tracking-tighter">{protein}</div>
        <div className="text-[0.70rem] uppercase text-muted-foreground">
          g/day
        </div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => onClickProtein(10)}
        disabled={protein >= 400}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}
