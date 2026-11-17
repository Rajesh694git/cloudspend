import './App.css'

import { useState } from 'react'

type CostSummary = {
  title: string
  amount: string
  description: string
}

type CloudService = {
  name: string
  detail: string
  cost: number
}

type MonthlyReport = {
  budget: number
  projectedSpend: number
  services: CloudService[]
}

const monthlyReports: Record<string, MonthlyReport> = {
  'October 2026': {
    budget: 36000,
    projectedSpend: 32400,
    services: [
      { name: 'Compute', detail: 'Virtual machines', cost: 10240 },
      { name: 'Storage', detail: 'Object and block storage', cost: 5180 },
      { name: 'Databases', detail: 'Managed databases', cost: 6390 },
      { name: 'Networking', detail: 'Network and data transfer', cost: 2770 },
    ],
  },

  'September 2026': {
    budget: 36000,
    projectedSpend: 28000,
    services: [
      { name: 'Compute', detail: 'Virtual machines', cost: 8500 },
      { name: 'Storage', detail: 'Object and block storage', cost: 4800 },
      { name: 'Databases', detail: 'Managed databases', cost: 5500 },
      { name: 'Networking', detail: 'Network and data transfer', cost: 2500 },
    ],
  },

  'August 2026': {
    budget: 36000,
    projectedSpend: 26100,
    services: [
      { name: 'Compute', detail: 'Virtual machines', cost: 7900 },
      { name: 'Storage', detail: 'Object and block storage', cost: 4300 },
      { name: 'Databases', detail: 'Managed databases', cost: 5200 },
      { name: 'Networking', detail: 'Network and data transfer', cost: 2350 },
    ],
  },
}

const services = [
  { name: 'Compute', detail: 'Virtual machines', cost: '$10,240', share: 42 },
  { name: 'Storage', detail: 'Object and block storage', cost: '$5,180', share: 21 },
  { name: 'Databases', detail: 'Managed databases', cost: '$6,390', share: 26 },
  { name: 'Networking', detail: 'Network and data transfer', cost: '$2,770', share: 11 },
]

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('October 2026')

  const report = monthlyReports[selectedPeriod]

const monthlySpend = report.services.reduce(
  (total, service) => total + service.cost,
  0,
)

const budgetUsed = Math.round((monthlySpend / report.budget) * 100)

const summaries: CostSummary[] = [
  {
    title: 'Monthly spend',
    amount: monthlySpend.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }),
    description: 'Current month · Sample data',
  },
  {
    title: 'Budget used',
    amount: `${budgetUsed}%`,
    description: `Of the ${report.budget.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    })} monthly budget`,
  },
  {
    title: 'Projected spend',
    amount: report.projectedSpend.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }),
    description: 'Estimated month-end cost',
  },
]

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">C</div>
          <div>
            <h2>CloudSpend</h2>
            <p>Cost intelligence</p>
          </div>
        </div>

        <p className="nav-heading">WORKSPACE</p>

        <nav className="navigation">
          <a href="#overview" className="nav-link active">Overview</a>
          <a href="#services" className="nav-link">Cloud services</a>
          <a href="#budgets" className="nav-link">Budgets</a>
          <a href="#settings" className="nav-link">Settings</a>
        </nav>

        <div className="sidebar-footer">
          <div className="avatar">CS</div>
          <div>
            <strong>Sample organisation</strong>
            <p>Demo workspace</p>
          </div>
        </div>
      </aside>

      <main className="main-content" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Cloud cost overview</h1>
            <p className="page-description">
              Understand where your cloud budget goes.
            </p>
          </div>

          <select
  className="period-badge"
  value={selectedPeriod}
  onChange={(event) => setSelectedPeriod(event.target.value)}
  aria-label="Select reporting period"
>
  <option value="October 2026">October 2026</option>
  <option value="September 2026">September 2026</option>
  <option value="August 2026">August 2026</option>
</select>
        </header>

        <section className="summary-grid" aria-label="Cost summary">
          {summaries.map((item) => (
            <article className="summary-card" key={item.title}>
              <p className="card-title">{item.title}</p>
              <h2>{item.amount}</h2>
              <p className="card-description">{item.description}</p>
            </article>
          ))}
        </section>

        <section className="services-panel" id="services">
          <div className="panel-header">
            <div>
              <h2>Spend by service</h2>
              <p>Illustrative breakdown of this month's costs.</p>
            </div>
            <span className="sample-badge">SAMPLE DATA</span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Monthly cost</th>
                  <th>Share of spend</th>
                </tr>
              </thead>

              <tbody>
                {report.services.map((service) => (
                  <tr key={service.name}>
                    <td>
                      <strong>{service.name}</strong>
                      <span className="service-detail">{service.detail}</span>
                    </td>
                    <td className="cost-cell">
  {service.cost.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  })}
</td>
                    <td>
                      <div className="share-cell">
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{ width: `${Math.round((service.cost / monthlySpend) * 100)}%` }}
                          />
                        </div>
                       <span>
  {Math.round((service.cost / monthlySpend) * 100)}%
</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="page-footer">
          CloudSpend · Portfolio project · All figures are illustrative
        </footer>
      </main>
    </div>
  )
}

export default App