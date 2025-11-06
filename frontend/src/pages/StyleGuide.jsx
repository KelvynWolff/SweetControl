import React from 'react';
import { NavLink } from 'react-router-dom';

export default function StyleGuide() {
  return (
    <div className="container" style={{ display: 'grid', gap: 24 }}>
      {/* TITLE */}
      <section className="card">
        <h1 style={{ margin: 0 }}>Style Guide · Sweet Control</h1>
        <p style={{ color: 'var(--muted)' }}>
          Componentes e estados visuais para manter consistência de UI.
        </p>
      </section>

      {/* BUTTONS */}
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Buttons</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn">Default</button>
          <button className="btn btn-primary">Primary</button>
          <button className="btn btn-secondary">Secondary</button>
          <button className="btn btn-accent">Accent</button>
          <button className="btn-icon" aria-label="Adicionar">
            +
          </button>
        </div>
      </section>

      {/* TABS */}
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Tabs (underline)</h2>
        <nav className="tabs">
          <NavLink
            to="#tab1"
            className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
          >
            Tab ativa
          </NavLink>
          <NavLink
            to="#tab2"
            className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
          >
            Outra tab
          </NavLink>
          <NavLink
            to="#tab3"
            className={({ isActive }) => `tab ${isActive ? 'is-active' : ''}`}
          >
            Mais uma
          </NavLink>
        </nav>
        <p style={{ color: 'var(--muted)' }}>
          Use{' '}
          <code>
            className=&#123;({`{ isActive }`}) =&gt; `tab $
            {'${isActive ? "is-active" : ""'}``&#125;
          </code>{' '}
          com <code>NavLink</code>.
        </p>
      </section>

      {/* FORMS */}
      <section className="form-card">
        <h2 style={{ marginTop: 0 }}>Forms</h2>
        <div className="form-grid">
          <div className="form-group">
            <label className="label required">Nome do Produto</label>
            <input className="input" placeholder="Ex: Bolo de Cenoura" />
            <span className="help">Texto de ajuda opcional.</span>
          </div>

          <div className="form-group">
            <label className="label required">Quantidade</label>
            <input className="input" type="number" placeholder="0" />
          </div>

          <div className="form-group">
            <label className="label">Status</label>
            <select className="select">
              <option>Ativo</option>
              <option>Inativo</option>
              <option>Em Produção</option>
            </select>
          </div>

          <div className="form-group">
            <label className="label">Observações</label>
            <textarea
              className="textarea"
              rows={3}
              placeholder="Notas adicionais..."
            />
            <span className="help error">Mensagem de erro (exemplo).</span>
          </div>
        </div>

        <div className="actions">
          <button className="btn btn-primary">Salvar</button>
          <button className="btn">Cancelar</button>
        </div>
      </section>

      {/* TABLE */}
      <section className="list-container">
        <h2 style={{ marginTop: 0 }}>Table</h2>
        <input className="search-input" placeholder="Buscar…" />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Observação</th>
              <th style={{ width: 120 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#001</td>
              <td>Brigadeiro Gourmet</td>
              <td>120 un</td>
              <td>Lote 23A</td>
              <td>
                <button className="icon-btn" title="Editar">
                  ✏️
                </button>
                <button className="icon-btn-delete" title="Excluir">
                  🗑️
                </button>
              </td>
            </tr>
            <tr>
              <td>#002</td>
              <td>Cupcake Red Velvet</td>
              <td>64 un</td>
              <td>Urgente</td>
              <td>
                <button className="icon-btn" title="Editar">
                  ✏️
                </button>
                <button className="icon-btn-delete" title="Excluir">
                  🗑️
                </button>
              </td>
            </tr>
            <tr>
              <td>#003</td>
              <td>Brownie</td>
              <td>48 un</td>
              <td>-</td>
              <td>
                <button className="icon-btn" title="Editar">
                  ✏️
                </button>
                <button className="icon-btn-delete" title="Excluir">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* COLORS */}
      <section className="card">
        <h2 style={{ marginTop: 0 }}>Cores do Tema</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: 12,
          }}
        >
          {[
            { name: 'Primary', var: 'var(--primary)' },
            { name: 'Secondary', var: 'var(--secondary)' },
            { name: 'Accent', var: 'var(--accent)' },
            { name: 'Warning', var: 'var(--warning)' },
            { name: 'Danger', var: 'var(--danger)' },
          ].map((c) => (
            <div key={c.name} className="card" style={{ padding: 12 }}>
              <div
                style={{ height: 44, borderRadius: 10, background: c.var }}
              />
              <div style={{ marginTop: 8, color: 'var(--muted)' }}>
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
