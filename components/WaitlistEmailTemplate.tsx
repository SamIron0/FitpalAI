export default function WaitListEmailTemplate({ name }: { name: string }) {
  return (
    <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
      <header>
        <a href="#">
          <img className="w-auto h-7 sm:h-8" src="/logo-3.svg" alt="" />
        </a>
      </header>

      <main className="mt-8">
        <h2 className="text-gray-200">Hello, {name}</h2>

        <p className="mt-2 leading-loosetext-gray-300">
          Thank you for joining the waitlist to get early access to FitpalAI! To
          balance capacity with demand, we'll be sending invites gradually over
          time. Once you're off the waitlist, you'll receive an email with
          further instructions on how to get started. We appreciate your
          interest, and look forward to having you generate meal plans with
          Fitpal soon. In the meantime, please complete the attached 2 minute
          survey to help us get to serve you better. We are super excited to get
          started together.
          <span className="font-semibold ">FitpalAI</span>.
        </p>

        <button className="px-6 py-2 mt-4 text-sm font-medium tracking-wider text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          Accept the invite
        </button>

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
