export default function App() {
  return (
    <div className="page">
      <header className="card">
        <h1>FBLA Coding & Programming</h1>
        <p>Vite + React starter is alive ✅</p>
      </header>

      <main className="card">
        <p>Edit <code>src/App.tsx</code> and save to see live updates.</p>
        <button onClick={() => alert('it works!')}>Click me</button>
      </main>

      <footer className="muted">Built with pnpm · Vite · React</footer>
    </div>
  )
}
