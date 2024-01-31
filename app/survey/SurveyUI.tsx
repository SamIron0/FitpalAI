'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { User } from '@supabase/supabase-js';
import { useSidebar } from '../providers/SideBarContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import Sidebar from '@/components/ui/Sidebar';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.'
  })
});

interface SurveryProps {
  user?: User;
}
export function SurveyUI({ user }: SurveryProps) {
  // if user has filled survey display thank you screeen

  const { isSidebarOpen } = useSidebar();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: ''
    }
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const url = '/api/save-survey';
    const body = { values };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    const response = fetch(url, options);
    const data = response;
    console.log(data);
  }

  return (
    <div className="flex flex-col  px-6">
      {isSidebarOpen && (
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)'
          }}
        />
      )}
      <h1 className='text-3xl pt-20 text-primary'>Delighted to See You at Our Table! 🍲</h1>
      <h2 className="text-md pt-3 text-muted-foreground">
        We're so thrilled you've joined us! Your thoughts and preferences matter
        a lot to us. Please take a few moments to answer this brief survey. Your
        feedback will help us create even better meal plans, customized just for
        you.
      </h2>
      <Card className="p-6 mt-16 mb-40 px-5">
        <CardContent>
          {' '}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>
                        What has been your biggest challenge in meal planning
                        and preparation?
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>
                        What type of meals interest you most?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>
                        {' '}
                        Would you prefer tracking your pantry ingredients?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>

                    <FormItem>
                      <FormLabel>
                        Have you used meal planning apps before?{' '}
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>
                        What drove you to sign up for our service?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                    <FormItem>
                      <FormLabel>
                        {' '}
                        What features are important to you in a meal planning
                        app?
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>{' '}
        </CardContent>
      </Card>
    </div>
  );
}
