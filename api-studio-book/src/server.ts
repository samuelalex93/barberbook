import { app } from "./app";
import { port } from "./config/env";

const PORT = parseInt(port) || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
