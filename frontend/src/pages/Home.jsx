import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navbar */}
      <nav style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)'
      }}>
        <div style={{ fontWeight: 700, fontSize: '1.25rem', color: '#2563eb' }}>
          📋 Placement Portal
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Link to="/student-register" style={{ color: '#475569', textDecoration: 'none', fontWeight: 500 }}>Register</Link>
          <Link to="/login" style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            fontWeight: 500,
            textDecoration: 'none'
          }}>Login</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #eff6ff 0%, #f8fafc 50%, #ecfdf5 100%)',
        padding: '5rem 2rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            backgroundColor: '#dbeafe',
            color: '#1d4ed8',
            padding: '0.25rem 1rem',
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}>
            AI-Powered Platform
          </span>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#0f172a',
            lineHeight: 1.15,
            marginBottom: '1.5rem'
          }}>
            Your Gateway to <br />
            <span style={{
              background: 'linear-gradient(135deg, #2563eb, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Premium Placements
            </span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#475569', marginBottom: '2.5rem', lineHeight: 1.7 }}>
            Connecting Students, Recruiters and Colleges on one Smart Platform. 
            AI-powered resume analysis, real-time application tracking, and more.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/student-register" style={{
              backgroundColor: '#2563eb',
              color: '#fff',
              padding: '0.875rem 2rem',
              borderRadius: '0.625rem',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              boxShadow: '0 4px 6px -1px rgb(37 99 235 / 0.4)'
            }}>
              Get Started Free →
            </Link>
            <Link to="/login" style={{
              backgroundColor: '#fff',
              color: '#0f172a',
              padding: '0.875rem 2rem',
              borderRadius: '0.625rem',
              fontWeight: 600,
              fontSize: '1rem',
              textDecoration: 'none',
              border: '1px solid #e2e8f0'
            }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '4rem 2rem', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2rem',
          textAlign: 'center'
        }}>
          {[
            { value: '500+', label: 'Students', color: '#2563eb' },
            { value: '120+', label: 'Companies', color: '#10b981' },
            { value: '350+', label: 'Placements', color: '#f59e0b' },
            { value: '98%', label: 'Success Rate', color: '#ef4444' }
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
              <div style={{ color: '#64748b', fontWeight: 500, marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '5rem 2rem', backgroundColor: '#f8fafc' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '3rem' }}>
            Why Choose Our Placement Portal?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { icon: '🏢', title: 'Top Companies', desc: 'Explore opportunities from leading IT companies including TCS, Infosys, Google, and more.' },
              { icon: '🤖', title: 'AI Resume Analysis', desc: 'Upload your resume and receive AI-powered feedback to improve your chances.' },
              { icon: '📊', title: 'Application Tracking', desc: 'Track every application from Applied to Selected in real-time.' },
              { icon: '🎯', title: 'Smart Matching', desc: 'Automated eligibility filtering based on CGPA, backlogs, and skill sets.' },
              { icon: '🔒', title: 'Secure Platform', desc: 'JWT-based authentication ensures your data is always protected.' },
              { icon: '📱', title: 'Mobile Friendly', desc: 'Access from any device — fully responsive layout for students on the go.' }
            ].map(f => (
              <div key={f.title} style={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '1rem',
                padding: '1.75rem',
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
                transition: 'box-shadow 0.2s',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{f.icon}</div>
                <h3 style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.925rem', lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section style={{ padding: '5rem 2rem', backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '3rem' }}>
            Top Companies Hiring
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            {['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Accenture', 'Wipro', 'Cognizant'].map(c => (
              <div key={c} style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '0.75rem',
                padding: '1.25rem',
                textAlign: 'center',
                fontWeight: 600,
                color: '#334155',
                fontSize: '0.925rem'
              }}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '5rem 2rem',
        background: 'linear-gradient(135deg, #1e40af, #065f46)',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#fff', fontSize: '2.25rem', fontWeight: 700, marginBottom: '1rem' }}>
          Ready to Begin Your Journey?
        </h2>
        <p style={{ color: '#bfdbfe', fontSize: '1.1rem', marginBottom: '2rem' }}>
          Join thousands of students who landed their dream jobs through our platform.
        </p>
        <Link to="/student-register" style={{
          backgroundColor: '#fff',
          color: '#1e40af',
          padding: '0.875rem 2.5rem',
          borderRadius: '0.625rem',
          fontWeight: 700,
          fontSize: '1rem',
          textDecoration: 'none',
          display: 'inline-block'
        }}>
          Register Now →
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f172a', color: '#94a3b8', padding: '2.5rem', textAlign: 'center' }}>
        <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
          📋 Placement Portal
        </div>
        <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Connecting Students, Recruiters and Colleges on one Smart Platform.
        </p>
        <hr style={{ borderColor: '#1e293b', margin: '1rem 0' }} />
        <p style={{ color: '#64748b', fontSize: '0.8rem' }}>
          © 2026 Placement Portal | Built with React & Spring Boot
        </p>
      </footer>
    </div>
  );
}

export default Home;