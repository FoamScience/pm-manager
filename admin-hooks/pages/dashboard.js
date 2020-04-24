import React from 'react';

import { Container } from '@arch-ui/layout';
import { Title } from '@arch-ui/typography';

const Dashboard = () => (
  <Container>
    <Title as="h1" margin="both">
      About
    </Title>
    <p>This is a centralized way for keeping track of what has been delivered to customers.</p>
    <hr></hr>
    <p>
    Things to keep in mind:
	<ol start="0">
		<li>Site admins have the right to revoke access to anyone, at anytime if they deem it necessary.</li>
		<li>Add your queries to "Deals > Requests" page; and update them to the "completed" state whenever
	        you deliver a product.</li>
		<li>The requests page has some native filtering/searching functionality, use it as you see fit.</li>
		<li>All activity on the site is logged and monitored; Security is main concern.</li>
		<li>Wanna get involved in the developement of this page? Or have a feature reguest;
	    head over to  <a href="https://github.com/FoamScience/pm-manager">The Github Repo</a> and open an
	    issue there.
	    </li>
	</ol>
    </p>
	<p> 
	This is a work in progress, so expect bugs, database resets, and or runtime issues.
	</p>
  </Container>
);

export default Dashboard;
