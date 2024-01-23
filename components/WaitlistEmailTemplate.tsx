'use client';
export default function WaitListEmailTemplate(name?: string) {
  return (
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      <main className="mt-8">
        <a href="#">
          <img className="w-auto h-7 sm:h-8" src="/logo-3.svg" alt="" />
        </a>
        <h2 className="text-gray-200">Hello, {name}</h2>

        <p className="mt-2 leading-loose text-gray-300">
          Thank you for joining the waitlist to get early access to FitpalAI! To
          balance capacity with demand, we'll be sending invites gradually over
          time. Once you're off the waitlist, you'll receive an email with
          further instructions on how to get started. We appreciate your
          interest, and look forward to having you generate meal plans with
          Fitpal soon. We are super excited to get started together.
        </p>

        <p className="mt-8 text-gray-300">
          Thanks, <br />- The FitpalAI Team
        </p>
      </main>

      <footer className="mt-8">
        <p className="mt-3 text-gray-400">
          © 2024 FitpalAI. All Rights Reserved.
        </p>
      </footer>
    </section>
  );
}
