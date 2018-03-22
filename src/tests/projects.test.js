import React from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import * as projects from '../api/crud';
import { fetchProjects, receiveProjects, validateProjectsResponse } from '../store/actions/projects';

import renderer from 'react-test-renderer';


it('checks projects structure after request', () => {
	projects.getAll('projects').then(response => {
		if (validateProjectsResponse(response)) {
			// Recieve projects from API
			store.dispatch(receiveProjects(response.body));
			// Get changed state
			let projects = store.getState().projects;

			// Expect state structure ok
			expect(projects).objectContaining({
				items: expect.any(Array)
			});
		}
	});
});

it('checks project structure after request', () => {
	projects.getAll('projects').then(response => {
		if (validateProjectsResponse(response)) {
			// Recieve projects from API
			store.dispatch(receiveProjects(response.body));
			// Get changed state
			let projects = store.getState().projects;

			// Expect state structure ok
			expect(projects.items[0]).objectContaining({
				_id: expect.any(String)
			});
		}
	});
});
