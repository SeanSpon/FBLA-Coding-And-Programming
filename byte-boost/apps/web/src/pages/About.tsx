export default function About() {
  return (
    <div className="stack">
      <section className="card">
        <h1 className="text-2xl">About The Big Red Bus</h1>
        <p>
          The Big Red Bus is a non-profit organization committed to strengthening community bonds through technology. This platform was developed as part of the FBLA Coding & Programming competition to provide a real-world solution for managing our activities and engaging with our members.
        </p>
      </section>
      <section className="card">
        <h2 className="text-2xl">Technology Stack</h2>
        <p>
          This application is built with a modern, robust technology stack to ensure a high-quality user experience and maintainable codebase.
        </p>
        <ul>
          <li><strong>Monorepo:</strong> Managed with pnpm workspaces for efficient code sharing and dependency management.</li>
          <li><strong>Frontend:</strong> A responsive and interactive user interface built with React and Vite.</li>
          <li><strong>Testing:</strong> A comprehensive testing suite using Vitest and React Testing Library to ensure reliability.</li>
          <li><strong>Continuous Integration:</strong> Automated workflows with GitHub Actions to maintain code quality.</li>
          <li><strong>Deployment:</strong> Hosted on Vercel for fast, reliable, and scalable delivery.</li>
        </ul>
      </section>
    </div>
  );
}
