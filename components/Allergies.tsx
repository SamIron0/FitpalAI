'use client';

import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';

import { Separator } from './ui/separator';

export function Allergies() {
  const deleteAllergy = (allergy: string) => {};
  const addAllergy = (allergy: string) => {};
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Allergies</CardTitle>
        <CardDescription>
          Please enter any allergies that you have.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2">
          <Label htmlFor="link" className="sr-only">
            Link
          </Label>
          <Input
            id="link"
            value="http://example.com/link/to/document"
            readOnly
          />
          <Button onClick={() => addAllergy('nuts')} className="shrink-0">
            Add
          </Button>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Allergies</h4>
          <div className="grid gap-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium leading-none">Nuts</p>
              </div>
              <Button
                onSubmit={() => deleteAllergy('nuts')}
                variant="secondary"
              >
                Remove
              </Button>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <p className="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p className="text-sm text-muted-foreground">b@example.com</p>
              </div>
              <Button variant="secondary">Remove</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
