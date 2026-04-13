import React, { useState } from 'react';
import './App.css';

const CreditCard = ({ onClick }) => (
  <div className="credit-card" onClick={onClick}>
    <div className="card-bg-shape shape-pink"></div>
    <div className="card-bg-shape shape-purple"></div>
    <div className="card-bg-shape shape-yellow"></div>
    <div className="card-bg-shape shape-cyan"></div>
    <div className="card-header">
      <span className="card-number">**** 6544</span>
      <span className="card-brand">VISA</span>
    </div>
    <div className="card-footer">
      <span className="card-label">Saldo</span>
      <span className="card-balance">R$ 4.537,24</span>
    </div>
  </div>
);

export default function App() {
  const [currentPage, setCurrentPage] = useState('splash');
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.includes('@')) {
      setLoginError('Por favor, insira um e-mail válido.');
      return;
    }
    setLoginError('');
    setCurrentPage('dashboard');
  };

  const renderSplashScreen = () => (
    <div className="screen splash-screen">
      <div className="splash-bg-shapes">
        <div className="splash-shape s-purple"></div>
        <div className="splash-shape s-yellow"></div>
        <div className="splash-shape s-cyan"></div>
        <div className="splash-shape s-pink"></div>
      </div>
      <div className="splash-content">
        <h1>Seu caminho<br/><span>para o sucesso</span></h1>
        <p className="subtitle">O futuro das suas finanças está aqui.</p>
      </div>
      <button className="btn-primary btn-bottom" onClick={() => setCurrentPage('login')}>
        Começar
      </button>
    </div>
  );

  const renderLoginScreen = () => (
    <div className="screen login-screen">
      <div className="login-header">
        <h2>Acessar Conta</h2>
        <p>Faça login para gerenciar suas finanças</p>
      </div>
      
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div className="input-group">
          <label>E-mail</label>
          <input 
            type="email" 
            value={userEmail}
            placeholder="Ex: usuario@banco.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Senha</label>
          <input 
            type="password" 
            value={password}
            placeholder="••••••••" 
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        {loginError && <div className="error-message">{loginError}</div>}
        
        <div className="forgot-password">Esqueceu a senha?</div>
        
        <button type="submit" className="btn-primary">Entrar</button>
      </form>
      
      <div className="register-link">
        Não tem uma conta? <span>Cadastre-se</span>
      </div>
    </div>
  );

  const renderDashboardScreen = () => {
    const transactions = [
      { id: 1, icon: '🚕', title: 'Táxi', time: 'Agora mesmo', amount: 13.00 },
      { id: 2, icon: '🛒', title: 'Mercado', time: '12:00', amount: 56.00 },
      { id: 3, icon: '🛍️', title: 'Shopping', time: '08:00', amount: 255.00 },
      { id: 4, icon: '🏋️', title: 'Academia', time: '12/06/25', amount: 32.00 },
    ];

    return (
      <div className="screen dashboard-screen">
        <div className={`sidebar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="profile-pic large">👨🏻‍.</div>
            <h3>{userEmail ? userEmail.split('@')[0] : 'Usuário'}</h3>
          </div>
          <div className="sidebar-links">
            <button onClick={() => {setIsDarkMode(!isDarkMode); setIsMenuOpen(false);}}>
              {isDarkMode ? '☀️ Mudar para Claro' : '🌙 Mudar para Escuro'}
            </button>
            <button className="logout-btn" onClick={() => setCurrentPage('login')}>🚪 Sair</button>
          </div>
          <div className="close-menu" onClick={() => setIsMenuOpen(false)}>✕</div>
        </div>
        {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}

        <header className="dark-header">
          <div className="menu-icon" onClick={() => setIsMenuOpen(true)}>∷</div>
          <h2>Banco</h2>
          <div className="profile-pic" onClick={() => setIsMenuOpen(true)}>👨🏻‍.</div>
        </header>

        <div className="dashboard-body">
          <div className="dashboard-grid">
            <div className="dashboard-column">
              <div className="section-header">
                <h3>Cartões</h3>
                <span className="more-options">••</span>
              </div>
              <CreditCard onClick={() => setCurrentPage('analytics')} />
            </div>

            <div className="dashboard-column">
              <div className="section-header mt-mobile-only">
                <h3>Transações</h3>
                <span className="more-options">••</span>
              </div>
              <div className="transactions-list">
                {transactions.map(tx => (
                  <div className="transaction-item" key={tx.id}>
                    <div className="tx-icon">{tx.icon}</div>
                    <div className="tx-details">
                      <h4>{tx.title}</h4>
                      <p>{tx.time}</p>
                    </div>
                    <div className="tx-amount">
                      R$ {tx.amount.toFixed(2).replace('.', ',')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAnalyticsScreen = () => (
    <div className="screen analytics-screen">
      <header className="dark-header transparent">
        <div className="menu-icon" onClick={() => setCurrentPage('dashboard')}>←</div>
        <h2>Estatísticas</h2>
        <div className="profile-pic">👨🏻‍.</div>
      </header>

      <div className="analytics-balance">
        <p>Saldo Total</p>
        <h1>R$ 12.634,37</h1>
        <div className="growth-badge">+14.5% neste mês</div>
      </div>

      <div className="chart-container">
        <svg viewBox="0 0 100 50" className="line-chart">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff007f" />
              <stop offset="100%" stopColor="#8a2be2" />
            </linearGradient>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(255, 0, 127, 0.4)" />
              <stop offset="100%" stopColor="rgba(138, 43, 226, 0)" />
            </linearGradient>
          </defs>
          <path d="M0,40 Q10,40 20,25 T40,25 T60,10 T80,30 T100,5 L100,50 L0,50 Z" fill="url(#fade)" />
          <path d="M0,40 Q10,40 20,25 T40,25 T60,10 T80,30 T100,5" fill="none" stroke="url(#gradient)" strokeWidth="1.5" />
          <circle cx="60" cy="10" r="2" fill="white" stroke="#ff007f" strokeWidth="1" />
        </svg>
        <div className="chart-labels">
          <span>Out</span>
          <span>Nov</span>
          <span>Dez</span>
          <span className="active">Jan</span>
          <span>Fev</span>
          <span>Mar</span>
        </div>
      </div>

      <div className="bottom-sheet">
        <div className="drag-handle"></div>
        <div className="section-header">
          <h3>Cartão Selecionado</h3>
        </div>
        <CreditCard onClick={() => {}} />
      </div>
    </div>
  );

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`}>
      <div className="app-content">
        {currentPage === 'splash' && renderSplashScreen()}
        {currentPage === 'login' && renderLoginScreen()}
        {currentPage === 'dashboard' && renderDashboardScreen()}
        {currentPage === 'analytics' && renderAnalyticsScreen()}
      </div>
    </div>
  );
}