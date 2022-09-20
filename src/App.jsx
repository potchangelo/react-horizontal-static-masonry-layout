import { Route, Routes } from 'react-router-dom';
import { HeaderNav, HeaderTabs } from './components';
import { routes } from './helpers';

function App() {
  const routeElements = routes.map(route => {
    const { id, url, component } = route;
    return <Route key={id} path={url} element={component} />;
  });
  return (
    <>
      <HeaderNav />
      <HeaderTabs />
      <Routes>{routeElements}</Routes>
    </>
  );
}

export default App;
