import React from 'react';

interface Task {
  id: number;
  title: string;
  label: string;
  description: string;
}

interface ListItem {
  title: string;
  task: Task[];
}

const About = () => {
  return <div>about page</div>;
};
export default About;
