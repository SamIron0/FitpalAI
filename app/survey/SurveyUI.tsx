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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
interface SurveryProps {
  user?: User;
}
export function SurveyUI({ user }: SurveryProps) {
  // if user has filled survey display thank you screeen

  const surveyQuestions = [
    'What is your biggest challenge in meal planning and preparation?',
    'What type of meals interest you most?',
    'How many meals do you typically eat in a day?',
    'Have you used meal planning apps before? if so, what apps have you used?',
    'How did you hear about us',
    'What features are important to you in a meal planning app?'
  ];
  const formSchema = z.object({
    survey0: z.string().min(2),
    survey1: z.string().min(2),
    survey2: z.string().min(2),
    survey3: z.string().min(2),
    survey4: z.string().min(2),
    survey5: z.string().min(2)
  });
  const { isSidebarOpen } = useSidebar();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      survey0: '',
      survey1: '',
      survey2: '',
      survey3: '',
      survey4: '',
      survey5: ''
    }
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // console.log(values);
    const toastId = toast.loading('Saving...');
    try {
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
      const data = await response;
      //console.log(data);
      if (!data.ok) {
        toast.error('An error occurred while saving survey.');
      }
      toast.dismiss(toastId);
      toast.success('Thank you for your feedback!');
      router.push('/survey');
    } catch (error) {
      toast.error('An error occurred while saving survey.');
    }
  }

  return (
    <div className="flex flex-col  px-6  sm:px-16">
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
      <h1 className="text-3xl pt-20 text-primary">
        Delighted to See You at Our Table! 🍲
      </h1>
      <h2 className="text-md pt-3 text-muted-foreground">
        We're so thrilled you've joined us! Your thoughts and preferences matter
        a lot to us. Please take a few moments to answer this brief survey. Your
        feedback will help us create even better meal plans, customized just for
        you.
      </h2>
      <Card className="pt-10 sm:px-3 mt-16 mb-40 ">
        <CardContent>
          {' '}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {surveyQuestions.map((question, idx) => (
                //Unique field for each survey question
                <FormField
                  key={idx}
                  control={form.control}
                  name={
                    idx === 0
                      ? `survey0`
                      : idx === 1
                      ? `survey1`
                      : idx === 2
                      ? `survey2`
                      : idx === 3
                      ? `survey3`
                      : idx === 4
                      ? `survey4`
                      : `survey5`
                  }
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{question}</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
