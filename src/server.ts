import './setup';
import app, { init } from './app';

const port = +process.env.PORT || 4000;

init().then(() => {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
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