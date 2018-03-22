import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import { setActiveTabAction } from '../store/actions/activeTab';

import renderer from 'react-test-renderer';

it('sets activeTab state', () => {
	store.dispatch(setActiveTabAction({ name: 'Design', id: 2 }));
	store.dispatch(setActiveTabAction({ name: 'Blog', id: 3 }));
	let activeTab = store.getState().activeTab;
  expect(activeTab).toEqual({ name: 'Blog', id: 3 });
});
