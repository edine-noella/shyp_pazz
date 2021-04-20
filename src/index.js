import 'dotenv/config';
import server from './app';
const PORT = process.env.PORT || 6000;

server.listen(PORT, () => console.log("Server is running on "+PORT));