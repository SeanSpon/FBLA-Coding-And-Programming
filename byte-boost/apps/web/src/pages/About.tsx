export default function About() {
  return (
    <section className="card">
      <h1 className="text-2xl">About</h1>
      <ul>
        <li>Monorepo: pnpm workspaces</li>
        <li>App: React + Vite</li>
        <li>Testing: Vitest + Testing Library</li>
        <li>CI: GitHub Actions</li>
        <li>Deploy: Vercel</li>
      </ul>
    </section>
  )
}
