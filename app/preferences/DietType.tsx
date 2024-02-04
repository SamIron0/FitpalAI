'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Toast } from 'react-hot-toast';
import { Label } from '@/components/ui/label';

const FormSchema = z.object({
  type: z.enum(['Anything', 'Vegetarian', 'Vegan' , 'Gluten-free', 'Keto', 'Paleo', 'Pescatarian', 'Pescetarian', 'Mediterranean', 'Low-Carb'], {
    required_error: 'You need to select a diet type.'
  })
});

interface DietTypeProps {
  submit: (data: z.infer<typeof FormSchema>) => void;
}
export default function DietType( { submit }: DietTypeProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log('submitting', data);
    submit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-2/3 w-full space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormControl>
                <RadioGroup
                  defaultValue="Anything"
                  className="grid grid-cols-3 gap-4 pb-16"
                >
                  <div>
                    <RadioGroupItem
                      value="Anything"
                      id="Anything"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Anything"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Anything
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Mediterranean"
                      id="Mediterranean"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Mediterranean"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Mediterranean
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Paleo"
                      id="Paleo"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Paleo"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Paleo
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Vegan"
                      id="Vegan"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Vegan"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="mb-3 h-6 w-6"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <path d="M2 10h20" />
                      </svg>
                      Vegan
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Keto"
                      id="Keto"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Keto"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Keto
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Vegetarian"
                      id="Vegetarian"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Vegetarian"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Vegetarian
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Vegetarian"
                      id="Vegetarian"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Vegetarian"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Vegetarian
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Gluten-free"
                      id="Gluten-free"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Gluten-free"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Gluten-free
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Pescatarian"
                      id="Pescatarian"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Pescatarian"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      Pescatarian
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="Low-Carb"
                      id="Low-Carb"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="Low-Carb"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                    Low-Carb
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
        <Button className='w-full max-w-xl' type="submit">Save</Button>
      </form>
    </Form>
  );
}
