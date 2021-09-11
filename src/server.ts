import debug from 'debug';
import mongoose from 'mongoose';
import app from './app';

const port = parseInt(process.env.PORT, 10);
const dbUri = process.env.DATABASE_CONNECTION;

startUp();

/**
 * This function establishes a database connection and starts up the server.
 */
async function startUp(): Promise<void> {
    try {
        await mongoose.connect(dbUri);
        app.listen(port, () => debug('app')(`App listening on port ${port}`));
    } catch (error) {
        console.error(`An error has occured: ${error}`);
        process.exit(1);
    }
}
