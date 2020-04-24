import Dashboard from './pages/dashboard';

export default {
  pages: () => [
    {
      label: 'About this project',
      path: '',
      component: Dashboard,
    },
    {
      label: 'Deals',
      children: [
        { label: 'Requests', listKey: 'Number' },
      ],
    },
    {
      label: 'People',
      children: ['User'],
    },
  ],
};
