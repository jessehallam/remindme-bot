import { app } from './app';

app().then(() => console.log('App started.'), err => console.error(err));
