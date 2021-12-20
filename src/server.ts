import './setup';
import app, { init } from './app';

init().then(() => {
    app.listen(4000, () => {
        console.log('Server is listening on port 4000');
    });
});

process.on('unhandledRejection', (reason, promise) => {
    const message = {
      type: 'Unhandled Rejection',
      reason,
      promise,
    };
    console.error('unhandledRejection', message);
});

process.on('uncaughtException', (err) => {
    console.error('uncaughtException', JSON.stringify(err));
});