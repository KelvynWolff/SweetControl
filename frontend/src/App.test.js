import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: () => null,
    Link: ({ children }) => <span>{children}</span>,
  }),
  { virtual: true },
);

jest.mock('./pages/produtos/ProdutosPage', () => () => <div />);
jest.mock('./pages/insumos/InsumosPage', () => () => <div />);
jest.mock('./pages/receitas/ReceitasPage', () => () => <div />);
jest.mock('./pages/promocoes/PromocoesPage', () => () => <div />);
jest.mock('./pages/estados/EstadosPage', () => () => <div />);
jest.mock('./pages/cidades/CidadesPage', () => () => <div />);
jest.mock('./pages/bairros/BairrosPage', () => () => <div />);
jest.mock('./pages/clientes/ClientesPage', () => () => <div />);
jest.mock('./pages/enderecos/EnderecosPage', () => () => <div />);
jest.mock('./pages/emails/EmailsPage', () => () => <div />);
jest.mock('./pages/telefones/TelefonesPage', () => () => <div />);
jest.mock('./pages/fornecedores/FornecedoresPage', () => () => <div />);
jest.mock('./pages/funcionarios/FuncionariosPage', () => () => <div />);

test('renders application title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /sweet control/i }),
  ).toBeInTheDocument();
});
